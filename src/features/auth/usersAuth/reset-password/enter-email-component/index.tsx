'use client'
import React, {ChangeEvent, useState} from 'react';
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInput from "@/reuseable/Input/AuthInputField"
import {useRouter} from "next/navigation";
import {validateEmailInput} from "@/utils/GlobalMethods";
// import {store} from "@/redux/store";
// import {setUserPasswordInput} from "@/redux/slice/auth/slice";
import {useSendEmailToResetPasswordMutation} from "@/service/auths/api";
import {useToast} from "@/hooks/use-toast"
import {setUserPasswordInput} from "@/redux/slice/auth/slice";
import {store} from "@/redux/store";


const Step1 = () => {

    const RESETPASSWORDHEADER: string = "Request password reset";
    const RESETPASSWORDTEXT: string = "Enter the email address you registered with, we will send you a link to create a new password";
    const EMAILHEADER: string = "Email address";
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [showEmailMessage, setShowEmailMessage] = useState(false)
    const [sendEmail, {isLoading}] = useSendEmailToResetPasswordMutation()



    const {toast} = useToast()

    const handleReset = async () => {
        if (!navigator.onLine) {
            toast({
                description: "No internet connection",
                status: "error",
            })
        }else{
            try {
                const response = await sendEmail(email).unwrap()
                if(response?.message){
                    store.dispatch(setUserPasswordInput(email))
                    toast({
                        description: response?.message,
                        status: "success",
                    })
                }
            }catch(error){
                toast({
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    description: error?.data?.message,
                    status: "error",
                })
            }
        }

    }

    const validateEmail = (input: string) => {
        // const criteria = /\s/g.test(input)
        // setCriteriaStatus(criteria);
        const isValid = validateEmailInput(input);
        if (isValid) {
            setDisableButton(false)
            setShowEmailMessage(false)
        } else {
            setDisableButton(true)
            setShowEmailMessage(true)
        }

    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.stopPropagation()
        setEmail(event.currentTarget.value)
        validateEmail(event.currentTarget.value)

    }
    const login = () => {
        router.push("/auth/login")
    }

    // const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);



    return (

        <div
            id="resetPasswordComponent"
            className={` py-4 border border-slate-200 px-4 w-[95vw] md:mr-10 rounded-xl h-fit  bg-white grid md:px-3 md:grid md:place-items-center  md:border md:border-slate-200 md:w-[44%] md:h-fit md:rounded-xl`}
        >
            <div
                id={"resetPasswordInnerContainer"}
                className={`w-[98%] md:w-full grid grid-cols-1 content-between  h-[98%] md:h-full`}>
                <div id="resetPasswordHeaderContainer"
                     className={`h-fit grid grid-2 md:h-fit mb-[1rem] pt-2 md:grid md:gap-2 `}>
                    <div id={"RESETPASSWORDHEADER"} className={`font-semi-bold text-2xl `}>{RESETPASSWORDHEADER}</div>
                    <div id={"RESETPASSWORDTEXT"}
                         className={` text-[#667085] tracking-wide text-xs w-[80%]`}>{RESETPASSWORDTEXT}</div>
                </div>
                <div
                    id="buttonsContainer"
                    className={`h-[30%] w-[100%] md:h-[30%] py-1 md:  md:mt-1 grid gap-4 md:grid md:gap-4 `}>
                    <div className={`w-[100%] h-[5rem] grid gap-0 `}>
                        <AuthInput value={email} type={'email'} data-testid={'resetEmailInput'} label={EMAILHEADER}
                                   id={'resetEmailInput'} onChange={handleChange}
                                   placeholder={'Enter email address'}></AuthInput>
                        {showEmailMessage && <div className={`text-sm mt-2 mr-2 text-[#72757A]`}>Please enter a valid email</div>}
                    </div>
                    <div id={"authButtonContainer"} className={`w-[100%]`}>
                        <div className={`w-[100%]`}>
                            <AuthButton disable={disableButton} backgroundColor={'#142854'} textColor={"white"}
                                        id={"resetPasswordSubmitEmailButton"}
                                        isLoading={isLoading}
                                        buttonText={"Submit email"} width={"inherit"}
                                        handleClick={handleReset}></AuthButton>
                        </div>
                        <div className={`flex gap-2 place-self-center place-content-center  mt-1 `}>
                            <div className={`text-grey1 text-sm `}>Remember your password?</div>
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

export default Step1;