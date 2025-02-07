import React from 'react';
import {  ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import {inter} from "@/app/fonts";
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
                <ArrowLeftIcon/>
            }
            <span id={ text+`id`} data-testid={ text+`id`} className={` ${inter.className} text-sm text-${textColor} `}>{text}</span>
            {!iconRight &&
                <ArrowRightIcon/>
            }

        </button>
    );
};

export default BackButton;