'use client'
import React from 'react';
import {cabinetGroteskBold, inter, inter500} from "@/app/fonts";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import {NumericFormat} from "react-number-format";
import { MdKeyboardArrowDown } from "react-icons/md";


interface PerformanceCardProps {
    showMonthPick?:boolean;
    id: string;
    maxWidth: string;
    title: string;
    value: string | number; // performance amount
    isValueInPercentage?: boolean; // value can eight be in percentage  or amount
    showPerformancePercentage?: boolean;
    didValueIncrease: boolean; // did performance amount increase or decrease
    percentage: string | number;
    showContainerBorder: boolean;
    isSmall?: boolean;

}



const PerformanceCard = ({id, showMonthPick,maxWidth, isSmall,title, value, isValueInPercentage, showContainerBorder, showPerformancePercentage,percentage, didValueIncrease}: PerformanceCardProps) => {
    return (
        <div
            id={id} data-testid={id}
            className={` ${isSmall ? ` md:w-[${maxWidth}] w-full ` : `md:min-w-fit min-w-fit max-w[${maxWidth}] md:max-w-[${maxWidth}]`} md:min-w-fit min-w-fit max-w[${maxWidth}] md:max-w-[${maxWidth}]    ${showContainerBorder ? 'md:border md:border-blue550 border border-blue550 py-3 px-3 md:h-[9.5rem] h-fit max-h-[10rem] md:max-h-[10rem] ' : ' md:max-h-[7rem] max-h-fit '}  rounded-md `}>
            <div className={` ${isSmall? `md:w-full w-full  ` : `md:min-w-fit  min-w-fit w-[${maxWidth}] md:w-[${maxWidth}] `} h-full bg-grey105 md:bg-grey105 px-4 py-4 grid gap-2 content-between`}>
                <div className={` md:flex md:justify-between md:full flex justify-between `}>
                    <p id={'performanceTitleId'+title} data-testid={title} aria-labelledby={title} className={`md:text-[16px] text-[14px] ${inter.className} text-black300`}>{title}</p>
                    {showMonthPick &&
                        <div className={` ${inter500.className} md:text-[12px] px-2 py-1 gap-2 md:gap-0.5 rounded-md md:rounded-md  md:py-1 md:px-2 flex md:flex md:bg-white bg-white md:w-fit md:h-fit md:border md:border-[#e7eaee]  w-fit h-fit border border-[#e7eaee]  `}>
                            <p id={'selectedYearOnPerformanceCard'} className={`mt-auto mb-auto `}>2025</p>
                            <MdKeyboardArrowDown id={'MdKeyboardArrowDown'} className={`w-5 h-5 mt-auto mb-auto `}/>
                        </div>
                    }
                </div>
                <div className={` grid gap-2 md:flex justify-between w-fit md:w-fit  bg-purple-200 `}>
                    {isValueInPercentage ?
                        <p id={'amountPercentage'} className={` ${cabinetGroteskBold.className} md:text-[36px] text-[24px] x text-meedlBlue `}>{value}%</p>
                        :
                        <NumericFormat
                            width={'1rem'}
                            id={'performancePercentageAmount'}
                            name={'performancePercentageAmount'}
                            type="text"
                            disabled={true}
                            thousandSeparator=","
                            decimalScale={0}
                            fixedDecimalScale={true}
                            prefix={'₦'}
                            className={`${cabinetGroteskBold.className} md:min-w-fit md:bg-red-100 bg-grey105 max-w-fit md:max-w-fit  md:text-[36px] text-[24px] text-meedlBlue  `}
                            value={value}
                        />
                    }
                    { showPerformancePercentage && <div
                        id={'performancePercentageDiv'}
                        data-testid={'performancePercentageDiv'}
                        className={` flex rounded-full w-fit py-0.5 gap-1 px-1 h-fit mt-auto mb-auto  ${didValueIncrease ? 'text-[#971B17] md:bg-error150 md:text-[#971B17] bg-error150 ' : `text-[#085322] bg-[#E7F5EC] `}   `}>
                        {didValueIncrease ?
                            <MdOutlineArrowDownward id={'MdOutlineArrowDownward'} className={` mt-auto mb-auto  `}/>
                            :
                            <MdArrowUpward id={'MdArrowUpward'} className={` mt-auto mb-auto  `}/>}
                        <p id={'valuePercentage'} className={` ${inter.className} text-[13px]  `}>{percentage}%</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;