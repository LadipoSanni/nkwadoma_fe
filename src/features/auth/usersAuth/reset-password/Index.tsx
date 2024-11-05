import React from 'react';
import Step1 from "@/features/auth/usersAuth/reset-password/enter-email-component/index"
import Step2 from "@/features/auth/usersAuth/reset-password/email-sent-modal/index"
import {getItemFromLocalStorage} from "@/utils/localStorage";


const ResetPassword = () => {
    const isEmailEntered = getItemFromLocalStorage("userEmailInputOnResetPassword")


    return (
        <div className={`md:w-full md:h-full w-fit mb-20 h-full grid content-start md:flex place-content-end`} >
            {isEmailEntered?.length === 0  ?
                <Step1/>
                :
                <Step2/>
            }

        </div>
    );
};

export default ResetPassword;