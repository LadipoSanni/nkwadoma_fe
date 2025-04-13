"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";
import Link from 'next/link'
import Image from "next/image";
import {cabinetGroteskBold} from "@/app/fonts";


const AdminLogin: React.FC = () => {
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
        <div className={`grid justify-center h-screen bg-white md:p-0 p-5 items-center`} id={`superAdminLoginPage`}
             data-testid="superAdminLoginPage">
            <div
                id={'OrganizationAdminLogo'}
                data-testid={`OrganizationAdminLogo`}
                className={`text-meedlBlue font-mono  object-cover`}
            >
                <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}
                       width={100}
                       height={80}
                />
            </div>
            <div data-testid={`superAdminLoginDivId`} id={`superAdminLoginDivId`}
                 className="px-4 py-10 md:max-w-md w-full rounded-xl bg-meedlWhite">
                <h1 className={`${cabinetGroteskBold.className} text-labelBlue text-3xl flex justify-start items-center md:text-3xl leading-5`}>Login to your account</h1>
                <div data-testid={`superAdminEmailAndPasswordId`} id={`superAdminEmailAndPasswordId`}
                     className="pt-10 space-y-5">
                    <div data-testid={`superAdminEmailId`} id={`superAdminEmailId`}>
                        <AuthInputField label={"Email"} id={`adminEmail`}
                                        data-testid={`adminEmail`}
                                        placeholder={`Enter email address`}
                                        type="email"
                                        value={email}
                                        onChange={handleEmail}
                        />
                    </div>
                    <div data-testid={`SuperAdminPasswordId`} id={`SuperAdminPasswordId`}>
                        <AuthInputField label={`Password`} id={'AdminPassword'}
                                        data-testid={`AdminPassword`}
                                        type={'password'}
                                        placeholder={`Enter password`}
                                        endAdornment={`show`}
                                        value={password}
                                        onChange={handlePassword}>
                        </AuthInputField>
                    </div>
                    <div id={"SuperAdminAuthButtonContainer"} className={`w-[100%]`}>
                        <AuthButton disable={!isFormValid} backgroundColor={'#142854'} textColor={"white"}
                                    id={"SuperAdminAuthButton"}
                                    buttonText={"Log in"} width={"inherit"}
                                    handleClick={handleReset}>
                        </AuthButton>
                    </div>
                    <p className="flex items-center justify-center text-sm text-forgetPasswordBlue leading-4">
                        Forgot Password? <Link href="/auth/reset-password"
                                               className="font-medium text-meedlBlue underline">Reset it
                        here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin