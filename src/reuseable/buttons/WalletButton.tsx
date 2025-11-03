import { Button } from '@/components/ui/button';
import React from "react";
import CircleArrow from "@/components/icons/CircleArrow";
import { inter } from '@/app/fonts';

interface Props {
    text: string,
    icon?:  React.ReactNode,
    textColor?: string,
    bgColor?: string,

}

const WalletButton = ({text,textColor,icon,bgColor}:Props) => {
    return (
        <Button
            className={` bg-[${bgColor || '#F3F8FF'}] text-meedlBlue text-base ${inter.className}  w-fit px-6 py-1.5 rounded-full h-fit flex gap-1   `}
        >
            {icon}
            {text}
        </Button>
    );
};

export default WalletButton;