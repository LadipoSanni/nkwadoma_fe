'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
                <span id={`end-adornment-${id}`} style={{ color: '#000000', cursor: 'pointer' }} onClick={handleToggleVisibility}>
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
        <div id={`custom-input-field-${id}`} className="flex flex-col gap-[6px]">
            <label id={`label-${id}`} htmlFor={id} className="text-[#344054] text-[14px] font-medium leading-[20px]">
                {label}
            </label>
            <div id={`input-container-${id}`} className="flex p-[10px_14px] items-center w-[30.8125rem] gap-2 rounded-[var(--radius-xs,_4px)] border border-[#D0D5DD] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
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