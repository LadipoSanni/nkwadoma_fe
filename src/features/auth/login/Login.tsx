"use client"
import * as React from "react";
// import {useRouter} from 'next/navigation'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {useState} from "react";
import AuthButton from "@/reuseable/buttons/AuthButton";

const Login: React.FC = () => {
    // const route = useRouter()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     if (email && password) {
    //         // route("/auth/forget-password")
    //     }
    // }

    const handleReset = () => {

    }


    return (
        <section data-testid={`parentDivId`} id={`parentDivId`}
                 className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
            <div data-testid={`childDivId`} id={`childDivId`}
                 className="w-full bg-white rounded-lg md:shadow sm:max-w-md xl:p-0">
                <div data-testid={`loginDivId`} id={`loginDivId`} className="p-1 space-y-2 md:space-y-1 sm:p-14">
                    <h1 className=" font-sans text-[#101828] leading-5 md:text-xl font-bold ">
                        Login
                    </h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className={`font-sans text-base text-[#57595D] `}>Welcome, It's good to see you again !</p>
                    <div data-testid={`emailAndPasswordId`} id={`emailAndPasswordId`} className="pt-5 space-y-5">
                        <div data-testid={`emailId`} id={`emailId`}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id={`email`}
                                data-testid="email"
                                type={`email`}
                                value={email}
                                onChange={handleEmail}
                                aria-describedby="outlined-weight-helper-text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <MailOutlinedIcon/>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    'aria-label': 'weight',
                                    placeholder: 'e.g shola@gmail.com',
                                }}
                                style={{marginTop: '5px'}}
                                className="w-full"
                            />
                        </div>
                        <div data-testid={`passwordId`} id={`passwordId`}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id={`password`}
                                data-testid="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePassword}
                                style={{marginTop: '5px'}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                className={`w-full`}
                            />
                        </div>
                        <div id={"authButtonContainer"} className={`w-[100%]`}>
                            <AuthButton disable={true} backgroundColor={'#0d9b48'} textColor={"white"}
                                        id={"resetPasswordButton"}
                                        buttonText={"Login"} width={"inherit"} handleClick={handleReset}></AuthButton>
                        </div>
                        {/*<div data-testid={`submitButton`} id={`submitButton`} className={`pt-6`}>*/}
                        {/*    <button*/}
                        {/*        id={`loginButton`}*/}
                        {/*        data-testid={`loginButton`}*/}
                        {/*        type="submit"*/}
                        {/*        className={`w-full text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center transition-all duration-300 ${*/}
                        {/*            isFormValid*/}
                        {/*                ? "bg-[#0D9B48] cursor-pointer"*/}
                        {/*                : "bg-[#90D8AE] cursor-not-allowed"*/}
                        {/*        }`}*/}
                        {/*        disabled={!isFormValid}*/}
                        {/*    >*/}
                        {/*        Login*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <a href="/auth/forget-password"
                           className="flex items-center justify-center text-sm  text-[#101828] leading-4">Forgot
                            Password?</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login