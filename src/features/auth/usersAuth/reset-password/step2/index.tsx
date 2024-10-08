"use client"
import React from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";

const Index = () => {
    const emailInput : string | null   = sessionStorage.getItem("userEmailInputOnResetPassword")


    return (
        <div className={`md:w-[55%] md:h-[70%] w-[98%] `}>
            <AuthEmail email={emailInput} header='Email sent'/>
        </div>
    );
};

export default Index;