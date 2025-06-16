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
                    onClick={handleDropdownOpen}
                    className={` w-fit px-2 h-fit flex gap-3  py-3 border-1 bg-[#F6F6F6] border-[#D0D5DD] `}>
                    File


                    {dropdownOpen ? (
                        <ChevronUpIcon onClick={handleDropdownOpen} data-testid="ChevronUpIcon" id="chevronUp" className="h-4 font-semibold" />
                    ) : (
                        <ChevronDownIcon onClick={handleDropdownOpen} data-testid="ChevronDownIcon" id="chevronDown" className="h-4 font-semibold" />
                    )}

                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
      </div>
    );
};

export default DropdownFilter;