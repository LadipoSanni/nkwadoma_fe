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
                <Button variant="outline" className={`flex border ${inter.className} text-[#6A6B6A] border-[#D7D7D7]  ${height ? height : 'h-[3rem] '}  items-center gap-1`}>
                    <p className={ clsx{``, '':label?.le}}>{label}</p>
                    <MdKeyboardArrowDown
                        className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                </Button>
            </DropdownMenuTrigger>
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
        </DropdownMenu>
    );
};

export default StringDropdown;
