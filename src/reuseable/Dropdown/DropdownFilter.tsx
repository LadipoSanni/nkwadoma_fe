import React, {useState} from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {inter600,inter700, inter500} from '@/app/fonts'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import styles from './index.module.css'


interface Props {
    title: string;
    selectedItem: string | number;
    items: string[] | number[];
    handleFilter: (item: string | number) => void;
    setSelectItem: (item: string | number) => void;
    placeholder: string;
    clearFilter: () => void;
    sx?: string;

}

const DropdownFilter = ({title,sx, handleFilter,clearFilter,setSelectItem,items,selectedItem, placeholder}: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen);
    };




    return (
      <div id={'dropdownFilter'} data-testid="dropdownFilter">
        <Menubar >
            <MenubarMenu >
                <MenubarTrigger
                    id={'dropdownTrigger'}
                    data-testid="dropdownTrigger"
                    onChange={handleDropdownOpen}
                    className={` w-fit  `}>
                   <div className={` px-2 h-fit flex gap-4 mt-2  rounded-md py-2 ring-1 ring-[#D0D5DD] bg-[#F6F6F6] border-[#D0D5DD] `}>
                       {placeholder}


                       {dropdownOpen ? (
                           <ChevronUpIcon onClick={handleDropdownOpen} data-testid="ChevronUpIcon" id="chevronUp" className="h-4 font-semibold" />
                       ) : (
                           <ChevronDownIcon onClick={handleDropdownOpen} data-testid="ChevronDownIcon" id="chevronDown" className="h-4 font-semibold" />
                       )}
                   </div>

                </MenubarTrigger>
                <MenubarContent className={` w-[23em] sm:w-[23em] md:w-[25em]  px-6 py-4 `}>
                    <p className={`${inter600.className} text-[14px] mb-4 `}>{title}</p>
                    <div className={` max-h-[250px] ${styles.container}  h-fit ${sx ? `${sx}` : ` grid grid-cols-5 `} gap-3   w-full mb-10`}>
                        {items?.map((month, index) => (
                            <button id={'item:'+ index} key={'key: '+ month} onClick={() => {setSelectItem(month)}} className={` ${inter500.className} ${selectedItem === month ? 'bg-[#E6F1FF] text-[#142854] md:bg-[#E6F1FF] md:text-[#142854] '  : ''} w-fit h-fit rounded-full text-[13px]  py-1 px-2 bg-[#F6F6F6] text-[#6A6B6A] hover:bg-[#E6F1FF] hover:text-[#142854] `}>{month}</button>
                         ))}
                    </div>
                    <div className={` h-fit w-full flex justify-between `}>
                        <MenubarItem disabled={!selectedItem} id={`clear${title}FilterButton`} onClick={clearFilter} className={`${inter700.className}   rounded-md w-fit h-fit px-4 py-2 border ${selectedItem ? 'border-meedlBlue text-meedlBlue hover:!bg-[#E8EAEE] hover:!text-meedlBlue ' : 'border-[#ECECEC] text-[#A8A8A8] hover:!border-[#ECECEC] hover:!text-[#A8A8A8] '}   text-[14px]  `} >Clear filter</MenubarItem>
                        <MenubarItem disabled={!selectedItem} onClick={() => {handleFilter(selectedItem)}} id={`${title}FilterButton`} className={`${inter700.className}   rounded-md w-fit h-fit px-4 py-2  text-[14px] ${selectedItem  ? 'bg-meedlBlue hover:!text-white hover:!bg-[#435376] ' : 'bg-[#D7D7D7] hover:!text-white hover:!bg-[#D7D7D7]'}   text-white  `}  >Apply</MenubarItem>
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
      </div>
    );
};

export default DropdownFilter;