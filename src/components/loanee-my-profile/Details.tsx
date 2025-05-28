import React from 'react';
import {cabinetGroteskBold, inter} from '@/app/fonts'
import {formatAmount, formateDigits} from "@/utils/Format";
interface Props {
    id: string;
    name: string;
    value: string| number;
    maxWidth: string;
    valueType:'percentage'| 'digit'| 'currency' | 'tenor'


}

const Details = ({id, name, value, maxWidth, valueType}: Props) => {
    return (
        <div id={id} data-testid={id} className={`md:border bg-white grid rounded-md px-3 py-4  w-full md:border-grey-200 border border-grey-200 `}>
           <div className={` bg-[#f9f9f9] px-4 py-4 grid gap-4 w-full `}>
               <span id={'detailName:'+ name} className={` ${inter.className} text-[#6A6B6A] text-[14px] `}>{name}</span>
               <span id={'detailsValue:' + value} className={` ${cabinetGroteskBold.className} text-[32px]  text-meedlBlue  `}>
                   {valueType === 'percentage' ? (`${value}%`) : valueType === 'digit' ? (`${value}`) : valueType === 'tenor' ? (`${value} months`) : (`${formatAmount(Number(value))}`)  }
               </span>
           </div>
        </div>
    );
};

export default Details;