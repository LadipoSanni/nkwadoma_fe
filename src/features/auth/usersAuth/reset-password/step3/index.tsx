'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import Link from "next/link";
import AuthButton from "@/reuseable/buttons/AuthButton";

const Index = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disableButton, setDisableButton] = useState(true)


    useEffect(() => {
        if (newPassword === "" && confirmPassword === "") {
            setDisableButton(true)
        }
        if (newPassword.length >= 1 && confirmPassword.length >= 1) {
            setDisableButton(false)
        }
    }, [confirmPassword, newPassword]);

    const changePassword = () => {

    }
    const handleChangeNewPassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.stopPropagation()
        setNewPassword(event.target.value)
    }
    const handleChangeConfirmPassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.stopPropagation()
        setConfirmPassword(event.target.value)
    }


    return (
        <div
            id={'Step3Container'}
            data-testid={'Step3Container'}
            className={` py-4 border border-slate-200 px-3 w-[90vw] rounded-md h-[35vh] bg-white grid md:px-2 md:grid md:place-items-center  md:border md:border-slate-200 md:w-[86%] md:h-[98%] md:rounded`}
        >
            <div
                id={"resetPassword3StepInnerContainer"}
                className={`w-[98%] md:w-[92%] grid grid-cols-1 gap-2 md:grid md:grid-cols-1 md:gap-0 content-between  h-[98%] md:h-[98%]`}>
                <div id="resetPassword3HeaderContainer" className={`h-fit grid grid-2 md:h-[2rem] md:grid md:gap-0 `}>
                    <div id={"RESETPASSWORDStep3HEADER"} className={`font-semi-bold text-2xl  `}>Reset your password
                    </div>
                </div>
                <div className={`w-[100%] h-[5rem] grid gap-2 mb-16 md:mb-16 `}>
                    <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                               label={'New password'}
                               id={'resetNewPasswordInput'} onChange={handleChangeNewPassword}
                               endAdornment={'Hide'}
                               placeholder={'Enter password'}></AuthInput>
                    <AuthInput value={confirmPassword} type={'password'} data-testid={'resetConfirmPasswordInput'}
                               label={'Confirm password'}
                               id={'resetPasswordConfirmInput'} onChange={handleChangeConfirmPassword}
                               endAdornment={'Hide'}
                               placeholder={'Enter password'}></AuthInput>
                </div>
                <div className={`w-[100%]`}>
                    <Link href={'/auth/reset-password/step-2'} className={`w-[100%]`}>
                        <AuthButton disable={disableButton} backgroundColor={'#0d9b48'} textColor={"white"}
                                    id={"resetPasswordButton"}
                                    buttonText={"Reset password"} width={"inherit"}
                                    handleClick={changePassword}></AuthButton>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Index;