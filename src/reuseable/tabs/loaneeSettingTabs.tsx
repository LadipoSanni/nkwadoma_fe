import React from 'react';
import {inter, inter600} from "@/app/fonts";
import { ChevronRight } from 'lucide-react';

interface ISettingTabs {
    id: string;
    tabElement: {name: string, id: string}[];
    tabCurrentTabIndex: number;
    width?:string;
    setTabCurrentTabIndex: (index: number) => void;

}
const LoaneeSettingTabs = ({id,tabElement,tabCurrentTabIndex,setTabCurrentTabIndex}: ISettingTabs) => {

    return (
        <div
            id={id}
            data-testid={id}
            className={` w-full md:min-w-fit  md:w-[25%]   grid gap-2 py-4 h-fit  border-b-2 border-[#D7D7D7] rounded-lg `}
        >
            {tabElement?.map((item, i) => (
                <div
                    id={'tabItem' + item.id}
                    data-testid={'tabItem' + item.id}
                    className={`justify-between flex cursor-pointer hover:text-black  hover:bg-[#F6F6F6] rounded-md   w-full px-2 py-5  ${tabCurrentTabIndex === i ? ` text-black border-l-4 border-[#142854] rounded-l-lg ${inter600.className} bg-[#E8EAEE]  ` : `   ${inter.className} text-[#6A6B6A] text-[14px] `} `}
                    key={'tabItem' + i}
                    onClick={() => {setTabCurrentTabIndex(i)}}
                >
                    {item.name } <ChevronRight/>
                </div>
            ))}
        </div>
    );
};

export default LoaneeSettingTabs;