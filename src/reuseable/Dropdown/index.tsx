import React, { useState } from 'react';
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {inter} from "@/app/fonts";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Button} from "@/components/ui/button";

interface IProps {
    id: string;
    trigger: string,
    isDisabled: boolean;
    dropDownItems: ThreeDotTriggerDropDownItemsProps[];



}

const DropDownWithActionButton = ({id,isDisabled,trigger,dropDownItems}:IProps) => {
    const [isIconUp, setIsIconUp] = useState(false)
    return (
        <div
            id={id}
            data-testid={id}
            className={``}
        >
            <Menubar  className={'w-fit mt-auto mb-auto h-fit'}>
                <MenubarMenu >
                    <MenubarTrigger onClick={() => {setIsIconUp(!isIconUp)}} id={'trigger'} data-testid={'trigger'} disabled={isDisabled} className={` hover:bg-[#F9F9F9] hover:rounded-md flex gap-2  w-fit h-fit py-1.5  px-1.5 lg:py-2 lg:px-2 mt-auto mb-auto    `} >
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
                                className={`${inter.className} ${item.sx} text-[14px] text-[#212221] w-full hover:text-[#142854] hover:bg-[#E1EEFF] `}
                            >

                                {item?.name}
                            </MenubarItem>
                        ))}
                        <div
                            className={`w-full max-h-fit py-2 flex justify-end border-t border-t-[#D7D7D7]  `}
                        >
                            <Button
                                className={` text-white bg-[#D7D7D7]  `}
                            >Save</Button>
                        </div>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default DropDownWithActionButton;