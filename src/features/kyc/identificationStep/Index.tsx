'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { inter, cabinetGroteskMediumBold } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import { store } from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/kyc-multiselect';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateIdentification } from '@/redux/slice/kyc/kycFormSlice';
import CorporateIdentificationForm from "@/reuseable/forms/corporateIdentificationForm/Index";
import IndividualIdentificationForm from "@/reuseable/forms/individualIdentificationForm/Index";

interface IndividualFormInputs {
    nin: string;
    bvn: string;
    taxId: string;
}

interface CorporateFormInputs {
    tin: string;
    rcNumber: string;
    countryOfIncorporation: string;
}

const IdentificationStep = () => {
    const route = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const financierType = useAppSelector(state => state.financier.financierType);
    const savedData = useAppSelector(state => state.kycForm.identification);

    const {
        register: individualRegister,
        handleSubmit: handleIndividualSubmit,
        formState: { errors: individualErrors, isValid: isIndividualValid }
    } = useForm<IndividualFormInputs>({
        mode: 'onChange',
        defaultValues: savedData.individual ? 
            { 
                nin: savedData.individual.nin, 
                bvn: savedData.individual.bvn, 
                taxId: savedData.individual.tin || '' 
            } : 
            { nin: '', bvn: '', taxId: '' }
    });

    const {
        register: corporateRegister,
        handleSubmit: handleCorporateSubmit,
        formState: { errors: corporateErrors, isValid: isCorporateValid },
        setValue: corporateSetValue
    } = useForm<CorporateFormInputs>({
        mode: 'onChange',
        defaultValues: savedData.corporate || { tin: '', rcNumber: '', countryOfIncorporation: '' }
    });

    const handleFormSubmitSuccess = async (type: 'INDIVIDUAL' | 'COOPERATE', data: IndividualFormInputs | CorporateFormInputs) => {
        setErrorMessage(null);
        dispatch(updateIdentification({ type, data }));
        await store.dispatch(markStepCompleted("identification"));
        route.push('/kyc/sof');
    };

    const onIndividualSubmit = (data: IndividualFormInputs) => {
        const mappedData = {
            ...data,
            tin: data.taxId
        };
        handleFormSubmitSuccess('INDIVIDUAL', mappedData);
    };

    const onCorporateSubmit = (data: CorporateFormInputs) => {
        handleFormSubmitSuccess('COOPERATE', data);
    };

    const renderForm = () => {
        switch (financierType) {
            case 'INDIVIDUAL':
                return (
                    <IndividualIdentificationForm
                        register={individualRegister}
                        handleSubmit={handleIndividualSubmit}
                        errors={individualErrors}
                        isValid={isIndividualValid}
                        onSubmit={onIndividualSubmit}
                        isLoading={false}
                    />
                );
            case 'COOPERATE':
                return (
                    <CorporateIdentificationForm
                        register={corporateRegister}
                        handleSubmit={handleCorporateSubmit}
                        errors={corporateErrors}
                        isValid={isCorporateValid}
                        onSubmit={onCorporateSubmit}
                        isLoading={false}
                        setValue={corporateSetValue}
                        defaultValues={savedData.corporate}
                    />
                );
            default:
                return (
                    <IndividualIdentificationForm
                        register={individualRegister}
                        handleSubmit={handleIndividualSubmit}
                        errors={individualErrors}
                        isValid={isIndividualValid}
                        onSubmit={onIndividualSubmit}
                        isLoading={false}
                    />
                );
        }
    };

    return (
        <main className={`${inter.className} w-full xl:px-48 grid-cols-1 gap-y-6 grid gap-10`}>
            <div className={`${cabinetGroteskMediumBold.className} max-w-[27.5rem] md:mx-auto w-full`}>
                <h1 className={`text-meedlBlack text-[24px] leading-[120%] font-medium`}>
                    {financierType === 'INDIVIDUAL' ? 'Identification' : 'Identification'}
                </h1>
            </div>
            {errorMessage && (
                <div className="w-full md:max-w-[27.5rem] md:mx-auto">
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                </div>
            )}
            {renderForm()}
        </main>
    );
};

export default IdentificationStep;
