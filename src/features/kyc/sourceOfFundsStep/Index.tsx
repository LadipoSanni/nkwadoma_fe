'use client'
import React, {useEffect} from 'react';
import {inter, inter500} from "@/app/fonts";
import {useAppSelector} from "@/redux/store";
import {useRouter} from 'next/navigation';
import Multiselect from '@/reuseable/mult-select/multi-select';
import {Formik, Form} from 'formik';
import {Button} from "@/components/ui/button";

const SourceOfFundsStep = () => {
    const router = useRouter();
    const completedStep = useAppSelector(state => (state?.kycMultistep.completedSteps));

    useEffect(() => {
        if (!completedStep.includes("identification")) {
            router.push('/kyc/identification');
        }
    }, [completedStep, router]);

    const sourceOptions = [
        {value: 'Personal or joint savings', label: 'Personal or joint savings'},
        {value: 'Employment income', label: 'Employment income'},
        {value: 'Sales of assets', label: 'Sales of assets'},
        {value: 'Donation', label: 'Donation'},
        {value: 'Inheritance or gift', label: 'Inheritance or gift'},
        {value: 'Compensation of legal settlements', label: 'Compensation of legal settlements'},
        {value: 'Profit from legitimate activities', label: 'Profit from legitimate activities'},
    ];

    const handleBackClick = () => {
        router.back();
    };


    return (
        <Formik
            initialValues={{investmentVehicleDesignation: []}}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({setFieldValue}) => (
                <Form>
                    <main className={`${inter.className} xl:px-36  grid-cols-1 gap-y-6  grid gap-10`}>
                        <div className={`${inter500.className} grid gap-1`}>
                            <h1 className={`text-meedlBlack text-[18px] leading-[150%] font-medium`}>Source of
                                funds</h1>
                            <p className={`text-black400 text-[14px] leading-[150%] font-normal`}>Add source</p>
                        </div>

                        <div>
                            <Multiselect
                                multiselectList={sourceOptions}
                                onValueChange={(values) => setFieldValue("investmentVehicleDesignation", values)}
                                placeholder='Select sources'
                            />
                        </div>

                        <div className={'flex justify-between'}>
                            <Button onClick={handleBackClick} type={'button'}
                                    className={'h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md'}>
                                Back
                            </Button>
                            <Button
                                type={'submit'}
                                onClick={() => router.push('/kyc/beneficial-owner')}
                                className={'h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md'}
                            >
                                Save & continue
                            </Button>
                        </div>
                    </main>
                </Form>
            )}
        </Formik>
    );
};

export default SourceOfFundsStep;