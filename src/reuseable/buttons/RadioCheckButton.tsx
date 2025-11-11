import React from 'react';
import {inter500} from "@/app/fonts";
import {clsx} from "clsx";

interface Props {
    isChecked: boolean,
    text: string,
    onClick: ()=> void
}

const RadioCheckButton = ({text,isChecked,onClick}:Props) => {
    return (
        <button onClick={onClick} id={`RadioButton` + text?.replace(' ', '')} data-testid={`RadioButton` + text?.replace(' ', '')} className={` h-fit w-fit   flex gap-1  md:gap-4  text-[#4D4E4D] text-[14px] ${inter500.className} `}>
            <div className={clsx(` h-fit aspect-square rounded-full `,  isChecked ?  `  border-2 border-[#e6effb]` : `border-2 border-white `)}>
                <div className={clsx(` px-1 py-1 rounded-full aspect-square `, isChecked ? ` border h-fit border-meedlBlue bg-[#e8eaee]   ` :  ` bg-white border border-[#CFCFCF] `)}>
                    <div className={clsx(`  h-2 w-2 aspect-square  ` , isChecked ? "rounded-full bg-meedlBlue h-1 w-1 aspect-square " : 'bg-white rounded-full  h-1 w-1 aspect-square ')}></div>
                </div>
            </div>
            <p className={` mt-auto mb-auto text-[#4D4E4D] text-[15px]  ${inter500.className}  `}>{text}</p>
        </button>
    );
};

export default RadioCheckButton;