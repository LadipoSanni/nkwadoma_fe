import React from 'react';
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';

interface StatusBadgeProps {
    status: string | undefined;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
    let statusClassName = "rounded-lg px-2 ";
    let displayText = capitalizeFirstLetters(status || "");
    
    switch (status) {
        case "ACTIVE":
            statusClassName += "bg-[#E6F2EA] text-[#045620]";
            break;
        case "INVITED":
            statusClassName += "bg-[#F3F8FF] text-meedlBlue w-20";
            break;
        case "PENDING_APPROVAL":
            statusClassName += "bg-[#FEF6E8] text-[#68442E] w-20";
            displayText = "Pending";
            break;
        case "DEACTIVATED":
            statusClassName += "bg-[#FBE9E9] text-[#971B17] w-24";
            break;
        default:
            statusClassName += "bg-[#F9EAE6] text-[#511403]";
            break;
    }
    
    return <span  className={`${statusClassName} ${className}`}>{displayText}</span>;
};