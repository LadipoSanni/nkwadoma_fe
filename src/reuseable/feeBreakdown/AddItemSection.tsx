import React from 'react';
import { MdAdd } from "react-icons/md";

interface AddItemSectionProps {
    handleSelectClick: () => void;
}

const AddItemSection: React.FC<AddItemSectionProps> = ({ handleSelectClick }) => (
    <section id="Step2addItemSection" onClick={handleSelectClick} className={'cursor-pointer flex gap-1 bg-white'}>
        <MdAdd className={'text-meedlBlue h-5 w-5'}/>
        <span>
      <h1 className={'text-meedlBlue font-normal text-[14px]'}>Add item</h1>
    </span>
    </section>
);

export default AddItemSection;