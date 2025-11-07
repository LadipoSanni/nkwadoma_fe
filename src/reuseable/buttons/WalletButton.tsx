import { Button } from '@/components/ui/button';
import React from "react";
import { inter } from '@/app/fonts';

interface Props {
    text: string,
    icon?:  React.ReactNode,
    textColor?: string,
    bgColor?: string,
    handleClick?: () => void,
}

const WalletButton = ({text,textColor,icon,bgColor,handleClick}:Props) => {
    return (
        <Button
            onClick={handleClick}
            id={'walletButton' + text?.replace(' ','')}
            data-testid={'walletButton' + text?.replace(' ','')}
            className={` hover:bg-[#E8EAEE]  bg-[${bgColor || '#F3F8FF'}] text-[${textColor || 'meedlBlue'}] text-[15px] ${inter.className}  w-fit px-5 py-1.5 rounded-full h-fit flex gap-0.5  `}
        >
            {icon}
            {text}
        </Button>
    );
};

export default WalletButton;