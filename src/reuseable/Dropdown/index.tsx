'use client'
import React, { useState } from 'react';
import {inter} from "@/app/fonts";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Button} from "@/components/ui/button";
import {Select, SelectTrigger, SelectContent,SelectItem,SelectGroup} from "@/components/ui/select";

interface IProps {
    id: string;
    trigger: string,
    isDisabled: boolean;
    dropDownItems: {id:string, name:string}[];
    setSelectItem: (item: string, id?:string ) => void;
    buttonText: string;
    handleButtonClick: () => void | Promise<void>;
    selectedItem: string;


}

const DropDownWithActionButton = ({id,isDisabled,trigger,setSelectItem,selectedItem,dropDownItems, buttonText, handleButtonClick}:IProps) => {
    const [isIconUp, setIsIconUp] = useState(false)

const disableButton = selectedItem?.length === 0 || trigger === selectedItem;

    return (
        <div
            id={id}
            data-testid={id}
            className={``}
        >
            <Select
                onOpenChange={()=> {setIsIconUp(!isIconUp)}}
                // className={'w-fit mt-auto mb-auto h-fit'}
            >
                {/*<MenubarMenu >*/}
                    <SelectTrigger
                        id={'trigger'} data-testid={'trigger'} disabled={isDisabled} className={` hover:bg-[#F9F9F9] hover:rounded-md flex gap-2 border-none shadow-none   w-fit h-fit py-1.5  px-1.5 lg:py-2 lg:px-2 mt-auto mb-auto    `} >
                        {trigger}
                        {isIconUp ?
                            <MdKeyboardArrowUp/>
                            :
                            <MdKeyboardArrowDown/>
                        }
                    </SelectTrigger>
                    <SelectContent  className={``}>
                        {dropDownItems?.map((item, i) => (
                            <button
                                id={item.id}
                                data-testid={item.id}
                                key={item.id+ i}
                                onClick={() => {setSelectItem(item.name)}}
                                className={`${inter.className} flex justify-start  text-[14px] text-[#212221]  w-full h-fit py-2 ${trigger === item.name && selectedItem === '' || selectedItem  === item.name  ? ` text-[#142854] bg-[#E1EEFF] ` : ``}  hover:text-[#142854] hover:bg-[#E1EEFF] `}
                            >

                                {item?.name}
                            </button>
                        ))}
                       <div className={` w-full max-h-fit py-2  focus:bg-white hover:bg-white flex  justify-end border-t border-t-[#D7D7D7]  `}>
                           <SelectItem
                               onClick={handleButtonClick}
                               disabled={disableButton }
                           >
                           <Button
                               disabled={disableButton }
                               onClick={handleButtonClick}
                               className={`w-fit h-fit py-2 flex  ${disableButton  ? `bg-[#D7D7D7] hover:bg-[#D7D7D7] ` : ` bg-meedlBlue hover:bg-meedlBlue `}   `}
                           >

                               {buttonText}
                           </Button>
                           </SelectItem>
                       </div>
                    </SelectContent>
            </Select>

        </div>
    );
};

export default DropDownWithActionButton;