"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";
import Link from 'next/link'
import {cabinetGrotesk, inter} from "@/app/fonts";
import {validateEmailInput} from "@/utils/GlobalMethods"
import {useLoginMutation} from "@/service/auths/api"
import {useToast} from "@/hooks/use-toast"
import {  setUserRoles, storeUserDetails} from "@/features/auth/usersAuth/login/action";
import {useRouter, useSearchParams} from "next/navigation";
import {jwtDecode} from "jwt-decode";
import {ADMIN_ROLES} from "@/types/roles";
import {persistor, store} from "@/redux/store";
import {setCurrentNavbarItem} from "@/redux/slice/layout/adminLayout";
import {clearData} from "@/utils/storage";


interface CustomJwtPayload {
    email: string;
    realm_access: {
        roles: string[];
    };

}

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validEmail, setValidEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [login, { isLoading}] = useLoginMutation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showEmailMessage, setShowEmailMessage] = useState(false)

    const getUserLoanOfferId = () => {
        if (searchParams){
            const pathVariable = searchParams.get("loanOfferId")
            if (pathVariable){
                return pathVariable
            }
        }
    }

    const loanOfferId =  getUserLoanOfferId()



    const validateEmail = (input: string) => {
        const isValid = validateEmailInput(input);
        if (isValid){
            setValidEmail(true)
            setShowEmailMessage(false)
        }else{
            setValidEmail(false)
            setShowEmailMessage(true)
        }


    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

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

    const routeLoanee = async (loanOfferId?: string) => {
        if(loanOfferId) {

                // const response = await login({email, password}).unwrap()
                // if (response?.data) {
                //     const refresh_token = response?.data?.refresh_token
                //     const access_token = response?.data?.access_token
                //     const decode_access_token = jwtDecode<CustomJwtPayload>(access_token)
                //     //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //     // @ts-expect-error
                //     const userName = decode_access_token?.name
                //     const user_email = decode_access_token?.email
                //     const user_roles = decode_access_token?.realm_access?.roles
                //     const user_role = user_roles.filter(getUserRoles).at(0)
                //     clearData()
                //     await persistor.purge();
                //     toast({
                //         description: "Login successful",
                //         status: "success",
                //     });
                    // if (user_role) {
                    //     storeUserDetails(access_token, user_email, user_role, userName, refresh_token)
                    //     setUserRoles(user_roles)
                        store.dispatch(setCurrentNavbarItem("Accept loan offer"))
                        router.push(`/accept-loan-offer?loanOfferId=${loanOfferId}`)
                    // }
                // }
        }else{
                    store.dispatch(setCurrentNavbarItem("overview"))
                    router.push("/onboarding")
                }
    }



    const {toast} = useToast()
    const handleLogin = async (e?:React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
            if (!navigator.onLine) {
                toast({
                    description: "No internet connection",
                    status: "error",
                })
            } else {
                try {
                    const response = await login({email, password}).unwrap()
                    if (response?.data) {

                        const access_token = response?.data?.access_token
                        const refresh_token = response?.data?.refresh_token
                        const decode_access_token = jwtDecode<CustomJwtPayload>(access_token)
                        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const userName = decode_access_token?.name
                        const user_email = decode_access_token?.email
                        const user_roles = decode_access_token?.realm_access?.roles
                        const user_role = user_roles.filter(getUserRoles).at(0)
                        clearData()
                        await persistor.purge();
                        toast({
                            description: "Login successful",
                            status: "success",
                        });
                        if (user_role) {
                            storeUserDetails(access_token, user_email, user_role, userName, refresh_token)
                            setUserRoles(user_roles)
                            switch (user_role) {
                                case 'LOANEE' :
                                   await routeLoanee(loanOfferId)
                                    break;
                                case 'ORGANIZATION_ADMIN':
                                    store.dispatch(setCurrentNavbarItem("Program"))
                                    router.push("/program")
                                    break;
                                case 'PORTFOLIO_MANAGER':
                                    store.dispatch(setCurrentNavbarItem("Loan"))
                                    router.push("/loan/loan-request")
                                    break;
                            }
                        }
                    }
                } catch (error) {
                    const err = error as ApiError;
                    if (err?.data?.message) {
                        setErrorMessage(err?.data?.message);
                        toast({
                            description: errorMessage || "Invalid email or password",
                            status: "error",
                        });

                    }
                }
            }
        }
    // }


    const isFormValid = validEmail && password.length >= 8;



    return (

        <form
            className="w-full md:mr-10  h-fit md:w-[54%] md:h-fit bg-meedlWhite  border border-slate-200 rounded-xl">
            <div data-testid={`loginDivId`} id={`loginDivId`}
                 className="px-4 py-4">
                <h1 className={`${cabinetGrotesk.className} text-[#1A1A1A] mt-3  text-2xl leading-5`}>Log in to your
                    account</h1>
                <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`}
                     className="pt-5 space-y-5">
                    <div data-testid={`emailId`}
                         className={`  `}
                         id={`emailId`}>
                        <AuthInputField label={"Email address"} id={`email`}
                                        data-testid={`loginEmailId`}
                                        placeholder={`Enter email address`}
                                        type="email"
                                        value={email}
                                        onChange={handleEmail}
                        />
                        {showEmailMessage && <div className={`text-sm mt-2 mr-2 text-[#72757A]`}>Please enter a valid email</div>}
                    </div>
                    <div data-testid={`passwordId`} id={`passwordId`}>
                        <AuthInputField label={`Password`} id={'password'}
                                        data-testid={`password`}
                                        type={'password'}
                                        placeholder={`Enter password`}
                                        endAdornment={`show`}
                                        value={password}
                                        onChange={handlePassword}>
                        </AuthInputField>
                    </div>
                    <div id={"authButtonContainer"} className={`w-[100%]`}>
                        <AuthButton disable={!isFormValid} backgroundColor={'#142854'} textColor={"white"}
                                    id={"loginButton"}
                                    data-testid={`loginButton`}
                                    buttonText={"Login"} width={"inherit"}
                                    isLoading={isLoading}
                                    handleClick={(e)=>{handleLogin(e)}}>
                        </AuthButton>
                    </div>
                    <p className={`${inter.className} flex items-center justify-center text-sm text-forgetPasswordBlue leading-4`}>
                        Forgot Password? <Link id={'resetPasswordLinkFromLogin'} href={"/auth/reset-password-request"}
                                               className="font-medium text-meedlBlue ml-1  underline">Reset it
                        here</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}
export default Login