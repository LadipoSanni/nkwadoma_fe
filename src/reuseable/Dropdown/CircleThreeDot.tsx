import React from 'react';
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {MdMoreHoriz, MdMoreVert} from "react-icons/md";
import {inter} from "@/app/fonts";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";

interface IProps {
    id: string;
    dotDisplay: "horizontal" | "vertical";
    isDisabled: boolean;
    dropDownItems: ThreeDotTriggerDropDownItemsProps[];


}

const CircleThreeDot = ({id, dotDisplay,isDisabled,dropDownItems}:IProps) => {
    return (
        <div
            id={id}
            data-testid={id}
            className={``}
        >
            <Menubar  className={'w-fit mt-auto mb-auto h-fit'}>
                <MenubarMenu >
                    <MenubarTrigger id={'trigger'} data-testid={'trigger'} disabled={isDisabled} className={` bg-[#F9F9F9] w-fit h-fit py-1.5 aspect-square px-1.5 md:py-2 md:px-2 lg:py-2 lg:px-2 mt-auto mb-auto   rounded-full `} >
                        {dotDisplay === 'horizontal' ?
                            <MdMoreHoriz
                                id={'horizontalTrigger'}
                                data-testid={'horizontalTrigger'}
                                // color={'#6A6B6A'}
                                color={'#939CB0'}
                                className={`  h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 `} />
                            :
                            <MdMoreVert
                                id={'verticalTrigger'}
                                data-testid={'verticalTrigger'}
                                // color={'#6A6B6A'}
                                color={'#939CB0'}
                                className={` ${isDisabled ? ' cursor-not-allowed' : 'cursor-pointer'} h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 `} />
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

export default CircleThreeDot;