import React from 'react';
import AuthEmail from "@/reuseable/modals/AuthEmail";
import { cookies} from "next/headers"

const Step2 = () => {
    const cookie = cookies()
    const emailInput : string | undefined = cookie.get("resetPasswordEmail")?.value;


    return (
        <div className={`md:w-[55%] md:h-[70%] w-[98%] `}>
            <AuthEmail email={emailInput} header='Email sent'/>
        </div>
    );
};

export default Step2;