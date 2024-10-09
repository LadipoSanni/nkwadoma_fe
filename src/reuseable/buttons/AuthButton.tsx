"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";



const AuthButton = ({id, buttonText, width, handleClick, textColor, backgroundColor, disable}: AuthButtonPropsType) => {
    return (
        <button
            data-testid="auth-button"
            disabled={disable}
            id={id}
            onClick={handleClick}
            style={{height: '3.5rem',width: `${width}`, color: `${textColor}`, backgroundColor: `${disable ? "#D0D5DD": backgroundColor}`}}
            className={`grid place-content-center rounded font-bold text-sm`}
        >
            {buttonText}
        </button>
    );
};

export default AuthButton;