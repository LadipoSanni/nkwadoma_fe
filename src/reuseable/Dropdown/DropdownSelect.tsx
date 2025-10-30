'use client';

import * as React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import {inter} from "@/app/fonts";
interface StringDropdownProps {
    label?: string;
    items: string[];
    onSelect?: (value: string) => void;
    height?: string;
}

const StringDropdown: React.FC<StringDropdownProps> = ({ label = "Select Item", items, onSelect , height}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <div  className={`flex justify-between  min-h-[3.1rem] max-h-fit    w-[13em] border break-normal px-2  ${inter.className} rounded-md  text-[#6A6B6A] border-[#D7D7D7]    gap-1`}>
                    <p className={`mt-auto mb-auto `}>{label}</p>
                    {items?.length > 0 &&
                        <MdKeyboardArrowDown
                          className={`w-4 h-4 mt-auto mb-auto transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                        />
                    }
                </div>
            </DropdownMenuTrigger>
            {items?.length > 0 &&
                <DropdownMenuContent className={` max-h-[30vh] overflow-y-auto `}>
                    {items.map((item, idx) => (
                        <DropdownMenuItem
                            key={idx}
                            className={` hover:bg-[#D7D7D7]  `}
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
