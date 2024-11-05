"use client"
import * as React from "react";
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";
import AuthInputField from "@/reuseable/Input/AuthInputField";
import Link from 'next/link'
import {cabinetGrotesk} from "@/app/fonts";
import {    validateEmailInput}  from "@/utils/GlobalMethods"
import {useLoginMutation} from "@/service/auths/api"


const Login: React.FC = () => {
    
    const fetchUrl =  "https://api-systest.learnspace.africa/api/v1/auth/login"
    

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [ validEmail , setValidEmail ] = useState(false)
    const [login, {data}] = useLoginMutation()


    const validateEmail = (input: string) => {
        const disable  = validateEmailInput(input);
        setValidEmail(disable)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleReset = async () => {
        const response = await login({email, password})
        console.log("data: ", data, "response: ",response)
    }

    const handleLogin =  async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        //  console.log('Login successful:', {email,password});

          try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to log in');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            
          
        } catch (err) {
            
            console.error('Login failed:', err);
        } finally {
           
        }
        
    };

    const isFormValid = validEmail  && password.length >= 8;


    return (

        <div
            className="w-full md:w-[52%] md:mr-20 h-fit   md:h-fit bg-meedlWhite  border border-slate-200 rounded-md">
            <div data-testid={`loginDivId`} id={`loginDivId`}
                 className="px-4 py-4">
                <h1 className={`${cabinetGrotesk.className} text-meedlBlue mt-3  text-2xl leading-5`}>Log in to your
                    account</h1>
                       <form onSubmit={handleLogin} data-testid={`email&PasswordId`} id={`emailAndPasswordId`} >
                <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`}
                     className="pt-5 space-y-5">
                    <div data-testid={`emailId`} id={`emailId`}>
                        <AuthInputField label={"Email address"} id={`email`}
                                        data-testid={`loginEmailId`}
                                        placeholder={`Enter email address`}
                                        type="email"
                                        value={email}
                                        onChange={handleEmail}
                        />
                    </div>
                    <div data-testid={`passwordId`} id={`passwordId`}>
                        <AuthInputField label={`Password`} id={'password'}
                                        data-testid={`password`}
                                        type={'password'}
                                        placeholder={`Enter password`}
                                        endAdornment={`show`}
                                        value={password}
                                        onChange={handlePassword}>
                        </AuthInputField>
                    </div>
                    <div id={"authButtonContainer"} className={`w-[100%]`}>
                        <AuthButton disable={!isFormValid} backgroundColor={'#142854'} textColor={"white"}
                                    id={"loginButton"}
                                    data-testid={`loginButton`}
                                    buttonText={"Login"} width={"inherit"}
                                    handleClick={
                                        handleReset}>
                        </AuthButton>
                      
                    </div>
                    
                    <p className="flex items-center justify-center text-sm text-forgetPasswordBlue leading-4">
                        Forgot Password? <Link href={"/auth/reset-password"}
                                            className="font-medium text-meedlBlue ml-1  underline">Reset it
                        here</Link>
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Login