"use client"
import React from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";
import {useAppSelector} from "@/redux/store";

const Step2 = () => {


    const emailInput  = useAppSelector(state => state.authSlice.resetPasswordUserInput)



    return (
        <div className={`md:w-fit md:mr-20 h-fit md:h-[40%] w-fit `}>
            <AuthEmail email={emailInput} header='Email sent'/>
        </div>
    );
};

export default Step2;