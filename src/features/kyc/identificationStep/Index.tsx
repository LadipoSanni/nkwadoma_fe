'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { inter, cabinetGroteskMediumBold } from '@/app/fonts'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { store } from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/kyc-multiselect';
import Isloading from '@/reuseable/display/Isloading';

interface FormInputs {
    nin: string;
    bvn: string;
}

const IdentificationStep = () => {
    const route = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormInputs>({
        mode: 'onChange'
    });

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsLoading(true);
            console.log('Form data:', data);
            await store.dispatch(markStepCompleted("identification"));
            route.push('/kyc/sof');
        } finally {
            setIsLoading(true);
        }
    }

    return (
        <main id="identificationStepMain" className={`${inter.className} xl:px-36  grid-cols-1 gap-y-6  grid gap-10`}>
            <div id="identificationHeader" className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 id="identificationTitle" className={`text-meedlBlack text-[24px] leading-[120%] font-medium`}>Identification</h1>
            </div>

            <form id="identificationForm" onSubmit={handleSubmit(onSubmit)} className={'grid gap-5 md:w-[27.5rem] w-full'}>
                <div id="ninContainer" className={'grid gap-2'}>
                    <Label htmlFor="nin" id="ninLabel" className="block text-sm font-medium text-labelBlue">National identification number</Label>
                    <Input
                        type="number"
                        id="ninInput"
                        placeholder="Enter NIN"
                        {...register("nin", {
                            required: "NIN is required",
                            pattern: {
                                value: /^\d{11}$/,
                                message: "NIN must be exactly 11 digits"
                            }
                        })}
                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                    />
                    {errors.nin && <p id="ninError" className="text-red-500 text-sm">{errors.nin.message}</p>}
                </div>

                <div id="bvnContainer" className={'grid gap-2'}>
                    <Label htmlFor="bvn" id="bvnLabel" className="block text-sm font-medium text-labelBlue">Bank verification number</Label>
                    <Input
                        type="number"
                        id="bvnInput"
                        placeholder="Enter BVN"
                        {...register("bvn", {
                            required: "BVN is required",
                            pattern: {
                                value: /^\d{11}$/,
                                message: "BVN must be exactly 11 digits"
                            }
                        })}
                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                    />
                    {errors.bvn && <p id="bvnError" className="text-red-500 text-sm">{errors.bvn.message}</p>}
                </div>

                <div id="buttonContainer" className={'flex justify-end mt-5'}>
                    <Button
                        type="submit"
                        id="saveContinueButton"
                        disabled={!isValid || isLoading}
                        className={`h-[2.8125rem] md:w-[9.3125rem] w-full text-[14px] leading-[150%] px-4 py-2 ${!isValid ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'} font-semibold text-meedlWhite rounded-md flex items-center justify-center gap-2`}
                    >
                        {isLoading ? (
                            <Isloading color="white" height={24} width={24} />
                        ) : (
                            'Save & continue'
                        )}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default IdentificationStep;