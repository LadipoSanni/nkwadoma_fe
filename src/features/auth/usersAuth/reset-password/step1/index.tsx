'use client'
import React, {ChangeEvent, useState} from 'react';
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInput from "@/reuseable/Input/AuthInputField"
import Link from 'next/link'
import {setItemToLocalStorage} from "@/utils/localStorage";
import {useRouter} from "next/navigation";
import {validateEmailInput} from "@/utils/GlobalMethods";


const Step1 = () => {

    const RESETPASSWORDHEADER: string = "Request password reset";
    const RESETPASSWORDTEXT: string = "Enter the email address you registered with, we will send you a link to create a new password";
    const EMAILHEADER: string = "Email address";
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [disableButton, setDisableButton] = useState(true)



    const handleReset = () => {
        setItemToLocalStorage("userEmailInputOnResetPassword", email)
        router.push('/auth/reset-password/step-2')
    }

    const validateEmail = (input: string) => {
        const isValid  = validateEmailInput(input);
        if (isValid){
            setDisableButton(false)
        }else{
            setDisableButton(true)
        }

    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement| HTMLInputElement > ) => {
        event.stopPropagation()
        setEmail(event.currentTarget.value)
        validateEmail(event.currentTarget.value)

    }
    const login = ()=> {
        router.push("/auth/login")
    }




    return (

            <div
                id="resetPasswordComponent"
                className={` py-4 border border-slate-200 px-3 w-[90vw] md:mr-20 rounded-md h-fit mb-60 bg-white grid md:px-2.5 md:grid md:place-items-center  md:border md:border-slate-200 md:w-[50%] md:h-fit md:rounded`}
            >
                <div
                    id={"resetPasswordInnerContainer"}
                    className={`w-[98%] md:w-full grid grid-cols-1 content-between  h-[98%] md:h-full`}>
                    <div id="resetPasswordHeaderContainer" className={`h-fit grid grid-2 md:h-fit mb-[1rem] md:grid md:gap-2 `}>
                        <div id={"RESETPASSWORDHEADER"} className={`font-semi-bold text-2xl `}>{RESETPASSWORDHEADER}</div>
                        <div id={"RESETPASSWORDTEXT"} className={` text-[#667085] text-xs w-[90%]`}>{RESETPASSWORDTEXT}</div>
                    </div>
                    <div
                        id="buttonsContainer"
                        className={`h-[30%] w-[100%] md:h-[30%] py-1 md:  md:mt-1 grid gap-4 md:grid md:gap-4 `}>
                        <div className={`w-[100%] h-[5rem] grid gap-0 `}>
                            <AuthInput value={email} type={'email'} data-testid={'resetEmailInput'} label={EMAILHEADER}
                                       id={'resetEmailInput'} onChange={handleChange}
                                       placeholder={'Enter email address'}></AuthInput>
                        </div>
                        <div id={"authButtonContainer"} className={`w-[100%]`}>
                            <Link href={'/auth/reset-password/step-2'} className={`w-[100%]`}>
                                <AuthButton disable={disableButton} backgroundColor={'#142854'} textColor={"white"}
                                            id={"resetPasswordSubmitEmailButton"}
                                            buttonText={"Submit email"} width={"inherit"}
                                            handleClick={handleReset}></AuthButton>
                            </Link>
                            <div className={`flex gap-2 place-self-center place-content-center  mt-1 `}>
                                <div className={`text-grey1 text-sm `}>Remember your password?</div>
                                    <button
                                        id={`loginOnResetPasswordStep1`}
                                        data-testid={`loginOnResetPasswordStep1`}
                                        onClick={login}
                                        className={ ` h-fit md:h-fit text-meedlBlue text-sm  underline`}>
                                        Log in
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Step1;