import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";



const AuthButton = ({id, buttonText, width, handleClick, textColor, backgroundColor}: AuthButtonPropsType) => {
    return (
        <button
            id={id}
            onClick={handleClick}
            className={`w-${width} text-${textColor} bg-${backgroundColor} flex`}
        >
            {buttonText}
        </button>
    );
};

export default AuthButton;