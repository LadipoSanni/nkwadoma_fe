import React from 'react';
import {cabinetGroteskBold, inter} from "@/app/fonts";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

interface PerformanceCardProps {
    showMonthPick?:boolean;
    maxWidth: string;

}

const PerformanceCard = ({maxWidth}: PerformanceCardProps) => {
    return (
        <div className={` min-w-[20rem] max-w-[${maxWidth}] py-3 px-3 h-[10rem] border border-blue550 rounded-md `}>
            <div className={` w-full   h-full bg-grey105 px-4 py-4 grid content-between`}>

                <p className={`text-[16px] ${inter.className} text-black300`}>Portfolio percentage</p>
                <div className={`flex justify-between w-full  `}>
                    <p className={` ${cabinetGroteskBold.className} text-[36px] text-meedlBlue `}>300000000%</p>
                    <div className={` flex rounded-full w-fit py-0.5 gap-1 px-1 h-fit mt-auto mb-auto bg-[#E7F5EC] text-[#085322]  `}>
                        <MdArrowUpward className={` mt-auto mb-auto  `} />
                        <p className={` ${inter.className} text-[13px]  `}>12.6%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;