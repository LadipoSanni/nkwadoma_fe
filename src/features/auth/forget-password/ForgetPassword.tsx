"use client"
import * as React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {useState} from "react";

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const handleForgetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const isFormValid = email

    return (
        <section data-testid={`forgetPasswordId`} id={`forgetPasswordId`}
                 className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
            <div data-testid={`allDivId`} id={`allDivId`}
                 className="w-full bg-white rounded-lg md:shadow sm:max-w-md xl:p-0">
                <div data-testid={`forgetEmailId`} id={`forgetEmailId`} className="p-1 space-y-2 md:space-y-1 sm:p-14">
                    <h1 className=" font-sans text-[#101828] leading-5 md:text-xl font-bold ">
                        Forgot Password?
                    </h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className={`font-sans text-base text-[#57595D] `}>Input Your Email Let’s Verify You!</p>
                    <div data-testid={`emailDivId`} id={`emailDivId`} className={`pt-6`}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id={`email`}
                            data-testid="email"
                            type={`email`}
                            value={email}
                            onChange={handleForgetPassword}
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
                        <div className={`pt-10`}>
                            <button
                                type="submit"
                                className={`w-full text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center transition-all duration-300 ${
                                    isFormValid
                                        ? "bg-[#0D9B48] cursor-pointer"
                                        : "bg-[#90D8AE] cursor-not-allowed"
                                }`}
                                disabled={!isFormValid}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                    {/*<AuthButton id={`loginButton`} buttonText={`Login`} width={`30px`} textColor={`white`} backgroundColor={`#90D8AE`} handleClick={handleLogin}/>*/}
                </div>
            </div>
        </section>
    )
}
export default ForgetPassword