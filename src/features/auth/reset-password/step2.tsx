"use client"
import React, {useEffect, useState} from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";
import {useAppSelector} from "@/redux/store";

const Step2 = () => {
    const userResetPasswordInput = useAppSelector(state => state.resetPassword.userEmail)
    const [email, setEmail] = useState('')

    useEffect(() => {
        setEmail(userResetPasswordInput)
    }, []);

    return (
        <div className={`w-[80%] h-[80%]`}>
            <AuthEmail email={email} header='Email sent'/>
        </div>
    );
};

export default Step2;