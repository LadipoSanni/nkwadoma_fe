'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {inter} from "@/app/fonts";

interface ReusableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    endAdornment?: React.ReactNode | string;
}

const AuthInputField: React.FC<ReusableInputProps> = ({ label, id, endAdornment, type, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const renderEndAdornment = () => {
        if (typeof endAdornment === 'string') {
            return (
                <span id={`end-adornment-${id}`} className={'text-[#BDC2C9] cursor-pointer text-[14px] font-normal leading-[22px]'} onClick={handleToggleVisibility}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </span>
            );
        } else {
            return (
                <span id={`end-adornment-${id}`} style={{ cursor: 'pointer' }} onClick={handleToggleVisibility}>
                    {isPasswordVisible ? <VisibilityIcon style={{ color: '#000000', width: '16px', height: '16px' }} /> : endAdornment}
                </span>
            );
        }
    };

    return (
        <div id={`custom-input-field-${id}`} className={`${inter.className} flex flex-col gap-[6px]`}>
            <label id={`label-${id}`} htmlFor={id} className="text-[#101828] text-[14px] font-normal leading-[22px]">
                {label}
            </label>
            <div id={`input-container-${id}`} className="flex p-[10px_14px] items-center w-full gap-2 rounded-[var(--radius-xs,_4px)] border border-[#D0D5DD] bg-[#FFF] ">
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    className="w-full bg-transparent text-[#101828] focus:outline-none focus:border-none"
                    {...props}
                />
                {renderEndAdornment()}
            </div>
        </div>
    );
};

export default AuthInputField;