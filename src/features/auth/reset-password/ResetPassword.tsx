import React from 'react';
import {FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {SearchOutlined} from "@mui/icons-material";

const ResetPassword = () => {

    const RESETPASSWORDHEADER : string = "Reset password?";
    const RESETPASSWORDTEXT : string = "Let's get you a new password";
    const EMAILHEADER: string = "Email";
    const userEmail: string = "folashade@gmail.com"


    return (
        <div
            className={`h-[100vh] w-[100vw] grid place-content-center md:grid md:place-content-center md:h-[100vh] md:w-[100vw]`}
        >
            <div
                id="resetPasswordComponent"
                className={`w-[100vw] h-[100vh] bg-white  md:grid md:place-items-center md:shadow-md md:w-[25vw] md:h-[50vh] md:rounded`}
            >
                <div
                    className={`w-[92%] md:w-[80%] px-4 h-[98%] md:h-[90%]`}
                >
                    <div id={"RESETPASSWORDHEADER"} className={`font-bold text-lg`}>{RESETPASSWORDHEADER}</div>
                    <div id={"RESETPASSWORDTEXT"} className={` text-[#667085]`}>{RESETPASSWORDTEXT}</div>
                    <div
                        id="buttonContainer"
                        className={`h-[30%] md:h-[12rem] mt-4 grid gap-2 md:grid md:gap-2 md:mt-[1rem]`}
                    >
                        <div className={`w-[inherit] h-[5rem] `}>
                            <div>{EMAILHEADER}</div>
                            {/*<FormControl*/}
                            {/*    sx={{width: 'inherit', height:"1rem", '& .MuiInputBase-input' : {borderColor: '#dde1e6'} }} variant="outlined" disabled={true}>*/}
                            {/*    <OutlinedInput*/}
                            {/*        id="outlined-adornment-weight"*/}
                            {/*        startAdornment={<InputAdornment position="start">{userEmail}</InputAdornment>}*/}
                            {/*        endAdornment={<InputAdornment position="end"><MailOutlineIcon/></InputAdornment>}*/}
                            {/*        aria-describedby="outlined-weight-helper-text"*/}
                            {/*        inputProps={{*/}
                            {/*            'aria-label': `${userEmail}`,*/}
                            {/*        }}*/}
                            {/*        label={userEmail}></OutlinedInput>*/}
                            {/*</FormControl>*/}
                            <TextField
                                id="searchLoan"
                                // size='small'
                                placeholder={userEmail}
                                tabIndex={2}
                                sx={{width: 'inherit'}}
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

                    </div>

                </div>

            </div>
        </div>

    );
};

export default ResetPassword;