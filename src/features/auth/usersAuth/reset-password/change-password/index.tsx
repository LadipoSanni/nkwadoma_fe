'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useRouter} from "next/navigation";

const Step3 = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disableButton, setDisableButton] = useState(true)

    const router = useRouter()

    useEffect(() => {
        if (newPassword !== confirmPassword && confirmPassword.length < 8 ) {
            setDisableButton(true)
        }
        if (newPassword === confirmPassword && confirmPassword.length >= 8 ) {
            setDisableButton(false)
        }
    }, [confirmPassword, newPassword]);

    const changePassword = () => {

    }

    const login = ()=> {
        router.push("/auth/login")
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
            className={` w-[92vw] h-fit mb-60 md:w-[52%] md:h-fit px-3 md:mr-20 py-4 bg-white md:bg-white rounded-md md:rounded-md border border-slate-200 md:border md:border-slate-200 `}
        >
            <div
                id={"resetPassword3StepInnerContainer"}
                className={`w-[98%] md:w-[97%] grid grid-cols-1 gap-2 md:grid md:grid-cols-1 md:gap-0 content-between  h-[98%] md:h-[98%]`}>
                <div id="resetPassword3HeaderContainer" className={`h-fit grid grid-2 md:h-[2rem] md:mb-4 md:grid md:gap-0 `}>
                    <div id={"RESETPASSWORDStep3HEADER"} className={`font-semi-bold text-2xl  `}>Reset your password
                    </div>
                </div>
                <div className={`w-[100%] h-[5rem] grid gap-4 mt-4  mb-16 md:mb-16 `}>
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
                <div className={`w-[100%] mt-4 `}>
                    <div className={`w-[100%]`}>
                        <AuthButton disable={disableButton} backgroundColor={'#142854'} textColor={"white"}
                                    id={"resetPasswordButton"}
                                    buttonText={"Reset password"} width={"inherit"}
                                    handleClick={changePassword}></AuthButton>
                        <div className={`text-grey1 flex gap-1 text-sm place-content-center mt-2 `}>Remember your password?
                            <button
                                id={`loginOnResetPasswordStep1`}
                                data-testid={`loginOnResetPasswordStep1`}
                                onClick={login}
                                className={` h-fit md:h-fit text-meedlBlue text-sm  underline`}>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Step3;