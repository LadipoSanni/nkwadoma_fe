import React from 'react';
import {inter, inter600} from "@/app/fonts";

interface ISettingTabs {
    id: string;
    tabElement: {name: string, id: string}[];
    tabCurrentTabIndex: number;
    width?:string;
    setTabCurrentTabIndex: (index: number) => void;

}
const SettingTabs = ({id,tabElement,tabCurrentTabIndex,setTabCurrentTabIndex,width}: ISettingTabs) => {

    return (
        <div
            id={id}
            data-testid={id}
            className={` ${width ? width : `md:w-fit lg:w-fit `}  w-full grid gap-2 px-4 py-4 h-fit  border border-[#D7D7D7] rounded-md `}
        >
            {tabElement?.map((item, i) => (
                <div
                    id={'tabItem' + item.id}
                    data-testid={'tabItem' + item.id}
                    className={` rounded-md ${width ? `w-full ` : `md:w-[10vw] `}  w-full px-2 py-2 px  ${tabCurrentTabIndex === i ? ` text-black ${inter600.className} bg-[#F6F6F6]  ` : `   ${inter.className} text-[#6A6B6A] text-[14px] `} `}
                    key={'tabItem' + i}
                    onClick={() => {setTabCurrentTabIndex(i)}}
                >
                    {item.name }
                </div>
            ))}
        </div>
    );
};

export default SettingTabs;