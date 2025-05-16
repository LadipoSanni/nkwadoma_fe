import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TuitionInputProps {
    tuition: string;
    setTuition: (value: string) => void;
    labelName?: string
}

const TuitionInput: React.FC<TuitionInputProps> = ({ tuition, setTuition,labelName }) => {
    const [error, setError] = useState<string | null>(null);

    const handleValueChange = (values: { value: string }) => {
        const amount = values.value;
        
        if (amount === '0' || amount === '') {
            setError('Tuition must be at least 1');
            setTuition(''); 
        } 
        else if (amount.length > 1 && amount.startsWith('0')) {
            setError('Cannot have leading zeros');
        } 
        else if (amount.length > 19) {
            setError('Maximum amount exceeded');
        }
        else {
            setTuition(amount);
            setError(null);
        }
    };

    return (
        <div id="tuitionContainer" className="grid gap-2">
            <Label htmlFor="tuition" className="block text-sm font-medium text-labelBlue">
            {labelName}
            </Label>
            
            <NumericFormat
                customInput={Input}
                id="tuition"
                name="tuition"
                placeholder="Enter tuition"
                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 w-full"
                value={tuition}
                onValueChange={handleValueChange}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                isAllowed={(values) => {
                    return values.floatValue !== 0;
                }}
            />
            
            {error && (
                <p className="text-red-500 absolute mt-16 ">
                    {error === 'Tuition must be at least 1' 
                        ? 'Tuition cannot be zero' 
                        : error}
                </p>
            )}
        </div>
    );
};

export default TuitionInput