import React, { InputHTMLAttributes } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ReusableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const CustomInputField: React.FC<ReusableInputProps> = ({ label, id, ...props }) => {
    return (
        <div id={`custom-input-field-${id}`} className="flex flex-col gap-[6px]">
            <label id={`label-${id}`} htmlFor={id} className="text-[#344054] text-[14px] font-medium leading-[20px]">
                {label}
            </label>
            <div id={`input-container-${id}`} className="flex p-[10px_14px] items-center gap-2 rounded-[var(--radius-xs,_4px)] border border-[#D0D5DD] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <input
                    id={id}
                    className="w-[276px] bg-transparent text-[#101828]"
                    {...props}
                />
                <VisibilityOffIcon id={`visibility-icon-${id}`} style={{ color: '#000000', width: '16px', height: '16px' }} />
            </div>
        </div>
    );
};

export default CustomInputField;