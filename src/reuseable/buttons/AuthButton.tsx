"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";



const AuthButton = ({id, buttonText, width, handleClick, textColor, backgroundColor}: AuthButtonPropsType) => {
    return (
        <button
            id={id}
            onClick={handleClick}
            style={{height: '2.5rem',width: `${width}`, color: `${textColor}`, backgroundColor: `${backgroundColor}`}}
            className={`grid place-content-center rounded-md`}
        >
            {buttonText}
        </button>
    );
};

export default AuthButton;