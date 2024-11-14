'use client'
import React, { useState} from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import { cabinetGrotesk } from "@/app/fonts";
import PasswordCriteria from "@/components/passwordCriteria/Index";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {useCreatePasswordMutation} from "@/service/auths/api";
import {useRouter, useSearchParams} from 'next/navigation'
import { useToast} from "@/hooks/use-toast";
import {jwtDecode} from "jwt-decode";
import {storeUserDetails} from "@/features/auth/usersAuth/login/action";


const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false, false]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    const token  = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb3NpdDQyOTEzQGxpbmVhY3IuY29tIiwiaWF0IjoxNzMxNTY5ODI2LCJleHAiOjE4MTc5Njk4MjZ9.NwCu-dOg_YQBtiu6DbNaQ5s99c9xrMvs-Zq1NMd_09U";
    const [createPassword, {error, isError, isSuccess, data}] = useCreatePasswordMutation()

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
        "Must contain one lowercase character",
        "Must contain one digit"
    ];

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


    const {toast} = useToast()
     const rr = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXBzb2plZnlpQGd1ZnVtLmNvbSIsImlhdCI6MTczMTU4Mzg1MSwiZXhwIjoxODE3OTgzODUxfQ.D9JehQF0gd-izmlyi-LXJCrJGOyoSDf6ZsJaFmL82h0"


    interface CustomJwtPayload {
        email: string;
        realm_access: {
            roles: string[];
        };

    }
    const handleCreatePassword = async () => {
        // const token = getUserToken()
        // console.log("token: ", token)

        try {
            const response = await createPassword({token: rr, password: password}).unwrap()
            console.log("responsebhybyuihiuhuihiu : ",response, "isError: ", isError, "isSuccesss: ", isSuccess, "error: ", error, "data: ", data)
            console.log("data: ", data, "response; ", response)
            const access_token = response?.data?.access_token
            const decode_access_token = jwtDecode<CustomJwtPayload>(access_token)
            const user_email = decode_access_token?.email
            console.log("user email: ",user_email)
            const user_role = decode_access_token?.realm_access?.roles[0]
            console.log("user role: ",user_role)
            storeUserDetails(access_token, user_email, user_role)
            router.push("/Overview")
            toast({
                description: response?.message,
                status: "error",
            })


        }catch (error){
            console.log("error: ", error)

            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: error?.data?.token?.message,
                status: "error",
            })

            }

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