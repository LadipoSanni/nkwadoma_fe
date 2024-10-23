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
        <div className={`md:w-[40%] md:h-[60%] w-[98%] `}>
            <AuthEmail email={emailInput} header='Email sent'/>
        </div>
    );
};

export default Step2;