'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import Link from "next/link";
import AuthButton from "@/reuseable/buttons/AuthButton";

const Step3 = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disableButton, setDisableButton] = useState(true)


    useEffect(() => {
        if (newPassword && confirmPassword === ''){
            setDisableButton(true)
        }
    }, [confirmPassword, newPassword]);

    const changePassword = () =>{

    }
    const handleChangeNewPassword = (event: ChangeEvent<HTMLTextAreaElement| HTMLInputElement > ) => {
        event.stopPropagation()
        setDisableButton(false)
        setNewPassword(event.currentTarget.value)
    }
    const handleChangeConfirmPassword = (event: ChangeEvent<HTMLTextAreaElement| HTMLInputElement > ) => {
        event.stopPropagation()
        setDisableButton(false)
        setConfirmPassword(event.currentTarget.value)
    }




    return (
        <div
            id={'Step3Container'}
            data-testid={'Step3Container'}
            className={` py-4 border border-slate-200 px-3 w-[90vw] rounded-md h-[40vh] bg-white grid md:px-2 md:grid md:place-items-center  md:border md:border-slate-200 md:w-[90%] md:h-[98%] md:rounded`}
        >
            <div
                id={"resetPassword3StepInnerContainer"}
                className={`w-[98%] md:w-[96%] grid grid-rows-3 content-between  h-[98%] md:h-[90%]`}>
                <div id="resetPassword3HeaderContainer" className={`h-fit grid grid-2 md:h-fit md:grid md:gap-0 `}>
                    <div id={"RESETPASSWORDStep3HEADER"} className={`font-semi-bold text-2xl `}>Reset your password</div>
                </div>
                <div
                    id="buttonsContainer"
                    className={`h-[30%] w-[100%] md:h-auto py-1 md:   grid gap-4 md:grid md:gap-1 `}>
                    <div className={`w-[100%] h-[5rem] grid gap-0 `}>
                        <AuthInput value={newPassword} data-testid={'resetEmailInput'} label={'New password'}
                                   id={'resetPasswordInput'} onChange={handleChangeNewPassword}
                                   placeholder={'Enter password'}></AuthInput>
                        <AuthInput value={confirmPassword} data-testid={'resetEmailInput'} label={'Confirm password'}
                                   id={'resetPasswordConfirmInput'} onChange={handleChangeConfirmPassword}
                                   placeholder={'Enter password'}></AuthInput>
                    </div>
                </div>
                <div id={"authButtonContainer"} className={`w-[100%]`}>
                    <Link href={'/auth/reset-password/step-2'} className={`w-[100%]`}>
                        <AuthButton disable={disableButton} backgroundColor={'#0d9b48'} textColor={"white"}
                                    id={"resetPasswordButton"}
                                    buttonText={"Submit email"} width={"inherit"}
                                    handleClick={changePassword}></AuthButton>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Step3;