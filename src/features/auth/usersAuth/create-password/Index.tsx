'use client'
import React, { useState} from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import { cabinetGrotesk } from "@/app/fonts";
import PasswordCriteria from "@/components/passwordCriteria/Index";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useCreatePasswordMutation} from "@/service/auths/api";
import {useRouter, useSearchParams} from 'next/navigation'
import { useToast} from "@/hooks/use-toast";
import {jwtDecode} from "jwt-decode";
import {setUserRoles, storeUserDetails} from "@/features/auth/usersAuth/login/action";
import {ADMIN_ROLES} from "@/types/roles";
import {persistor, store} from "@/redux/store";
import {setCurrentNavbarItem} from "@/redux/slice/layout/adminLayout";
import {clearData} from "@/utils/storage";


const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false, false]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    const [disableButton, setDisableButton] = useState(false)
    const [createPassword, { isLoading}] = useCreatePasswordMutation()

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
            if (searchParams){
                const pathVariable = searchParams.get("token")
                if (pathVariable){
                    return pathVariable
                }
            }
    }

    const getUserRoles = (returnsRole: string) => {
        if (returnsRole) {
            // ADMIN_ROLES.filter(returnsRole)
            for (let i = 0; i < ADMIN_ROLES.length; i++) {
                if (ADMIN_ROLES.at(i) === returnsRole) {
                    return ADMIN_ROLES.at(i)
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
    const handleCreatePassword = async (e?:React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
        setDisableButton(true)
        const token = getUserToken()

        try {
            const response = await createPassword({token: token
                , password: password}).unwrap()
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
            if (user_role) {
                storeUserDetails(access_token, user_email, user_role, userName, refreshToken)
                setUserRoles(user_roles)
                if (user_role === 'LOANEE') {
                    store.dispatch(setCurrentNavbarItem("overview"))
                    router.push("/onboarding")
                } else if(user_role === 'ORGANIZATION_ADMIN') {
                    store.dispatch(setCurrentNavbarItem("Program"))
                    router.push("/program")
                }else if(user_role === 'PORTFOLIO_MANAGER'){
                    store.dispatch(setCurrentNavbarItem("Loan"))
                    router.push("/loan/loan-request")
                }

            }


        }catch (error){
            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: error?.data?.message,
                status: "error",
            })
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
        </form>
    );
};

export default CreatePassword;