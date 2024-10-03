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
        <section data-testid={`parentDivId`} id={`parentDivId`}
                 className="flex flex-col bg-[#fafbfc] min-h-screen md:px-20 md:py-16 px-5 py-10 justify-evenly md:justify-center">
            <p className={`text-[#0D9B48] text-3xl font-DM-Mono font-medium leading-10`}> Meedl</p>
            <div data-testid={`writeUpAndLogin`} id={`writeUpAndLogin`} className={`flex flex-row items-center justify-between `}>
                <div className={`hidden md:block`}>
                    <p className={`text-[#101828] text-5xl font-bold font-sans`}>Revolutionizing financing <br/> and
                        access to loans</p>
                    <p className={`text-[#404653] text-sm font-normal pt-5`}>Middl serves as a nexus, connecting high
                        net-worth individuals, financial <br/> institutions, and organizations seeking impactful
                        investment avenues with the <br/> pressing need for accessible loans.</p>
                </div>

                <div data-testid={`childDivId`} id={`childDivId`} className={` rounded-xl md:shadow md:max-w-xl w-full flex items-center justify-center`}>
                    <div
                         className="w-full bg-[#FFFFFF] rounded-xl md:border border-2 border-gray-100">
                        <div data-testid={`loginDivId`} id={`loginDivId`}
                             className="px-4 py-10">
                            <h1 className=" font-sans text-[#1A1A1A] md:text-3xl text-2xl leading-5 ">Log in to your
                                account</h1>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
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
                                    Forgot Password? <a href="/auth/reset-password"
                                                        className="font-medium text-[#0D9B48] underline">Reset it
                                    here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login