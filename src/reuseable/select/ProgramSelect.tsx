import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

interface viewAllProgramProps {
    id?: string;
    name: string;

}

interface ProgramSelectProps {
    selectedProgram: string | null;
    setSelectedProgram: (program: string) => void;
    isSelectOpen: boolean;
    setIsSelectOpen: (open: boolean) => void;
    selectOptions: viewAllProgramProps[];
    setId: (id: string) => void;
    label: string;
    placeholder: string;

}

const ProgramSelect: React.FC<ProgramSelectProps> = ({
                                                         selectedProgram,
                                                         setSelectedProgram,
                                                         isSelectOpen,
                                                         setIsSelectOpen,
                                                         selectOptions,
                                                         setId,
                                                         placeholder,
                                                         label
                                                     }) => {
    const uniqueId = `select${Math.random().toString(36).substring(2, 9)}`;


    return (
        <div id="programContainer" className={'grid gap-2 w-full'}>
            <Label htmlFor={uniqueId}
                   className="block text-[14px] font-medium leading-[22px] text-labelBlue">{label}</Label>
            <Select
                onValueChange={(value) => {
                    const selectedProgram = selectOptions.find((program) => program.name === value);
                    if (selectedProgram) {
                        setId(selectedProgram.id ?? "");
                    }
                    setSelectedProgram(value)
                }}
                onOpenChange={(open) => setIsSelectOpen(open)}>
                <SelectTrigger id="programSelectTrigger"
                               className={`${selectedProgram ? 'text-black500' : 'text-black300'} shadow-none mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650 `}>
                    <SelectValue placeholder={placeholder}>{selectedProgram }</SelectValue>
                    {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
                        <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
                </SelectTrigger>
                <SelectContent id="programSelectContent">
                    {selectOptions.map((program) => (
                        <SelectItem id={`program${program.name.replace(/\s+/g, '')}`}
                                    className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950"
                                    key={program.id} value={program.name}>
                            {program?.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default ProgramSelect;