"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";
import Link from 'next/link'
import {cabinetGrotesk} from "@/app/fonts";
import {validateEmailInput} from "@/utils/GlobalMethods"
import {useLoginMutation} from "@/service/auths/api"
import {useToast} from "@/hooks/use-toast"
import {storeUserDetails} from "@/features/auth/usersAuth/login/action";
import {useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validEmail, setValidEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()
    const [login, {isError}] = useLoginMutation()


    const validateEmail = (input: string) => {
        const disable = validateEmailInput(input);
        setValidEmail(disable)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };



    const {toast} = useToast()
    const handleLogin = async () => {
        if (!navigator.onLine) {
            toast({
                description: "No internet connection",
                status: "error",
            })
        }else {
            const response = await login({email, password})
            if (isError) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                setErrorMessage(response?.error?.data?.message)
                toast({
                    description: errorMessage,
                    status: "error",
                })
            }
            if (response?.data) {
                const access_token = response?.data?.data?.access_token
                const decode_access_token = jwtDecode(access_token)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                const user_email = decode_access_token?.email
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                const user_role = decode_access_token?.realm_access?.roles[0]
                await storeUserDetails(access_token, user_email, user_role)
                router.push("/Overview")

            }
        }


    }


    const isFormValid = validEmail && password.length >= 8;


    return (

        <div
            className="w-full md:w-[52%] md:mr-20 h-fit   md:h-fit bg-meedlWhite  border border-slate-200 rounded-md">
            <div data-testid={`loginDivId`} id={`loginDivId`}
                 className="px-4 py-4">
                <h1 className={`${cabinetGrotesk.className} text-meedlBlue mt-3  text-2xl leading-5`}>Log in to your
                    account</h1>
                <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`}
                     className="pt-5 space-y-5">
                    <div data-testid={`emailId`} id={`emailId`}>
                        <AuthInputField label={"Email address"} id={`email`}
                                        data-testid={`loginEmailId`}
                                        placeholder={`Enter email address`}
                                        type="email"
                                        value={email}
                                        onChange={handleEmail}
                        />
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
                                    handleClick={handleLogin}>
                        </AuthButton>
                    </div>
                    <p className="flex items-center justify-center text-sm text-forgetPasswordBlue leading-4">
                        Forgot Password? <Link href={"/auth/reset-password"}
                                               className="font-medium text-meedlBlue ml-1  underline">Reset it
                        here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login