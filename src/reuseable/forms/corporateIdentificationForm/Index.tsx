import React, {useState, useEffect} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Isloading from '@/reuseable/display/Isloading';
import {UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormSetValue} from 'react-hook-form';
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
    setValue: UseFormSetValue<CorporateFormInputs>;
    defaultValues?: CorporateFormInputs;
}

const CorporateIdentificationForm: React.FC<CorporateIdentificationFormProps> = ({
                                                                                     register,
                                                                                     handleSubmit,
                                                                                     errors,
                                                                                     isValid,
                                                                                     onSubmit,
                                                                                     isLoading,
                                                                                     setValue,
                                                                                     defaultValues
                                                                                 }) => {
    const [selectedCountry, setSelectedCountry] = useState<string>(defaultValues?.countryOfIncorporation || "");
    register("countryOfIncorporation", {required: "Country of incorporation is required"});

    useEffect(() => {
        if (selectedCountry) {
            setValue("countryOfIncorporation", selectedCountry, {shouldValidate: true});
        }
    }, [selectedCountry, setValue]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setValue("countryOfIncorporation", value, {shouldValidate: true});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-full md:max-w-[27.5rem] md:mx-auto grid gap-5'}>
            <div className={'grid gap-2'}>
                <Label htmlFor="tin">Tax Identification Number</Label>
                <Input
                    type="text"
                    placeholder="Enter TIN"
                    {...register("tin", {
                        required: "TIN is required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "TIN must be exactly 10 digits"
                        },
                        validate: {
                            validDigits: (value) => /^\d+$/.test(value) || "TIN must contain only numbers",
                            exactLength: (value) => value.length === 10 || "TIN must be 10 digits"
                        }
                    })}
                    maxLength={10}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
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
                    onCountryChange={handleCountryChange}
                    restrictedCountries={["US", "NG"]}
                    disableSearch={true}
                />
                {errors.countryOfIncorporation && (
                    <p className="text-red-500 text-sm">{errors.countryOfIncorporation.message}</p>
                )}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="rcNumber">RC Number</Label>
                <Input
                    type="text"
                    placeholder="Enter RC number"
                    {...register("rcNumber", {
                        required: "RC Number is required",
                        pattern: {
                            value: /^RC\d{7}$/i,
                            message: "RC Number must be in format RC1234567"
                        },
                        validate: {
                            validFormat: (value) => /^RC\d{7}$/i.test(value) || "RC Number must start with RC followed by 7 digits"
                        },
                        setValueAs: (value) => {
                            if (!value) return value;
                            return value.replace(/^rc/i, 'RC');
                        }
                    })}
                    maxLength={9}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
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
