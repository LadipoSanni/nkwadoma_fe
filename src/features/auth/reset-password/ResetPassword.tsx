"use client"
import React, {ChangeEvent, useState} from 'react';
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
    const [newPassword, setNewPassword] = useState('new password')


    const handleReset = () => {
    }

    const handleChange = (event: ChangeEvent <HTMLTextAreaElement| HTMLInputElement > ) => {
        event.stopPropagation()
        setNewPassword(event.currentTarget.value)
    }

    const changePasswordVisibility = () =>{
        if (hidePassword){
            setHidePassword(false)
        }else{
            setHidePassword(true)
        }
    }


    return (

            <div
                id="resetPasswordComponent"
                className={` px-3 w-[90vw] rounded-md h-[50vh] bg-white grid md:px-0 md:grid md:place-items-center  border-2 border-slate-200 md:w-[90%] md:h-[98%] md:rounded`}
            >
                <div
                    id={"resetPasswordInnerContainer"}
                    className={`w-[92%] md:w-[96%] grid grid-rows-1 content-between  h-[98%] md:h-[90%]`}>
                    <div id="resetPasswordHeaderContainer" className={` h-[3rem] grid gap-0 `}>
                        <div id={"RESETPASSWORDHEADER"} className={`font-bold text-lg`}>{RESETPASSWORDHEADER}</div>
                        <div id={"RESETPASSWORDTEXT"} className={` text-[#667085]`}>{RESETPASSWORDTEXT}</div>
                    </div>
                    <div
                        id="buttonsContainer"
                        className={`h-[30%]  md:h-auto py-1 md:mb-10  md:mt-1 grid gap-4 md:grid md:gap-1 `}>
                        <div className={`w-[100%] h-[5rem] grid gap-0 `}>
                            <label className={`font-light`}>{EMAILHEADER}</label>
                            <TextField
                                id="resetEmailField"
                                data-testid={"resetEmailField"}
                                size='small'
                                placeholder={userEmail}
                                tabIndex={2}
                                sx={{width: 'inherit', height: '3rem'}}
                                disabled={true}
                                // value={}
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
                        <div className={`w-[100%] h-[5rem] grid gap-0  `}>
                            <label className={`font-light`}>New Password</label>
                            <TextField
                              size={"small"}
                               id="newPassWordContainer"
                              data-testid={"newPassWordContainer"}
                              onChange={(event)=> {handleChange(event)}}
                               sx={{width: 'inherit', height: '2.7rem', '& .MuiOutlinedInput-root': { "&.Mui-focused fieldset": {borderColor: '#757575'}}, }}
                               type={hidePassword ? 'password' : 'text'}
                              value={newPassword}
                               InputProps={{
                                  endAdornment: (
                                     <InputAdornment onClick={changePasswordVisibility}  position="end">
                                        {hidePassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                     </InputAdornment>
                                  ),
                               }}></TextField>
                        </div>
                    </div>
                    <div id={"authButtonContainer"} className={`w-[100%]`}>
                        <AuthButton disable={true} backgroundColor={'#0d9b48'} textColor={"white"} id={"resetPasswordButton"}
                                    buttonText={"Reset"} width={"inherit"} handleClick={handleReset}></AuthButton>
                    </div>
                </div>
            </div>

    );
};

export default ResetPassword;