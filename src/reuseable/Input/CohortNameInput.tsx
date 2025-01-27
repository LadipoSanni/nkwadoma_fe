import React,{useState} from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CohortNameInputProps {
    cohortName: string;
    setCohortName: (name: string) => void;
}

const CohortNameInput: React.FC<CohortNameInputProps> = ({ cohortName, setCohortName }) => {
    const [error, setError] = useState<string | null>(null); 
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    //     const value = e.target.value; 
    //     const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_\s]*$/; 
    //      if (value === "" || regex.test(value)) { 
    //         setCohortName(value);
    //           setError(null); 
    //      } 
    //         else { 
    //             setError('Cohort name should contain at least one letter and can include numbers, hyphens, and underscores.'); 
    //         }
    // };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_\s]*$/;
        const maxLength = 200;
    
        if (value.length > maxLength) {
            setError(`Cohort name should not exceed ${maxLength} characters.`);
        } else if (value === "" || regex.test(value)) {
            setCohortName(value);
            setError(null);
        } else {
            setError('Cohort name should contain at least one letter and can include numbers, hyphens, and underscores.');
        }
    };
    
     
    return (
    
    <div id="cohortNameContainer" className={'grid gap-2'}>
        <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort Name</Label>
        <Input
            type="text"
            id="cohortName"
            name="cohortName"
            placeholder="Enter name"
            className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
            value={cohortName}
            // onChange={(e) => setCohortName(e.target.value)}
            onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
    )
}
;

export default CohortNameInput;