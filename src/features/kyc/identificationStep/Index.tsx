'use client'
import React from 'react';
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
}

interface CorporateFormInputs {
    tin: string;
    rcNumber: string;
    countryOfIncorporation: string;
}

const IdentificationStep = () => {
    const route = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const financierType = useAppSelector(state => state.financier.type);
    const savedData = useAppSelector(state => state.kycForm.identification);

    const {
        register: individualRegister,
        handleSubmit: handleIndividualSubmit,
        formState: { errors: individualErrors, isValid: isIndividualValid }
    } = useForm<IndividualFormInputs>({
        mode: 'onChange',
        defaultValues: savedData.individual || { nin: '', bvn: '' }
    });

    const {
        register: corporateRegister,
        handleSubmit: handleCorporateSubmit,
        formState: { errors: corporateErrors, isValid: isCorporateValid }
    } = useForm<CorporateFormInputs>({
        mode: 'onChange',
        defaultValues: savedData.corporate || { tin: '', rcNumber: '', countryOfIncorporation: '' }
    });

    const handleFormSubmitSuccess = async (type: 'INDIVIDUAL' | 'COOPERATE', data: IndividualFormInputs | CorporateFormInputs) => {
        try {
            setIsLoading(true);
            dispatch(updateIdentification({ type, data }));
            await store.dispatch(markStepCompleted("identification"));
            route.push('/kyc/sof');
        } finally {
            setIsLoading(false);
        }
    };

    const onIndividualSubmit = (data: IndividualFormInputs) => {
        handleFormSubmitSuccess('INDIVIDUAL', data);
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
                        isLoading={isLoading}
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
                        isLoading={isLoading}
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
                        isLoading={isLoading}
                    />
                );
        }
    };

    return (
        <main className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 className={`text-meedlBlack text-[24px] leading-[120%] font-medium`}>
                    {financierType === 'INDIVIDUAL' ? 'Identification' : 'Identification'}
                </h1>
            </div>
            {renderForm()}
        </main>
    );
};

export default IdentificationStep;