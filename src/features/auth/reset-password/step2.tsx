"use client"
import React, {useEffect, useState} from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";
import {useAppSelector} from "@/redux/store";

const Step2 = () => {
    const userResetPasswordInput = useAppSelector(state => state.resetPassword.userEmail)
    const [email, setEmail] = useState(` ${userResetPasswordInput}`)



    return (
        <div className={`w-[65%] h-[75%]`}>
            <AuthEmail email={email} header='Email sent'/>
        </div>
    );
};

export default Step2;