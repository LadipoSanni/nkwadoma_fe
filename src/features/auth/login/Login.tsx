"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword] = React.useState(false);

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
        <section data-testid={`parentDivId`} id={`parentDivId`}
                 className="flex flex-col bg-[#fafbfc] min-h-screen px-20 py-16">
            <p className={`text-[#0D9B48] text-xl font-DM-Mono font-medium leading-10`}> Middl</p>
            <div className={`flex flex-row items-center justify-between pt-8`}>
                <div className={`hidden md:block`}>
                    <p className={`text-[#101828] text-5xl font-bold font-sans`}>Revolutionizing financing <br/> and
                        access to loans</p>
                    <p className={`text-[#404653] text-sm font-normal pt-5`}>Middl serves as a nexus, connecting high
                        net-worth individuals, financial <br/> institutions, and organizations seeking impactful
                        investment avenues with the <br/> pressing need for accessible loans.</p>
                </div>

                <div data-testid={`childDivId`} id={`childDivId`}
                     className="w-full bg-[#FFFFFF] rounded-lg md:shadow md:max-w-xl max-w-sm">
                    <div data-testid={`loginDivId`} id={`loginDivId`}
                         className="p-1 space-y-2 md:space-y-1 sm:p-8">
                        <h1 className=" font-sans text-[#1A1A1A] text-3xl leading-5 font-medium ">Log in to your
                            account</h1>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`}
                             className="pt-12 space-y-5">
                            <div data-testid={`emailId`} id={`emailId`}>
                                <AuthInputField label={"Email"} id={`email`}
                                                placeholder={`Enter email address`}
                                                type="email"
                                                value={email}
                                                onChange={handleEmail}
                                />
                            </div>
                            <div data-testid={`passwordId`} id={`passwordId`}>
                                <AuthInputField label={`Password`} id={'password'}
                                                type={'password'}
                                                placeholder={`Enter password`}
                                                endAdornment={`show`}
                                                value={password}
                                                onChange={handlePassword}>
                                </AuthInputField>
                            </div>
                            <div id={"authButtonContainer"} className={`w-[100%]`}>
                                <AuthButton disable={!isFormValid} backgroundColor={'#0d9b48'} textColor={"white"}
                                            id={"resetPasswordButton"}
                                            buttonText={"Login"} width={"inherit"}
                                            handleClick={handleReset}>
                                </AuthButton>
                            </div>
                            <p className="flex items-center justify-center text-sm text-[#101828] leading-4">
                                Forgot Password? <a href="/auth/reset-password"
                                                    className="font-medium text-[#0D9B48] underline">Reset it here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login