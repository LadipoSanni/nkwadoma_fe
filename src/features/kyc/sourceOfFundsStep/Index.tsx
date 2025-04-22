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

interface FormValues {
    sourceOfFund: string[];
}

const SourceOfFundsStep = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const completedStep = useAppSelector(state => state.kycMultistep.completedSteps);
    const savedSourceOfFunds = useAppSelector(state => state.kycForm.sourceOfFunds);

    useEffect(() => {
        if (!completedStep.includes("identification")) {
            router.push('/kyc/identification');
        }
    }, [completedStep, router]);

    const sourceOptions = [
        { value: 'Personal or joint savings', label: 'Personal or joint savings' },
        { value: 'Employment income', label: 'Employment income' },
        { value: 'Sales of assets', label: 'Sales of assets' },
        { value: 'Donation', label: 'Donation' },
        { value: 'Inheritance or gift', label: 'Inheritance or gift' },
        { value: 'Compensation of legal settlements', label: 'Compensation of legal settlements' },
        { value: 'Profit from legitimate activities', label: 'Profit from legitimate activities' },
    ];

    const handleBackClick = () => {
        router.back();
    };

    const handleSubmit = async (values: FormValues) => {
        if (values.sourceOfFund.length === 0) {
            return;
        }

        try {
            setIsLoading(true);
            dispatch(updateSourceOfFunds(values.sourceOfFund)); // Save to Redux
            await store.dispatch(markStepCompleted("sourceOfFunds"));
            router.push('/kyc/beneficial-owner');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{ sourceOfFund: savedSourceOfFunds || [] }} // Load saved values
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <main className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
                        <div className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                            <h1 className={`text-meedlBlack text-[24px] leading-[120%] font-medium`}>Source of funds</h1>
                        </div>

                        <div className={'md:w-[27.5rem] w-full grid gap-10'}>
                            <CustomMultiselect
                                multiselectList={sourceOptions}
                                onValueChange={(values) => setFieldValue("sourceOfFund", values)}
                                placeholder="Select sources"
                                className=""
                                selectedValues={savedSourceOfFunds}
                            />

                            <div className={'md:flex md:justify-between grid gap-5'}>
                                <Button
                                    onClick={handleBackClick}
                                    type={'button'}
                                    className={'h-[2.8125rem] md:w-[4.625rem] w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md order-2 md:order-1'}
                                >
                                    Back
                                </Button>
                                <Button
                                    type={'submit'}
                                    disabled={values.sourceOfFund.length === 0 || isLoading}
                                    className={`h-[2.8125rem] md:w-[9.3125rem] w-full px-4 py-2 ${values.sourceOfFund.length === 0 ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'} text-white rounded-md flex items-center justify-center gap-2 order-1 md:order-2`}
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