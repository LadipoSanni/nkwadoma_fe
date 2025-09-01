import React from 'react';
import {cabinetGroteskBold, inter} from '@/app/fonts'
import {formatAmount, formateDigits} from "@/utils/Format";
import styles from './index.module.css'
import {MdHelpOutline} from 'react-icons/md';

interface Props {
    id: string;
    name: string;
    value?: string| number;
    maxWidth?: string;
    valueType:'percentage'| 'digit'| 'currency' | 'tenor',
    showAsWholeNumber?: boolean,
    isLoading?: boolean,
    sx?:string,
    className?: string,
    showIcon?: boolean,
}

const Details = ({id, name, value,sx, valueType,showAsWholeNumber,showIcon, isLoading,className}: Props) => {
    return (
        <div id={id} data-testid={id} className={`md:border  h-fit bg-white grid w-full md:w-full lg:w-full   rounded-md px-3 py-4  md:border-grey-200 border border-grey-200 ${className}`}>
           <div className={`  ${isLoading ? 'animate-pulse bg-[#f4f4f5] h-[6rem]  ' : 'bg-[#f9f9f9]'}    px-4 py-4 grid gap-4  ${sx ? `${sx}` : `w-full `}`}>
               <div className={` flex gap-3  `}>
                   <span id={'detailName:'+ name} className={` ${inter.className} text-[#6A6B6A] text-[14px] ${isLoading ? 'hidden ' : ''} `}>{name}</span>
                   {showIcon ? <MdHelpOutline className={` text-[#939CB0] mt-auto mb-auto   `}/>: ''}
               </div>
               <span id={'detailsValue:' + value} className={` ${cabinetGroteskBold.className} ${isLoading ? 'hidden ' : ''}  text-[32px] ${styles.details} max-w-[100%]  text-meedlBlue  `}>
                   {valueType === 'percentage' ? (`${value}%`) : valueType === 'digit' ? (`${formateDigits(Number(value))}`) : valueType === 'tenor' ? (`${Number(value) > 1 ? `${value} months` : `${value} month` } `) : (`${formatAmount(Number(value),showAsWholeNumber)}`)  }
               </span>
           </div>
        </div>
    );
};

export default Details;