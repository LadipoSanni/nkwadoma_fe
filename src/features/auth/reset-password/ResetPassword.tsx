'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInput from "@/reuseable/Input/AuthInputField"
import Link from 'next/link'
// import { cookies } from 'next/headers'


const ResetPassword = () => {

    const RESETPASSWORDHEADER: string = "Request password reset";
    const RESETPASSWORDTEXT: string = "Enter the email address you registered with, we will send you a link to create a new password";
    const EMAILHEADER: string = "Email address";
    // const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    // const router = useRouter()
    // const cookieStore = cookies()

    useEffect(() => {
        if (email === ''){
            setDisableButton(true)
        }
    }, [email]);
    const handleReset = () => {
      // router.replace('/auth/reset-password/step-2')
      //   cookieStore.set('resetPasswordEmail', email)?
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement| HTMLInputElement > ) => {
        event.stopPropagation()
        setDisableButton(false)
        setEmail(event.currentTarget.value)
    }

    // const changePasswordVisibility = () =>{
    //     if (hidePassword){
    //         setHidePassword(false)
    //     }else{
    //         setHidePassword(true)
    //     }
    // }


    return (

            <div
                id="resetPasswordComponent"
                className={` py-4 border border-slate-200 px-3 w-[90vw] rounded-md h-[40vh] bg-white grid md:px-2 md:grid md:place-items-center  md:border md:border-slate-200 md:w-[90%] md:h-[98%] md:rounded`}
            >
                <div
                    id={"resetPasswordInnerContainer"}
                    className={`w-[98%] md:w-[96%] grid grid-cols-1 content-between  h-[98%] md:h-[90%]`}>
                    <div id="resetPasswordHeaderContainer" className={`h-fit grid grid-2 md:h-fit md:grid md:gap-0 `}>
                        <div id={"RESETPASSWORDHEADER"} className={`font-semi-bold text-2xl `}>{RESETPASSWORDHEADER}</div>
                        <div id={"RESETPASSWORDTEXT"} className={` text-[#667085] text-xs w-[96%]`}>{RESETPASSWORDTEXT}</div>
                    </div>
                    <div
                        id="buttonsContainer"
                        className={`h-[30%] w-[100%] md:h-auto py-1 md:  md:mt-1 grid gap-4 md:grid md:gap-1 `}>
                        <div className={`w-[100%] h-[5rem] grid gap-0 `}>
                            <AuthInput value={email} data-testid={'resetEmailInput'} label={EMAILHEADER} id={'resetEmailInput'} onChange={handleChange} placeholder={'Enter email address'}></AuthInput>
                        </div>
                    </div>
                    <div id={"authButtonContainer"} className={`w-[100%]`}>
                        <Link href={'/auth/reset-password/step-2'} className={`w-[100%]`}>
                            <AuthButton disable={disableButton} backgroundColor={'#0d9b48'} textColor={"white"}
                                        id={"resetPasswordButton"}
                                        buttonText={"Submit email"} width={"inherit"}
                                        handleClick={handleReset}></AuthButton>
                        </Link>
                        <div className={`flex gap-2 place-self-center place-content-center  mt-1 `}>
                            <div className={`text-[#667085] text-sm `}>Remember your password?</div>
                            <Link href="/auth/login">
                                <div  className={`text-[#0d9b48] text-sm  `}>Log in</div>
                                <hr style={{backgroundColor: '#0d9b48'}} className={`h-[2px]`}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default ResetPassword;