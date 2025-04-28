'use client'
import React from 'react';
import {cabinetGroteskBold, inter} from "@/app/fonts";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import {formatAmount, formateDigits} from "@/utils/Format";
import CustomSelect from "@/reuseable/Input/Custom-select";


interface PerformanceCardProps {
    showMonthPick?:boolean;
    id: string;
    maxWidth: string;
    title: string;
    value?: string | number; // performance amount
    isValueInPercentage?: boolean; // value can eight be in percentage  or amount
    showPerformancePercentage?: boolean;
    didValueIncrease: boolean; // did performance amount increase or decrease
    percentage: string | number;
    showContainerBorder: boolean;
    isSmall?: boolean;
    isFigure?: boolean;
    currentDate?: string;
    onChangeDate?: (value: string) => void;
    currentYear?:   string;
    years?: string[];

}



const PerformanceCard = ({id,currentYear,years,isFigure,onChangeDate,currentDate, showMonthPick,maxWidth, isSmall,title, value, isValueInPercentage, showContainerBorder, showPerformancePercentage,percentage, didValueIncrease}: PerformanceCardProps) => {
    return (
        <div
            id={id} data-testid={id}
            className={` ${isSmall ? ` md:w-[${maxWidth}] w-full ` : `md:min-w-fit min-w-fit max-w[${maxWidth}] md:max-w-[${maxWidth}]`} md:min-w-fit min-w-fit max-w[${maxWidth}] md:max-w-[${maxWidth}]    ${showContainerBorder ? 'md:border md:border-blue550 border border-blue550 py-3 px-3 md:h-[9.5rem] h-fit max-h-[10rem] md:max-h-[10rem] ' : ' md:max-h-[7rem] max-h-fit '}  rounded-md `}>
            <div className={` ${isSmall? `md:w-full w-full  ` : `md:min-w-fit  min-w-fit w-[${maxWidth}] md:w-[${maxWidth}] `} h-full bg-grey105 md:bg-grey105 px-4 py-4 grid gap-2 content-between`}>
                <div className={` md:flex md:justify-between md:full flex justify-between `}>
                    <p id={'performanceTitleId'+title} data-testid={title} aria-labelledby={title} className={`md:text-[16px] text-[14px] ${inter.className} text-black300`}>{title}</p>
                    {showMonthPick  && onChangeDate &&
                        <CustomSelect
                            id={"performanceDate:"+id}
                            value={currentDate}
                            onChange={(value) => onChangeDate(value)}
                            selectContent={years}
                            placeHolder={currentYear}
                            triggerId="performanceDate"
                            className="h-fit md:w-fit w-fit mt-0 bg-white border border-[#D0D5DD]"
                        />
                    }
                </div>
                <div className={` grid gap-2 md:flex justify-between min-w-fit md:min-w-fit w-full md:w-full  `}>
                   <div>
                       {isFigure ?
                           <p id={'performancePercentageAmount'} data-testid={'performancePercentageAmount'} className={` ${cabinetGroteskBold.className} md:min-w-fit md:bg-grey105 bg-grey105 max-w-fit md:max-w-fit  md:text-[36px] text-[24px] text-meedlBlue `}>{formateDigits(Number(value))}</p>
                           :
                           <div>
                               {isValueInPercentage ?
                                   <p id={'amountPercentage'} className={` ${cabinetGroteskBold.className} md:text-[36px] text-[24px] x text-meedlBlue `}>{value}%</p>
                                   :

                                   <p id={'performancePercentageAmount'} data-testid={'performancePercentageAmount'} className={` ${cabinetGroteskBold.className} md:min-w-fit md:bg-grey105 bg-grey105 max-w-fit md:max-w-fit  md:text-[36px] text-[24px] text-meedlBlue `}>{formatAmount(value,true)}</p>
                               }
                           </div>
                       }
                   </div>
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