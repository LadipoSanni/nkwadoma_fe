import React from 'react';
import { Menubar, MenubarTrigger, MenubarContent, MenubarMenu, MenubarItem } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { FiMoreVertical } from "react-icons/fi";
import { inter } from "@/app/fonts";

interface Props {
    handleDropDownClick?: (id: string) => void;
    kebabOptions?: { id: string, name: string }[];
    className?: string;
}

const Kebab = ({ handleDropDownClick, kebabOptions, className }: Props) => {
    return (
        <div id="kebabWrapper" data-testid="kebab-wrapper" className="relative">
            <Menubar id="menubar" data-testid="menubar">
                <MenubarMenu data-testid="menubar-menu">
                    <MenubarTrigger
                        asChild
                        className="border-none shadow-none cursor-pointer focus:ring-0 focus-visible:ring-0"
                        id="menubarTfrigger"
                        data-testid="menubar-trigger"
                    >
                        <Button
                            id="kebabButton"
                            data-testid="kebab-button"
                            className="border-none shadow-none"
                        >
                            <FiMoreVertical
                                id="kebabIcon"
                                data-testid="kebab-icon"
                                className="w-5 h-6 text-grey500 font-extrabold"
                            />
                        </Button>
                    </MenubarTrigger>
                    <MenubarContent
                        id="menubarContent"
                        data-testid="menubar-content"
                        className={`${inter.className} bg-white gap-3 shadow-grey100 z-0 rounded-md min-w-[10rem] right-[-30px] absolute w-full md:min-w-[12rem]`}
                    >
                        {
                            kebabOptions?.map((option, index) => (
                                <MenubarItem
                                    key={index}
                                    id={`menubarItem-${index}`}
                                    data-testid={`menubar-item-${index}`}
                                    className={`cursor-pointer pr-8 mt-2 ${className} ${option.id === '3' && 'text-error500 focus:text-error500'} `}
                                    onClick={() => handleDropDownClick && handleDropDownClick(option.id)}
                                >
                                    {option.name}
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

export default Kebab;
