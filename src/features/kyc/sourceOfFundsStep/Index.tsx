'use client'
import React, { useEffect, useState } from 'react';
import { inter, cabinetGroteskMediumBold } from '@/app/fonts';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { Button } from "@/components/ui/button";
import { store } from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/kyc-multiselect';
import { updateSourceOfFunds } from '@/redux/slice/kyc/kycFormSlice';
import Isloading from '@/reuseable/display/Isloading';
import CustomMultiselect from "@/reuseable/mult-select/customMultiselect/Index";
import { Input } from "@/components/ui/input";
import {MdAdd, MdDeleteOutline} from "react-icons/md";

interface FormValues {
    sourceOfFund: string[];
    otherSources: string[];
}

const SourceOfFundsStep = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [currentOtherSource, setCurrentOtherSource] = useState("");

    const completedStep = useAppSelector(state => state.kycMultistep.completedSteps);
    const savedSourceOfFunds = useAppSelector(state => state.kycForm.sourceOfFunds);
    const identificationType = useAppSelector(state => state.kycForm.identification.type);

    // Extract any "Source (specify others):" items from savedSourceOfFunds
    const regularSources = savedSourceOfFunds?.filter(v => !v.startsWith("Source (specify others):")) || [];
    const initialOtherSources = savedSourceOfFunds
        ?.filter(v => v.startsWith("Source (specify others):"))
        .map(v => v.replace("Source (specify others):", "").trim()) || [];

    useEffect(() => {
        if (!completedStep.includes("identification")) {
            router.push('/kyc/identification');
        }
    }, [completedStep, router]);

    const individualSourceOptions = [
        { value: 'Personal or joint savings', label: 'Personal or joint savings' },
        { value: 'Employment income', label: 'Employment income' },
        { value: 'Sales of assets', label: 'Sales of assets' },
        { value: 'Donation', label: 'Donation' },
        { value: 'Inheritance or gift', label: 'Inheritance or gift' },
        { value: 'Compensation of legal settlements', label: 'Compensation of legal settlements' },
        { value: 'Profit from legitimate activities', label: 'Profit from legitimate activities' },
        { value: 'Others', label: 'Others' },
    ];

    const corporateSourceOptions = [
        { value: 'Business revenue', label: 'Business revenue' },
        { value: 'Investment income', label: 'Investment income' },
        { value: 'Sales of corporate assets', label: 'Sales of corporate assets' },
        { value: 'Others', label: 'Others' },
    ];

    const sourceOptions = identificationType === 'COOPERATE'
        ? corporateSourceOptions
        : individualSourceOptions;

    const handleBackClick = () => {
        router.back();
    };

    const addOtherSource = (values: FormValues, setFieldValue: (field: string, value: string[]) => void) => {
        if (currentOtherSource.trim()) {
            const updatedOtherSources = [...values.otherSources, currentOtherSource.trim()];
            setFieldValue("otherSources", updatedOtherSources);
            setCurrentOtherSource("");
        }
    };

    const updateOtherSource = (index: number, value: string, values: FormValues, setFieldValue: (field: string, value: string[]) => void) => {
        const updatedOtherSources = [...values.otherSources];
        updatedOtherSources[index] = value;
        setFieldValue("otherSources", updatedOtherSources);
    };

    const removeOtherSource = (index: number, values: FormValues, setFieldValue: (field: string, value: string[]) => void) => {
        const updatedOtherSources = values.otherSources.filter((_, i) => i !== index);
        setFieldValue("otherSources", updatedOtherSources);
    };

    const clearOtherSource = () => {
        setCurrentOtherSource("");
    };

    const handleSubmit = async (values: FormValues) => {
        const { sourceOfFund, otherSources } = values;

        if (sourceOfFund.length === 0 && otherSources.length === 0) {
            return;
        }

        try {
            setIsLoading(true);
            const formattedOtherSources = otherSources.map(source => `Source (specify others): ${source}`);
            
            if (currentOtherSource.trim()) {
                formattedOtherSources.push(`Source (specify others): ${currentOtherSource.trim()}`);
            }
            
            const allSources = [...sourceOfFund, ...formattedOtherSources];

            dispatch(updateSourceOfFunds(allSources)); // Save to Redux
            await store.dispatch(markStepCompleted("sourceOfFunds"));
            router.push('/kyc/beneficial-owner');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                sourceOfFund: regularSources,
                otherSources: initialOtherSources
            }}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <main className={`${inter.className} w-full xl:px-48 grid-cols-1 gap-y-6 grid`}>
                        <div className={`${cabinetGroteskMediumBold.className} max-w-[27.5rem] md:mx-auto w-full`}>
                            <h1 className={`text-meedlBlack text-[24px] leading-[120%] font-medium`}>Source of funds</h1>
                        </div>

                        <div className={'w-full md:max-w-[27.5rem] md:mx-auto grid gap-5'}>
                            <CustomMultiselect
                                multiselectList={sourceOptions}
                                onValueChange={(newValues) => {
                                    if (values.sourceOfFund.includes('Others') && !newValues.includes('Others')) {
                                        setFieldValue("otherSources", []);
                                        setCurrentOtherSource("");
                                    }
                                    setFieldValue("sourceOfFund", newValues);
                                }}
                                placeholder="Select source"
                                className=""
                                selectedValues={values.sourceOfFund}
                            />

                            {values.sourceOfFund.includes('Others') && (
                                <div className="max-h-[300px] overflow-y-auto p">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium">Source (specify others)</h3>
                                    </div>
                                    
                                    {values.otherSources.map((source, index) => (
                                        <div key={index} className="flex gap-3 items-center justify-between mb-3">
                                            <Input
                                                type="text"
                                                value={source}
                                                onChange={(e) => updateOtherSource(index, e.target.value, values, setFieldValue)}
                                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] w-[25.5rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeOtherSource(index, values, setFieldValue)}
                                                className="text-[#939CB0]"
                                            >
                                                <MdDeleteOutline className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    <div className="flex w-full gap-3 items-center justify-between">
                                        <Input
                                            id="otherSource"
                                            type="text"
                                            placeholder="Enter source"
                                            value={currentOtherSource}
                                            onChange={(e) => setCurrentOtherSource(e.target.value)}
                                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] w-[25.5rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && currentOtherSource.trim()) {
                                                    e.preventDefault();
                                                    addOtherSource(values, setFieldValue);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={clearOtherSource}
                                            className="text-[#939CB0]"
                                        >
                                            <MdDeleteOutline className="h-5 w-5" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 mt-4">
                                        <div className="flex items-center gap-1">
                                            <Button
                                                onClick={() => addOtherSource(values, setFieldValue)}
                                                type="button"
                                                className="flex items-center gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
                                                disabled={!currentOtherSource.trim()}
                                            >
                                                <MdAdd className="text-meedlBlue h-5 w-5" />
                                                <span className="font-semibold text-[14px] leading-[150%]">Add</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={'md:flex  md:justify-between mt-5 grid gap-5'}>
                                <Button
                                    onClick={handleBackClick}
                                    type={'button'}
                                    className={'h-[2.8125rem] md:w-[4.625rem] w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md order-2 md:order-1'}
                                >
                                    Back
                                </Button>
                                <Button
                                    type={'submit'}
                                    disabled={(values.sourceOfFund.length === 0 && values.otherSources.length === 0 && !currentOtherSource.trim()) || isLoading}
                                    className={`h-[2.8125rem] md:w-[9.3125rem] w-full px-4 py-2 ${(values.sourceOfFund.length === 0 && values.otherSources.length === 0 && !currentOtherSource.trim()) ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'} text-white rounded-md flex items-center justify-center gap-2 order-1 md:order-2`}
                                >
                                    {isLoading ? (
                                        <Isloading color="white" height={24} width={24} />
                                    ) : (
                                        'Save & continue'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </main>
                </Form>
            )}
        </Formik>
    );
};

export default SourceOfFundsStep;