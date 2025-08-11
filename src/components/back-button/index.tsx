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

}

const BackButton = ({id,text,sx, textColor, handleClick, iconBeforeLetters}: props) => {
    return (
        <button
            id={id}
            data-testid={id}
            className={`w-fit h-fit md:w-fit md:flex items-center  ${sx} text-${textColor} md:fit flex gap-1`}
            onClick={handleClick}
        >
            {iconBeforeLetters &&
                <MdArrowBack  className={` h-4 w-4 ${textColor ? `text-[#142854]` : `hover:text-[#435376]`} `} style={{color: `${textColor}`}}/>
            }
            <span
                style={{color: `${textColor}`}}
                id={ text+`id`} data-testid={ text+`id`} className={` ${inter500.className} text-[11px] ${textColor ? `text-[#142854]` : `hover:text-[#435376]`}   text-${textColor} `}>{text}</span>
            {!iconBeforeLetters &&
                <MdArrowForward  className={`${textColor ? `text-[#142854]` : `hover:text-[#435376]`} `} style={{color: `${textColor}`}}/>
            }

        </button>
    );
};

export default BackButton;