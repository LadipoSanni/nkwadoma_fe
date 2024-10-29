import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CohortNameInputProps {
    cohortName: string;
    setCohortName: (name: string) => void;
}

const CohortNameInput: React.FC<CohortNameInputProps> = ({ cohortName, setCohortName }) => (
    <div id="cohortNameContainer" className={'grid gap-2'}>
        <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort Name</Label>
        <Input
            type="text"
            id="cohortName"
            name="cohortName"
            placeholder="Enter name"
            className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650'}
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
        />
    </div>
);

export default CohortNameInput;