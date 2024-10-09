"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleReset = () => {
    }

    const isFormValid = email && password

    return (

        <div
            className="w-full bg-[#FFFFFF] md:min-w-xl rounded-xl md:border border-2 border-gray-100">
            <div data-testid={`loginDivId`} id={`loginDivId`}
                 className="px-4 py-10">
                <h1 className=" font-sans text-[#1A1A1A] md:text-3xl text-2xl leading-5 ">Log in to your
                    account</h1>
                <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`}
                     className="pt-10 space-y-5">
                    <div data-testid={`emailId`} id={`emailId`}>
                        <AuthInputField label={"Email"} id={`email`}
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
                        <AuthButton disable={!isFormValid} backgroundColor={'#0d9b48'} textColor={"white"}
                                    id={"loginButton"}
                                    buttonText={"Login"} width={"inherit"}
                                    handleClick={handleReset}>
                        </AuthButton>
                    </div>
                    <p className="flex items-center justify-center text-sm text-[#101828] leading-4">
                        Forgot Password? <a href="/auth/usersAuth/reset-password"
                                            className="font-medium text-[#0D9B48] underline">Reset it
                        here</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login