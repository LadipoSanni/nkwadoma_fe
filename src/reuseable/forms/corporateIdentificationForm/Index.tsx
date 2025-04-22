import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Isloading from '@/reuseable/display/Isloading';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

// Define the expected input types for this form
interface CorporateFormInputs {
    tin: string;
    rcNumber: string;
    countryOfIncorporation: string;
}

// Define the props interface
interface CorporateIdentificationFormProps {
    register: UseFormRegister<CorporateFormInputs>;
    handleSubmit: UseFormHandleSubmit<CorporateFormInputs>;
    errors: FieldErrors<CorporateFormInputs>;
    isValid: boolean;
    onSubmit: (data: CorporateFormInputs) => void; // Adjusted type based on parent onSubmit
    isLoading: boolean;
}

const CorporateIdentificationForm: React.FC<CorporateIdentificationFormProps> = ({
                                                                                     register,
                                                                                     handleSubmit,
                                                                                     errors,
                                                                                     isValid,
                                                                                     onSubmit,
                                                                                     isLoading
                                                                                 }) => {
    return (
        // Use the passed handleSubmit and onSubmit
        <form onSubmit={handleSubmit(onSubmit)} className={'grid gap-5 md:w-[27.5rem] w-full'}>
            <div className={'grid gap-2'}>
                <Label htmlFor="tin">Tax Identification Number</Label>
                <Input
                    type="text"
                    placeholder="Enter TIN"
                    // Use the passed register prop
                    {...register("tin", {
                        required: "TIN is required"
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem]'}
                />
                {/* Use the passed errors prop */}
                {errors.tin && <p className="text-red-500 text-sm">{errors.tin.message}</p>}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="rcNumber">RC Number</Label>
                <Input
                    type="text"
                    placeholder="Enter RC Number"
                    // Use the passed register prop
                    {...register("rcNumber", {
                        required: "RC Number is required"
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem]'}
                />
                {/* Use the passed errors prop */}
                {errors.rcNumber && <p className="text-red-500 text-sm">{errors.rcNumber.message}</p>}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="countryOfIncorporation">Country of Incorporation</Label>
                <Input
                    type="text"
                    placeholder="Enter country"
                    // Use the passed register prop
                    {...register("countryOfIncorporation", {
                        required: "Country is required"
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem]'}
                />
                {/* Use the passed errors prop */}
                {errors.countryOfIncorporation &&
                    <p className="text-red-500 text-sm">{errors.countryOfIncorporation.message}</p>
                }
            </div>

            <div className={'flex justify-end mt-5'}>
                <Button
                    type="submit"
                    // Use the passed isValid and isLoading props
                    disabled={!isValid || isLoading}
                    className={`h-[2.8125rem] md:w-[9.3125rem] w-full ${!isValid ? 'bg-blue550' : 'bg-meedlBlue'}`}
                >
                    {/* Use the passed isLoading prop */}
                    {isLoading ? <Isloading color="white" height={24} width={24}/> : 'Save & continue'}
                </Button>
            </div>
        </form>
    );
};

export default CorporateIdentificationForm;