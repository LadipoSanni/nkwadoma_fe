import React, {ButtonHTMLAttributes} from 'react';
import {inter} from '@/app/fonts'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    id: string;
};

const ReusableButton: React.FC<ButtonProps> = ({className, children, id, ...props}) => {
    return (
        <button
            className={`${inter.className} px-5 py-2 rounded-md bg-meedlBlue text-white h-[2.8125rem] text-[14px] font-semibold leading-[150%] ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            id={`${id}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ReusableButton;