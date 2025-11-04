'use client'
import React from 'react';
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { inter500} from "@/app/fonts";
interface props {
    id: string,
    textColor: string,
    iconBeforeLetters: boolean,
    text: string,
    handleClick: ()=> void,
    sx?: string,
    className?: string,
    isShow?: boolean,
    isBold?: boolean,

}

const BackButton = ({id,text,sx,isBold, textColor, handleClick, iconBeforeLetters,className,isShow = true}: props) => {
    return (
        <button
            id={id}
            data-testid={id}
            className={`w-fit h-fit md:w-fit md:flex items-center  ${sx} text-${textColor} md:fit flex ${isBold ? 'gap-2' : 'gap-1' } `}
            onClick={handleClick}
        >
            {iconBeforeLetters && isShow &&
                <MdArrowBack  className={` ${isBold ? `h-6 w-6` : 'h-4 w-4'} text-[${textColor || '#142854'}]   `} style={{color: `${textColor}`}}/>
            }
            <span
                style={{color: `${textColor}`}}
                id={ text+`id`} data-testid={ text+`id`} className={` ${inter500.className} ${className}  ${isBold ? 'text-[16px]' : 'text-[11px]'}  text-[${textColor || '#142854'}]   `}>{text}</span>
            {!iconBeforeLetters && isShow &&
                <MdArrowForward  className={` ${isBold ? `h-6 w-6` : 'h-4 w-4'} text-[${textColor || '#142854'}] `} style={{color: `${textColor}`}}/>
            }

        </button>
    );
};

export default BackButton;