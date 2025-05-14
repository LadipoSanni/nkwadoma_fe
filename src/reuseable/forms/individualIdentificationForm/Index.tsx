import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Isloading from '@/reuseable/display/Isloading';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

interface IndividualFormInputs {
    nin: string;
    bvn: string;
    taxId: string;
}

interface IndividualIdentificationFormProps {
    register: UseFormRegister<IndividualFormInputs>;
    handleSubmit: UseFormHandleSubmit<IndividualFormInputs>;
    errors: FieldErrors<IndividualFormInputs>;
    isValid: boolean;
    onSubmit: (data: IndividualFormInputs) => void;
    isLoading: boolean;
    setValue: UseFormSetValue<IndividualFormInputs>;
    defaultValues?: IndividualFormInputs;
}

const IndividualIdentificationForm: React.FC<IndividualIdentificationFormProps> = ({
                                                                                       register,
                                                                                       handleSubmit,
                                                                                       errors,
                                                                                       isValid,
                                                                                       onSubmit,
                                                                                       isLoading,
                                                                                       setValue
                                                                                   }) => {
    const [ninValue, setNinValue] = useState<string>("");
    const [bvnValue, setBvnValue] = useState<string>("");
    const [taxIdValue, setTaxIdValue] = useState<string>("");

    useEffect(() => {
        if (ninValue) {
            setValue("nin", ninValue, { shouldValidate: true });
        }
    }, [ninValue, setValue]);

    useEffect(() => {
        if (bvnValue) {
            setValue("bvn", bvnValue, { shouldValidate: true });
        }
    }, [bvnValue, setValue]);

    useEffect(() => {
        if (taxIdValue) {
            setValue("taxId", taxIdValue, { shouldValidate: true });
        }
    }, [taxIdValue, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-full md:max-w-[27.5rem] md:mx-auto grid gap-5'}>
            <div className={'grid gap-2'}>
                <Label htmlFor="nin">National identification number</Label>
                <Input
                    type="number"
                    placeholder="Enter NIN"
                    {...register("nin", {
                        required: "NIN is required",
                        pattern: {
                            value: /^\d{11}$/,
                            message: "NIN must be 11 digits"
                        },
                        onChange: (e) => {
                            setNinValue(e.target.value);
                        }
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
                />
                {errors.nin && <p className="text-red-500 text-sm">{errors.nin.message}</p>}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="bvn">Bank verification number</Label>
                <Input
                    type="number"
                    placeholder="Enter BVN"
                    {...register("bvn", {
                        required: "BVN is required",
                        pattern: {
                            value: /^\d{11}$/,
                            message: "BVN must be 11 digits"
                        },
                        onChange: (e) => {
                            setBvnValue(e.target.value);
                        }
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
                />
                {errors.bvn && <p className="text-red-500 text-sm">{errors.bvn.message}</p>}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="taxId">Tax identification number</Label>
                <PatternFormat
                    format="N-########"
                    customInput={Input}
                    placeholder="Enter TIN"
                    {...register("taxId", {
                        required: "Tax ID is required",
                        pattern: {
                            value: /^N-\d{8}$/,
                            message: "Tax ID must be in format N-12345678"
                        },
                        validate: {
                            validFormat: (value) => {
                                return /^N-\d{8}$/.test(value) || "Tax ID must be in format N-12345678";
                            }
                        },
                        onChange: (e) => {
                            setTaxIdValue(e.target.value);
                        }
                    })}
                    onValueChange={(values) => {
                        const { formattedValue } = values;
                        setTaxIdValue(formattedValue);
                    }}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
                />
                {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId.message}</p>}
            </div>

            <div className={'flex justify-end mt-5'}>
                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`h-[2.8125rem] md:w-[9.3125rem] w-full ${!isValid ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'}`}
                >
                    {isLoading ? <Isloading color="white" height={24} width={24}/> : 'Save & continue'}
                </Button>
            </div>
        </form>
    );
};

export default IndividualIdentificationForm;
