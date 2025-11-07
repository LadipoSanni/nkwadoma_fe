import React from 'react';
import { inter } from "@/app/fonts";

interface Props {
    id: string;
    tabElement: { name: string, id: string }[];
    tabCurrentTabIndex: number;
    width?: string;
    setTabCurrentTabIndex: (index: number) => void;
    header?: string
}

function PaymentTabs({ id, tabElement, tabCurrentTabIndex, setTabCurrentTabIndex,header}: Props) {
    return (
        <div
            id={id}
            data-testid={id}
            className={`${inter.className} hidden md:block min-w-fit md:w-[25%] gap-2 px-4 py-4 h-fit bg-white rounded-lg `}
        >
            <p className='text-[#4D4E4D] text-[14px] '>{header}</p>
            {tabElement?.map((item, i) => (
                <div
                    id={'tabItem' + item.id}
                    data-testid={'tabItem' + item.id}
                    className={`cursor-pointer text-[#4D4E4D] text-[14px]  rounded-md w-full px-3 py-2 transition-colors duration-200 ${
                        tabCurrentTabIndex === i ? '' : ''
                    }`}
                    key={'tabItem' + i}
                    onClick={() => { setTabCurrentTabIndex(i) }}
                >
                    <label className="flex items-center space-x-4 cursor-pointer">
                       
                        <div className={`relative rounded-full w-[33px] h-[33px] flex items-center justify-center  ${tabCurrentTabIndex === i 
                                    ? "bg-[#E6EFFB]" : ""}`}>
                            <div className={`w-[24px] h-[24px] rounded-full border-[1.5px] ${
                                tabCurrentTabIndex === i 
                                    ? 'border-[#142854] bg-[#E8EAEE]' 
                                    : 'border-[#A8A8A8] bg-white'
                            } transition-all duration-200 flex items-center justify-center`}>
                                
                                {tabCurrentTabIndex === i && (
                                    <div className="w-[8px] h-[8px] bg-[#142854] rounded-full"></div>
                                )}
                            </div>
                        </div>
                        <span className={`font-medium ${
                            tabCurrentTabIndex === i ? 'text-[#212221]' : 'text-[#4D4E4D]'
                        }`}>
                            {item.name}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default PaymentTabs;
