import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Isloading from '@/reuseable/display/Isloading';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover/Index";

interface CorporateFormInputs {
    tin: string;
    rcNumber: string;
    countryOfIncorporation: string;
}

interface CorporateIdentificationFormProps {
    register: UseFormRegister<CorporateFormInputs>;
    handleSubmit: UseFormHandleSubmit<CorporateFormInputs>;
    errors: FieldErrors<CorporateFormInputs>;
    isValid: boolean;
    onSubmit: (data: CorporateFormInputs) => void;
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
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'grid gap-5 md:w-[27.5rem] w-full'}>
            <div className={'grid gap-2'}>
                <Label htmlFor="tin">Tax Identification Number</Label>
                <Input
                    type="text"
                    placeholder="Enter TIN"
                    {...register("tin", {
                        required: "TIN is required"
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem]'}
                />
                {errors.tin && <p className="text-red-500 text-sm">{errors.tin.message}</p>}
            </div>

            <div id="countryOfIncorporationContainer" className="grid gap-2">
                <Label htmlFor="countryOfIncorporation" id="countryOfIncorporationLabel"
                       className="block text-sm font-medium text-labelBlue">
                    Country of incorporation
                </Label>
                <CountrySelectPopover
                    selectedCountry={selectedCountry}
                    onCountryChange={(value) => setSelectedCountry(value)}
                    restrictedCountries={["US", "NG"]}
                    disableSearch={true}
                />
            </div>


            <div className={'grid gap-2'}>
                <Label htmlFor="rcNumber">RC Number</Label>
                <Input
                    type="text"
                    placeholder="Enter RC Number"
                    {...register("rcNumber", {
                        required: "RC Number is required"
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem]'}
                />
                {errors.rcNumber && <p className="text-red-500 text-sm">{errors.rcNumber.message}</p>}
            </div>

            <div className={'flex justify-end mt-5'}>
                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`h-[2.8125rem] md:w-[9.3125rem] w-full ${!isValid ? 'bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'}`}
                >
                    {isLoading ? <Isloading color="white" height={24} width={24}/> : 'Save & continue'}
                </Button>
            </div>
        </form>
    );
};

export default CorporateIdentificationForm;