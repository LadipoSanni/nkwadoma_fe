'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {inter} from "@/app/fonts";

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
                      className={'text-labelBlue cursor-pointer text-[14px] font-normal leading-[22px]'}
                      onClick={handleToggleVisibility}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </span>
            );
        } else {
            return (
                <span id={`end-adornment-${id}`} style={{cursor: 'pointer'}} onClick={handleToggleVisibility}>
                    {isPasswordVisible ?
                        <VisibilityIcon style={{color: '#grey800', width: '16px', height: '16px'}}/> : endAdornment}
                </span>
            );
        }
    };

    return (
        <div id={`custom-input-field-${id}`} className={`${inter.className} flex flex-col gap-[8px]`}>
            <label id={`label-${id}`} htmlFor={id} className="text-labelBlue 0 text-[14px] font-normal leading-[22px]">
                {label}
            </label>
            <div id={`input-container-${id}`}
                 className="flex px-[14px] items-center h-[3rem] w-full gap-2 rounded-[var(--radius-xs,_4px)] border neutral700 bg-neutral50">
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    className={`${inter.className} w-full h-full text-grey900 text-[14px] font-normal leading-[22px] focus:outline-none`}
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