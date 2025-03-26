'use client'
import React from 'react';
import {cabinetGroteskBold, inter} from "@/app/fonts";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import {NumericFormat} from "react-number-format";

interface PerformanceCardProps {
    showMonthPick?:boolean;
    maxWidth: string;
    title: string;
    value: string | number; // performance amount
    isValueInPercentage?: boolean; // value can eight be in percentage  or amount
    showPerformancePercentage?: boolean;
    didValueIncrease: boolean; // did performance amount increase or decrease
    percentage: string | number;
    showContainerBorder: boolean;

}

const PerformanceCard = ({maxWidth, title, value, isValueInPercentage, showContainerBorder, showPerformancePercentage,percentage, didValueIncrease}: PerformanceCardProps) => {
    return (
        <div className={` md:min-w-fit min-w-fit max-w[${maxWidth}] md:max-w-[${maxWidth}] py-3 px-3 ] md:h-[9.5rem] h-fit max-h-[10rem] md:max-h-[10rem] ${showContainerBorder ? 'md:border md:border-blue550 border border-blue550' : ''}  rounded-md `}>
            <div className={` md:min-w-fit  min-w-fit w-[${maxWidth}] md:w-[${maxWidth}]  h-full bg-grey105 px-4 py-4 grid gap-2 content-between`}>
                <p className={`md:text-[16px] text-[14px] ${inter.className} text-black300`}>{title}</p>
                <div className={` grid gap-2 md:flex justify-between w-full  `}>
                    {isValueInPercentage ?
                        <p className={` ${cabinetGroteskBold.className} md:text-[36px] text-[24px] text-meedlBlue `}>{value}%</p>
                        :
                        <NumericFormat
                            id={'loanTuitionAmount'}
                            name={'loanTuitionAmount'}
                            type="text"
                            disabled={true}
                            thousandSeparator=","
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={'₦'}
                            className={`${cabinetGroteskBold.className} bg-grey105 md:text-[36px] text-[24px] text-meedlBlue  `}
                            value={value}
                        />
                    }
                    { showPerformancePercentage && <div
                        className={` flex rounded-full w-fit py-0.5 gap-1 px-1 h-fit mt-auto mb-auto  ${didValueIncrease ? 'text-[#971B17] md:bg-error150 md:text-[#971B17] bg-error150 ' : `text-[#085322] bg-[#E7F5EC] `}   `}>
                        {didValueIncrease ?
                            <MdOutlineArrowDownward className={` mt-auto mb-auto  `}/>
                            :
                            <MdArrowUpward className={` mt-auto mb-auto  `}/>}
                        <p className={` ${inter.className} text-[13px]  `}>{percentage}%</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;