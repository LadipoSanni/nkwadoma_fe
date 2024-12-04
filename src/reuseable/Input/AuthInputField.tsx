'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import {inter} from "@/app/fonts";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface ReusableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    endAdornment?: React.ReactNode | string;
    errorMessage?: string;

}

const AuthInputField: React.FC<ReusableInputProps> = ({label, id, endAdornment, type, errorMessage, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const renderEndAdornment = () => {
        if (typeof endAdornment === 'string') {
            return (
                <span id={`end-adornment-${id}`}
                      className={'text-labelBlue cursor-pointer flex justify-center items-center mr-3.5 text-[14px] font-normal leading-[22px] select-none'}
                      onClick={handleToggleVisibility}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </span>
            );
        }
    };

    return (
        <div id={`custom-input-field-${id}`} className={`${inter.className} grid gap-1`}>
            <Label id={`label-${id}`} htmlFor={id} className="text-labelBlue font-normal leading-4 text-sm  ">
                {label}
            </Label>
            <div id={`input-container-${id}`}
                 className={`flex items-center h-[2.7rem] w-full gap-2 rounded-md border-2 border-blue500 neutral700 `}>
                <Input
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    className={`${inter.className} focus-visible:ring-0  w-full h-full border-0 text-grey900 text-[14px] bg-white font-normal leading-[22px] focus:outline-none`}
                    {...props}
                />
                {renderEndAdornment()}
            </div>
            {errorMessage && <div className={'flex px-4 items-center'}><p id={`error-message-${id}`} className="text-error600 text-[14px] font-normal">{errorMessage}</p>
            </div>}
        </div>
    );
};

export default AuthInputField;