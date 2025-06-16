import React, {useState} from 'react';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {inter600,inter700} from '@/app/fonts'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";

const DropdownFilter = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
      <div id={'dropdownFilter'} data-testid="dropdownFilter">
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger
                    id={'dropdownTrigger'}
                    data-testid="dropdownTrigger"
                    onChange={handleDropdownOpen}
                    className={` w-fit px-2 h-fit flex gap-3  py-3 border-1 bg-[#F6F6F6] border-[#D0D5DD] `}>
                    File


                    {dropdownOpen ? (
                        <ChevronUpIcon onClick={handleDropdownOpen} data-testid="ChevronUpIcon" id="chevronUp" className="h-4 font-semibold" />
                    ) : (
                        <ChevronDownIcon onClick={handleDropdownOpen} data-testid="ChevronDownIcon" id="chevronDown" className="h-4 font-semibold" />
                    )}

                </MenubarTrigger>
                <MenubarContent className={` w-[360px] px-4 py-4 `}>
                    <p className={`${inter600.className} text-[14px] mb-4 `}>Title</p>
                    <div className={` max-h-[250px] h-fit  w-full mb-10`}>
                        {/*<span className={`w-fit h-fit rounded-lg py-1 px-2 bg-[#F6F6F6] text-[#6A6B6A] hover:bg-[#E6F1FF] hover:text-[#142854] `}>May</span>*/}

                        {months.map((month) => {

                        } )}
                    </div>
                    <div className={` h-fit w-full flex justify-between `}>
                        <button className={`${inter700.className} rounded-md w-fit h-fit px-4 py-2 border border-[#ECECEC]  text-[14px] text-[#A8A8A8] `} >Clear filter</button>
                        <button className={`${inter700.className} rounded-md w-fit h-fit px-4 py-2  text-[14px] bg-[#D7D7D7]  text-white  `}  >Apply</button>
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
      </div>
    );
};

export default DropdownFilter;