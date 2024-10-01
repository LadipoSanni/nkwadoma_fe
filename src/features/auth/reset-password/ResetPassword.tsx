"use client"
import React, {useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AuthButton from "@/reuseable/buttons/AuthButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ResetPassword = () => {

    const RESETPASSWORDHEADER: string = "Reset password?";
    const RESETPASSWORDTEXT: string = "Let's get you a new password";
    const EMAILHEADER: string = "Email";
    const userEmail: string = "folashade@gmail.com"
    const [hidePassword, setHidePassword] = useState(true)


    const handleReset = () => {

    }


    return (
        <div
            className={`h-[100vh] w-[100vw] grid place-content-center md:grid md:place-content-center md:h-[100vh] md:w-[100vw]`}
        >
            <div
                id="resetPasswordComponent"
                className={`w-[100vw] h-[100vh] bg-white  md:grid md:place-items-center md:shadow-md md:w-[35vw] md:h-[55vh] md:rounded`}
            >
                <div
                    className={`w-[92%] md:w-[80%] grid grid-rows-1 content-between px-2 h-[98%] md:h-[90%]`}>
                    <div className={` h-[3rem] grid gap-0 `}>
                        <div id={"RESETPASSWORDHEADER"} className={`font-bold text-lg`}>{RESETPASSWORDHEADER}</div>
                        <div id={"RESETPASSWORDTEXT"} className={` text-[#667085]`}>{RESETPASSWORDTEXT}</div>
                    </div>
                    <div
                        id="buttonsContainer"
                        className={`h-[30%]  md:h-auto py-1 mt-4 grid gap-4 md:grid md:gap `}>
                        <div className={`w-[100%] h-[5rem] grid gap-1 `}>
                            <label className={`mb-`}>{EMAILHEADER}</label>
                            <TextField
                                id="searchLoan"
                                size='small'
                                placeholder={userEmail}
                                tabIndex={2}
                                sx={{width: 'inherit', height: '3rem'}}
                                disabled={true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <MailOutlineIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className={`w-[100%] h-[5rem] grid gap-1  `}>
                            <label>New Password</label>
                            <TextField
                              size={"small"}
                               id="newPassWordContainer"
    sx={{width: 'inherit', height: '2.7rem'}}
    // type={hidePassword ? 'text' : 'password'}
    InputProps={{
        endAdornment: (
            <InputAdornment  position="end">
                {hidePassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            </InputAdornment>
        ),
    }}></TextField>
                        </div>
                    </div>
                </div>
                <div className={`w-[27vw] grid place-content-center `}>
                    <AuthButton backgroundColor={'#0d9b48'} textColor={"white"} id={"resetPasswordButton"}
                                buttonText={"Reset"} width={"inherit"} handleClick={handleReset}/>
                </div>
            </div>
        </div>

    );
};

export default ResetPassword;