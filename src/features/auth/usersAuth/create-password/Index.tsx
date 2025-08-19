'use client'
import React, { useState} from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import { cabinetGrotesk,inter } from "@/app/fonts";
import PasswordCriteria from "@/components/passwordCriteria/Index";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useCreatePasswordMutation} from "@/service/auths/api";
import {useRouter, useSearchParams} from 'next/navigation'
import { useToast} from "@/hooks/use-toast";
import {jwtDecode} from "jwt-decode";
import {setUserRoles, storeUserDetails} from "@/features/auth/usersAuth/login/action";
import {ROLES} from "@/types/roles";
import {persistor, store} from "@/redux/store";
import {setCurrentNavbarItem,setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import {clearData} from "@/utils/storage";
import { setMarketInvestmentVehicleId } from '@/redux/slice/investors/MarketPlaceSlice';
import {encryptText} from "@/utils/encrypt";
import {setLoanReferralId,setCohortLoaneeId } from "@/redux/slice/loan/selected-loan";
import Link from 'next/link'

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}


const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false, false]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    const [disableButton, setDisableButton] = useState(false)
    const [createPassword, { isLoading}] = useCreatePasswordMutation()
    const encryptedPassword =  encryptText(password)
    const [errorMessage, setErrorMessage] = useState("")
    const disable = !criteriaStatus.every(Boolean) || password !== confirmPassword || disableButton;



    const criteriaMessages = [
        "Must be at least 8 characters",
        "Must contain one special character",
        "Must contain one uppercase character",
        "Must contain one lowercase character",
        "Must contain one digit"
    ];


    const validatePassword = (password: string) => {
        const criteria = [
            password.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password)
        ];
        setCriteriaStatus(criteria);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };


    const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);



    const getUserToken = () => {
        if (searchParams) {
            const rawToken = searchParams.get("token");
            const loanReferralId = searchParams.get("loanReferralId");
            if(rawToken?.includes("?loanReferralId")){
                const [token, loanReferralId] = rawToken.split("?loanReferralId=");
                return {
                    token: token,
                    investmentVehicleId: null,
                    loanReferralId: loanReferralId
                };

            }
            if (rawToken?.includes("?investmentVehicleId=")) {
                const [token, vehicleId] = rawToken.split("?investmentVehicleId=");
                return {
                    token: token,
                    investmentVehicleId: vehicleId || null,
                    loanReferralId: loanReferralId
                };
            }
            if (rawToken?.includes(('?cohortLoaneeId='))){
                const [token, cohortLoaneeId] = rawToken.split("?cohortLoaneeId=");
                return {
                    token: token,
                    investmentVehicleId: null,
                    loanReferralId: loanReferralId,
                    cohortLoaneeId:cohortLoaneeId,
                };
            }

            return {
                token: rawToken,
                investmentVehicleId: null,
                loanReferralId: loanReferralId,
                cohortLoaneeId: null,
            };
        }

        return {
            token: null,
            investmentVehicleId: null,
            loanReferralId: "",
        };
    };

     
    const getUserRoles = (returnsRole: string) => {
        if (returnsRole) {
            // ADMIN_ROLES.filter(returnsRole)
            for (let i = 0; i < ROLES.length; i++) {
                if (ROLES.at(i) === returnsRole) {
                    return ROLES.at(i)
                }
            }

        }
    }


    const {toast} = useToast()


    interface CustomJwtPayload {
        email: string;
        realm_access: {
            roles: string[];
        };

    }


    const routeUserToTheirDashboard = async (userRole?: string) => {
        const { investmentVehicleId } = getUserToken();
        switch (userRole) {
            case 'LOANEE' :
                const { loanReferralId, cohortLoaneeId } = getUserToken();
                if (loanReferralId) {
                    store.dispatch(setLoanReferralId(loanReferralId))
                }
                if (cohortLoaneeId){
                    store.dispatch(setCohortLoaneeId(cohortLoaneeId));
                }
                store.dispatch(setCurrentNavbarItem("Verification"))
                store.dispatch(setCurrentNavBottomItem('Verification'))
                router.push("/onboarding")
                break;
            case 'ORGANIZATION_ADMIN':
                store.dispatch(setCurrentNavbarItem("Program"))
                router.push("/program")
                break;
            case 'PORTFOLIO_MANAGER':
                store.dispatch(setCurrentNavbarItem("Loan"))
                router.push("/Overview")
                break;
            case "FINANCIER":
            case "COOPERATE_FINANCIER_SUPER_ADMIN":
            case "COOPERATE_FINANCIER_ADMIN": 
                if (investmentVehicleId) {
                     store.dispatch(setMarketInvestmentVehicleId({marketInvestmentVehicleId: investmentVehicleId }))
                    store.dispatch(setCurrentNavbarItem("Marketplace"));
                    router.push(`/marketplace/details`);
                  } else {
                    store.dispatch(setCurrentNavbarItem("Overview"))
                    router.push('/Overview')
                  }
                break;
            case 'MEEDL_SUPER_ADMIN':
                store.dispatch(setCurrentNavbarItem('Overview'));
                router.push("/Overview");
                break;
            case 'PORTFOLIO_MANAGER_ASSOCIATE' :
                store.dispatch(setCurrentNavbarItem('Overview'));
                router.push("/Overview");
                break;
            case 'ORGANIZATION_SUPER_ADMIN':
                store.dispatch(setCurrentNavbarItem("Program"))
                router.push("/program")
                break;
            case 'ORGANIZATION_ASSOCIATE':
                store.dispatch(setCurrentNavbarItem("Program"))
                router.push("/program")
                break;
        }
    }


    const handleCreatePassword = async (e?:React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
        setDisableButton(true)
        const { token } = getUserToken();
        try {
            const response = await createPassword({token: token
                , password: encryptedPassword}).unwrap()
             if(response?.data)  {
                const access_token = response?.data?.accessToken
                const refreshToken = response?.data?.refreshToken
                const decode_access_token = jwtDecode<CustomJwtPayload>(access_token)
                const user_email = decode_access_token?.email
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const userName = decode_access_token?.name
                const user_roles = decode_access_token?.realm_access?.roles
                const user_role = user_roles.filter(getUserRoles).at(0)
                clearData()
                await persistor.purge();

                toast({
                    description: "Password created successfully",
                    status: "success",
                    duration: 1000
                });
                if (user_role) {
                    storeUserDetails(access_token, user_email, user_role, userName, refreshToken)
                    setUserRoles(user_roles)
                    await routeUserToTheirDashboard(user_role)
    
                }
             } 

        }catch (error){
            const err = error as ApiError;
            if (err?.data?.message) {
                setErrorMessage(err?.data?.message);
                toast({
                    description: errorMessage? "User has added password before" : "User has added password before",
                    status: "error",
                    duration: 1000
                });

            }
        }
        setDisableButton(false)
    }

    return (
        <form id={'create-password-block'}
              className={'bg-white shadow-custom h-fit rounded-xl w-full md:w-[60%] md:mr-10 md:bg-meedlWhite md:ml-40 md:h-fit mb-10 py-6 px-5 grid gap-3 '}>
            <h1 id={'create-password-title'}
                className={`${cabinetGrotesk.className} antialiased text-meedlBlue font-[500] text-[24px] md:text-[30px] leading-[145%] `}>Create your password</h1>
            <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                <div id={'create-password-inputs'} className={'grid gap-4'}>
                    <AuthInputField
                        label={'Password'}
                        id={'password'}
                        type={'password'}
                        endAdornment={'Show'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={handlePasswordChange}
                        errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                    />
                    <PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />
                    <AuthInputField
                        label={'Confirm Password'}
                        id={'confirmPassword'}
                        type={'password'}
                        endAdornment={'show'}
                        placeholder={'Enter password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
            </main>
            <AuthButton
                backgroundColor={criteriaStatus.every(Boolean) && password === confirmPassword ? '#142854' : '#D0D5DD'}
                buttonText={'Create password'}
                disable={disable}
                handleClick={(e)=>{handleCreatePassword(e)}}
                id={"createPasswordButton"}
                textColor={'#FFFFFF'}
                width={'100%'}
                isLoading={isLoading}
            />
            <div>
            <p className={`${inter.className} flex items-center justify-center text-sm text-forgetPasswordBlue leading-4 mt-2`}>
            Already have an account? <Link id={'resetPasswordLinkFromLogin'} href={"/auth/login"}
                                               className="font-medium text-meedlBlue ml-1  underline">Login
                        here</Link>
                    </p>  
            </div>
        </form>
    );
};

export default CreatePassword;