"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";
import { Button } from "@/components/ui/button"





const AuthButton = ({id, buttonText, width, handleClick, textColor, backgroundColor, disable}: AuthButtonPropsType) => {
    return (
        <Button
            data-testid="auth-button"
            disabled={disable}
            id={id}
            onClick={handleClick}
            style={{height: '3rem',width: `${width}`, color: `${textColor}`, backgroundColor: `${disable ? "#D0D0D0": backgroundColor}`}}
            className={`grid place-content-center rounded font-bold text-sm`}
        >
            {buttonText}
        </Button>
    );
};

export default AuthButton;