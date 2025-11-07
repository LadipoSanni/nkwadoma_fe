import React, { useState } from 'react';
import { inter,hankenGrotesk  } from "@/app/fonts";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface Props {
    id: string;
    tabElement: { name: string, id: string }[];
    tabCurrentTabIndex: number;
    width?: string;
    setTabCurrentTabIndex: (index: number) => void;
    header?: string
    placeholder?: string
}

function PaymentTabs({ id, tabElement, tabCurrentTabIndex, setTabCurrentTabIndex, header, placeholder }: Props) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = (open: boolean) => {
        setDropdownOpen(open);
    };

    const handleSelectChange = (value: string) => {
        const index = tabElement.findIndex(item => item.id === value);
        if (index !== -1) {
            setTabCurrentTabIndex(index);
        }
    };

    const getSelectedValue = () => {
        if (tabCurrentTabIndex >= 0 && tabElement[tabCurrentTabIndex]) {
            return tabElement[tabCurrentTabIndex].id;
        }
        return "";
    };

    const getDisplayValue = () => {
        if (tabCurrentTabIndex >= 0 && tabElement[tabCurrentTabIndex]) {
            return tabElement[tabCurrentTabIndex].name;
        }
        return placeholder || "Select an option";
    };

    return (

        <div
            id={id}
            data-testid={id}
            className={`${inter.className} min-w-fit w-full md:w-[25%] gap-2 md:px-4 md:py-4 h-fit bg-white rounded-lg `}
        >
            <p className='text-[#4D4E4D] text-[14px] '>{header}</p>
            <div className='hidden md:block '>
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

            <div className={`block md:hidden ${hankenGrotesk.className}`} data-testid="dropdownId">
                <Select
                    value={getSelectedValue()}
                    onValueChange={handleSelectChange}
                    onOpenChange={handleDropdownOpen}
                    open={dropdownOpen}
                >
                    <SelectTrigger
                        id={'dropdownTrigger'}
                        data-testid="dropdownTrigger"
                        className={`px-4 h-12 flex justify-between items-center mt-2 w-full rounded-md py-2  bg-[#F3F8FF] border-none font-bold text-[16px] text-[#142854]`}
                    >
                        <SelectValue>
                            <div className="flex items-center space-x-3">
                                <span className={` ${
                                    tabCurrentTabIndex !== -1 ? 'text-[#142854]' : 'text-[#4D4E4D]'
                                }`}>
                                    {getDisplayValue()}
                                </span>
                            </div>
                        </SelectValue>
                        {dropdownOpen ? (
                            <ChevronUpIcon data-testid="ChevronUpIcon" id="chevronUp" className="h-4 w-4 font-semibold" />
                        ) : (
                            <ChevronDownIcon data-testid="ChevronDownIcon" id="chevronDown" className="h-4 w-4 font-semibold" />
                        )}
                    </SelectTrigger>
                    <SelectContent
                        className="border-none bg-white text-[#404653] text-sm max-h-80"
                        style={{ zIndex: 1000 }}
                    >
                        <SelectGroup className="max-h-60 overflow-y-auto">
                            {tabElement?.map((item, i) => (
                                <SelectItem
                                    key={item.id}
                                    value={item.id}
                                    className={`hover:bg-[#EEF5FF] py-3 px-4 ${
                                        tabCurrentTabIndex === i ? '' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`relative rounded-full w-[28px] h-[28px] flex items-center justify-center ${
                                            tabCurrentTabIndex === i ? "bg-[#E6EFFB]" : ""
                                        }`}>
                                            <div className={`w-[20px] h-[20px] rounded-full border-[1.5px] ${
                                                tabCurrentTabIndex === i 
                                                    ? 'border-[#142854] bg-[#E8EAEE]' 
                                                    : 'border-[#A8A8A8] bg-white'
                                            } transition-all duration-200 flex items-center justify-center`}>
                                                {tabCurrentTabIndex === i && (
                                                    <div className="w-[6px] h-[6px] bg-[#142854] rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`font-medium ${
                                            tabCurrentTabIndex === i ? 'text-[#212221]' : 'text-[#4D4E4D]'
                                        }`}>
                                            {item.name}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default PaymentTabs;
