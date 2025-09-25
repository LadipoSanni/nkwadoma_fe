'use client'
import React, { useState } from 'react';
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {inter} from "@/app/fonts";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Button} from "@/components/ui/button";

interface IProps {
    id: string;
    trigger: string,
    isDisabled: boolean;
    dropDownItems: {id:string, name:string}[];
    setSelectItem: (item: string ) => void;
    buttonText: string;
    handleButtonClick: () => void | Promise<void>;
    selectedItem: string;


}

const DropDownWithActionButton = ({id,isDisabled,trigger,setSelectItem,selectedItem,dropDownItems, buttonText, handleButtonClick}:IProps) => {
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
                            <button
                                id={item.id}
                                data-testid={item.id}
                                key={item.id+ i}
                                onClick={() => {setSelectItem(item.name)}}
                                className={`${inter.className}  text-[14px] text-[#212221] ${selectedItem  === item.name ? 'text-[#142854] bg-[#E1EEFF] ' : ''} w-full h-fit py-2 hover:text-[#142854] hover:bg-[#E1EEFF] `}
                            >

                                {item?.name}
                            </button>
                        ))}
                        <MenubarItem
                            className={`w-full max-h-fit py-2 flex focus:bg-white hover:bg-white justify-end border-t border-t-[#D7D7D7]  `}
                        >
                            <Button
                                disabled={!selectedItem || selectedItem === trigger}
                                onClick={handleButtonClick}
                                className={` text-white ${!selectedItem || selectedItem === trigger ? `bg-[#D7D7D7] ` : ` bg-meedlBlue `}   `}
                            >
                                {buttonText}
                            </Button>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default DropDownWithActionButton;