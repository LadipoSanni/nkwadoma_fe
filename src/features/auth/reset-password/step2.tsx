"use client"
import React from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";
import {useAppSelector} from "@/redux/store";

const Step2 = () => {
    const userEmailResetPasswordEmail = useAppSelector(state => state.resetPassword.userEmail)
    const text: string = 'We’ve sent a link to create a new password to  '+ <div  className={'text-bold'}>{userEmailResetPasswordEmail}</div> +'. If it’s not in your inbox, check your spam folder.'
    return (
        <div className={`w-[80%] h-[80%]`}>
            <AuthEmail text={text} header='Email sent'/>
        </div>
    );
};

export default Step2;