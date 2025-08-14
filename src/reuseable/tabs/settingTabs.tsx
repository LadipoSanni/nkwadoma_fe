import React from 'react';
import {inter, inter600} from "@/app/fonts";

interface ISettingTabs {
    id: string;
    tabElement: {name: string, id: string}[];
    tabCurrentTabIndex: number;
    width?:string;
    setTabCurrentTabIndex: (index: number) => void;

}
const SettingTabs = ({id,tabElement,tabCurrentTabIndex,setTabCurrentTabIndex}: ISettingTabs) => {

    return (
        <div
            id={id}
            data-testid={id}
            className={` w-full md:min-w-fit  md:w-[20%]   grid gap-2 px-4 py-4 h-fit  border border-[#D7D7D7] rounded-md `}
        >
            {tabElement?.map((item, i) => (
                <div
                    id={'tabItem' + item.id}
                    data-testid={'tabItem' + item.id}
                    className={` cursor-pointer hover:text-black  hover:bg-[#F6F6F6] rounded-md   w-full px-2 py-2 px  ${tabCurrentTabIndex === i ? ` text-black ${inter600.className} bg-[#F6F6F6]  ` : `   ${inter.className} text-[#6A6B6A] text-[14px] `} `}
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