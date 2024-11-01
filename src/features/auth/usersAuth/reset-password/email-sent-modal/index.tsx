"use client"
import React from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";

const Step2 = () => {


    const emailInput  = React.useMemo(() => {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem("userEmailInputOnResetPassword")
        }
    }, [])



    return (
        <div className={`md:w-fit bg-purple-100  md:mr-20 h-fit md:h-[40%] w-[100vw] `}>
            <AuthEmail email={emailInput} header='Email sent'/>
        </div>
    );
};

export default Step2;