'use client'
import React, {ChangeEvent,  useState} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useRouter, useSearchParams} from "next/navigation";
import {useResetPasswordMutation} from "@/service/auths/api";
import {useToast} from "@/hooks/use-toast"

const Step3 = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [disableButton, setDisableButton] = useState(true)
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);
    const searchParams = useSearchParams()
    const [resetPassword, { data}] = useResetPasswordMutation()

    const criteriaMessages = [
        "Must be at least 8 characters",
        "Must contain one special character",
        "Must contain one uppercase character",
        "Must contain one lowercase character",
        "Must contain one digit"
    ];

    const router = useRouter()

    const getUserToken = () => {
        if (searchParams){
            const pathVariable = searchParams.get("token")
            if (pathVariable){
                return pathVariable
            }
        }
    }
    const {toast} = useToast()


    const changePassword = async() => {
        const token = getUserToken()
        // console.log("token: ", token)

        try{

            await resetPassword({token: token, password: newPassword}).unwrap()
            // console.log("response: ", response,"isError:: ", isError, "isSuccess:: ", isSuccess, "data: ", data)
            if(data?.message){
                toast({
                    description: data?.message,
                    status: "success",
                })
                router.push("/auth/login")
            }
        }catch(error){
            // console.log("error: ", error)
            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: error?.data?.message,
                status: "error",
            })
        }
    }

    const login = ()=> {
        router.push("/auth/login")
    }
    const validatePassword = (password: string) => {
        const criteria = [
            password.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password)
        ];
        setCriteriaStatus(criteria);
    };

    const handleChangeNewPassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.stopPropagation()
        setNewPassword(event.target.value)
        validatePassword(newPassword);

    }
    const handleChangeConfirmPassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.stopPropagation()
        setConfirmPassword(event.target.value)
    }

    const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);



    return (
        <div
            id={'Step3Container'}
            data-testid={'Step3Container'}
            className={` w-[92vw] h-fit  md:w-[52%] md:h-fit px-3 md:mr-20 py-4 bg-white md:bg-white rounded-md md:rounded-md border border-slate-200 md:border md:border-slate-200 `}
        >
            <div
                id={"resetPassword3StepInnerContainer"}
                className={`w-[98%] md:w-[97%] grid grid-cols-1 gap-2 md:grid md:grid-cols-1 md:gap-0 content-between  h-fit md:h-fit`}>
                <div id="resetPassword3HeaderContainer" className={`h-fit grid grid-2 md:h-[2rem] md:mb-4 md:grid md:gap-0 `}>
                    <div id={"RESETPASSWORDStep3HEADER"} className={`font-semi-bold text-2xl  `}>Reset your password
                    </div>
                </div>
                <div className={`w-[100%] h-fit grid gap-3 mt-4 md:mb-4 `}>
                    <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                               label={'New password'}
                               id={'resetNewPasswordInput'} onChange={handleChangeNewPassword}
                               endAdornment={'Hide'}
                               errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                               placeholder={'Enter password'}></AuthInput>
                    {/*<PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />*/}
                    <AuthInput value={confirmPassword} type={'password'} data-testid={'resetConfirmPasswordInput'}
                               label={'Confirm password'}
                               id={'resetPasswordConfirmInput'} onChange={handleChangeConfirmPassword}
                               endAdornment={'Hide'}
                               placeholder={'Enter password'}></AuthInput>
                </div>
                <div className={`w-[100%] h-fit mt- `}>
                    <div className={`w-[100%]`}>
                        <AuthButton disable={!criteriaStatus.every(Boolean) || newPassword !== confirmPassword}
                                    backgroundColor={criteriaStatus.every(Boolean) && newPassword === confirmPassword ? '#142854' : '#D0D5DD'}
                                    textColor={"white"}
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