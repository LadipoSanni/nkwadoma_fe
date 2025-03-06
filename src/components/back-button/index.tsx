'use client'
import React from 'react';
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { inter500} from "@/app/fonts";
interface props {
    id: string,
    textColor: string,
    iconRight: boolean,
    text: string,
    handleClick: ()=> void

}

const BackButton = ({id,text, textColor, handleClick, iconRight}: props) => {
    return (
        <button
            id={id}
            data-testid={id}
            className={`w-fit h-fit md:w-fit md:flex items-center text-${textColor} md:fit flex gap-1`}
            onClick={handleClick}
        >
            {iconRight &&
                <MdArrowBack  style={{color: `${textColor}`}}/>
            }
            <span
                style={{color: `${textColor}`}}
                id={ text+`id`} data-testid={ text+`id`} className={` ${inter500.className} text-[14px]  text-${textColor} `}>{text}</span>
            {!iconRight &&
                <MdArrowForward style={{color: `${textColor}`}}/>
            }

        </button>
    );
};

export default BackButton;