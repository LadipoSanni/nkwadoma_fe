import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Isloading from '@/reuseable/display/Isloading';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

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
}

const IndividualIdentificationForm: React.FC<IndividualIdentificationFormProps> = ({
                                                                                       register,
                                                                                       handleSubmit,
                                                                                       errors,
                                                                                       isValid,
                                                                                       onSubmit,
                                                                                       isLoading
                                                                                   }) => {
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
                        }
                    })}
                    className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] placeholder:text-black100'}
                />
                {errors.bvn && <p className="text-red-500 text-sm">{errors.bvn.message}</p>}
            </div>

            <div className={'grid gap-2'}>
                <Label htmlFor="taxId">Tax identification number</Label>
                <Input
                    type="text"
                    placeholder="Enter TIN"
                    {...register("taxId", {
                        required: "Tax ID is required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "Tax ID must be exactly 10 digits"
                        },
                        validate: {
                            validDigits: (value) => /^\d+$/.test(value) || "Tax ID must contain only numbers",
                            exactLength: (value) => value.length === 10 || "Tax ID must be 10 digits"
                        }
                    })}
                    maxLength={10}
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
