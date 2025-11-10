'use client';

import * as React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import {inter} from "@/app/fonts";
import {clsx} from "clsx";
interface StringDropdownProps {
    label?: string;
    items: string[];
    onSelect?: (value: string) => void;
    dropDownStyles?: string;
    dropdownMenuContentStyles?:string;
    dropDownItemsStyles?:string;

}

const StringDropdown: React.FC<StringDropdownProps> = ({ label = "Select Item", items,dropDownStyles,dropDownItemsStyles,dropdownMenuContentStyles, onSelect }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <div  className={clsx(`flex justify-between border break-normal px-2  ${inter.className} rounded-md  text-[#6A6B6A] border-[#D7D7D7]    gap-1`, dropDownStyles ? ` ${dropDownStyles} ` : `w-full  md:w-[13em] min-h-[3.1rem] max-h-fit ` )}>
                    <p className={`mt-auto mb-auto `}>{label}</p>
                    {items?.length > 0 &&
                        <MdKeyboardArrowDown
                          className={`w-4 h-4 mt-auto mb-auto transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                        />
                    }
                </div>
            </DropdownMenuTrigger>
            {items?.length > 0 &&
                <DropdownMenuContent className={clsx(` max-h-[30vh] overflow-y-scroll  `, dropdownMenuContentStyles ? `${dropdownMenuContentStyles}` :  ``)}>
                    {items.map((item, idx) => (
                        <DropdownMenuItem
                            key={idx}
                            className={clsx(` hover:bg-[#D7D7D7] `, dropDownItemsStyles ? `${dropDownItemsStyles}` : ``)}
                            onClick={() => onSelect?.(item)}
                        >
                            {item}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            }
        </DropdownMenu>
    );
};

export default StringDropdown;
