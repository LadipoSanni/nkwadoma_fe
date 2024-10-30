import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface ProgramSelectProps {
    selectedProgram: string | null;
    setSelectedProgram: (program: string) => void;
    isSelectOpen: boolean;
    setIsSelectOpen: (open: boolean) => void;
}

const ProgramSelect: React.FC<ProgramSelectProps> = ({ selectedProgram, setSelectedProgram, isSelectOpen, setIsSelectOpen }) => (
    <div id="programContainer" className={'grid gap-2 w-full'}>
        <Label htmlFor="program" className="block text-[14px] font-medium leading-[22px] text-labelBlue">Program</Label>
        <Select onValueChange={(value) => setSelectedProgram(value)} onOpenChange={(open) => setIsSelectOpen(open)}>
            <SelectTrigger id="programSelectTrigger" className={`${selectedProgram ? 'text-black500' : 'text-black300'} mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650 `}>
                <SelectValue placeholder="Select Program">{selectedProgram || "Select program"}</SelectValue>
                {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> : <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
            </SelectTrigger>
            <SelectContent id="programSelectContent">
                {["Design thinking", "Software engineering", "Product design", "Product marketing", "Product management"].map((program) => (
                    <SelectItem id={`program${program.replace(/\s+/g, '')}`} className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950" key={program} value={program}>
                        {program}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default ProgramSelect;