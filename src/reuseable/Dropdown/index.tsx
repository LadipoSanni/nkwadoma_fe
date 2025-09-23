import React, { useState } from 'react';
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {inter} from "@/app/fonts";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

interface IProps {
    id: string;
    trigger: string,
    isDisabled: boolean;
    dropDownItems: ThreeDotTriggerDropDownItemsProps[];



}

const DropDownWithActionButton = ({id,isDisabled,trigger,dropDownItems}:IProps) => {
    const [isIconUp, setIsIconUp] = useState(true)
    return (
        <div
            id={id}
            data-testid={id}
            className={``}
        >
            <Menubar  className={'w-fit mt-auto mb-auto h-fit'}>
                <MenubarMenu >
                    <MenubarTrigger onClick={() => {setIsIconUp(!isIconUp)}} id={'trigger'} data-testid={'trigger'} disabled={isDisabled} className={` bg-[#F9F9F9] w-fit h-fit py-1.5 aspect-square px-1.5 md:py-2 md:px-2 lg:py-2 lg:px-2 mt-auto mb-auto   rounded-full `} >
                        {trigger}
                        {isIconUp ?
                            <MdKeyboardArrowUp/>
                            :
                            <MdKeyboardArrowDown/>
                        }
                    </MenubarTrigger>
                    <MenubarContent  className={``}>
                        {dropDownItems?.map((item, i) => (
                            <MenubarItem
                                id={item.id}
                                data-testid={item.id}
                                key={item.id+ i}
                                onClick={() => item?.handleClick}
                                className={`${inter.className} ${item.sx} text-[14px] text-[#212221] w-full hover:text-[#142854] hover:bg-[#D9EAFF] `}
                            >

                                {item?.name}
                            </MenubarItem>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default DropDownWithActionButton;