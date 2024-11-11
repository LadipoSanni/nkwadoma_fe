'use client'
import React, { useState} from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import { cabinetGrotesk } from "@/app/fonts";
import PasswordCriteria from "@/components/passwordCriteria/Index";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useCreatePasswordMutation} from "@/service/auths/api";
import { useSearchParams } from 'next/navigation'


const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);
    const [confirmPassword, setConfirmPassword] = useState('');
    // const router = useRouter()
    const searchParams = useSearchParams()
    const [token ] = useState('token')
    const [createPassword] = useCreatePasswordMutation()

    // useEffect(()=> {
    //     if (searchParams){
    //         const pathVariable = searchParams.get("token")
    //         if (pathVariable){
    //             setToken(pathVariable)
    //         }
    //     }
    // }, [searchParams])


    const criteriaMessages = [
        "Must be at least 8 characters",
        "Must contain one special character",
        "Must contain one uppercase character",
        "Must contain one lowercase character"
    ];

    const validatePassword = (password: string) => {
        const criteria = [
            password.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /[A-Z]/.test(password),
            /[a-z]/.test(password)
        ];
        setCriteriaStatus(criteria);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);

    const getUserToken = () => {
            if (searchParams){
                const pathVariable = searchParams.get("token")
                if (pathVariable){
                    return pathVariable
                }
            }
    }


    const handleCreatePassword = async () => {
        const tooken = getUserToken()
        if (tooken){
             await createPassword({token: tooken, password: password})
            // if (response?.error?.data?.message){
            //     console.log("message: ", response?.error?.message)
            //     toast({
            //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //         description: response?.data?.error?.message,
            //         status: "error",
            //     })
            // }
        }

        const response = await createPassword({token: token, password: password})
        console.log("response: ", response)
    }

    return (
        <section id={'create-password-block'}
                 className={'bg-white shadow-custom h-fit rounded-md w-full md:w-[60%] md:mr-10 md:bg-meedlWhite md:ml-40 md:h-fit mb-10 py-6 px-5 grid gap-3 '}>
            <h1 id={'create-password-title'}
                className={`${cabinetGrotesk.className} antialiased text-meedlBlue font-[500] text-[24px] md:text-[30px] leading-[145%] `}>Create your password</h1>
                <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                    <div id={'create-password-inputs'} className={'grid  gap-4'}>
                        <AuthInputField
                            label={'Password'}
                            id={'password'}
                            type={'password'}
                            endAdornment={'Show'}
                            placeholder={'Enter password'}
                            value={password}
                            onChange={handlePasswordChange}
                            errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                        />
                        <PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />
                        <AuthInputField
                            label={'Confirm Password'}
                            id={'confirmPassword'}
                            type={'password'}
                            endAdornment={'show'}
                            placeholder={'Enter password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                </main>
                <AuthButton
                    backgroundColor={criteriaStatus.every(Boolean) && password === confirmPassword ? '#142854' : '#D0D5DD'}
                    buttonText={'Create password'}
                    disable={!criteriaStatus.every(Boolean) || password !== confirmPassword}
                    handleClick={handleCreatePassword}
                    id={"createPasswordButton"}
                    textColor={'#FFFFFF'}
                    width={'100%'}
                />
        </section>
    );
};

export default CreatePassword;