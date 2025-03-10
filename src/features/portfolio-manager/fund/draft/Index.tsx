"use client"
import UpdateDraft from "@/features/portfolio-manager/fund/draft/UpdateDraft";
import React, { useState } from "react";
import { inter } from "@/app/fonts";
import UpdateDraftButton from "@/reuseable/buttons/UpdateDraftButton";
import {
    useGetInvestmentVehiclesByTypeAndStatusQuery
} from "@/service/admin/fund_query";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {clearSaveClickedDraft, setSaveClickedDraft} from "@/redux/slice/vehicle/vehicle";
import SkeletonForLoanOrg from "@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations";

interface saveToDraftProps {
    setIsOpen?: (b: boolean) => void;
    investmentVehicleType: string;
    type?: string;
}

export interface Draft {
    id: string;
    name: string;
    investmentVehicleType: string | undefined;
    mandate: string;
    sponsors: string;
    tenure: string | number;
    size: string | number;
    rate: number | string;
    trustee: string ;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    minimumInvestmentAmount: number | string;
    status: string;
    startDate: string;
    // lastUpdatedDate: string;
}

export const handleClick = (
    draft: Draft,
    selectedDraft: Draft | null,
    setSelectedDraft: (draft: Draft | null) => void,
    setDisabled: (disabled: boolean) => void,
    dispatch: AppDispatch
) => {
    if (draft.id === selectedDraft?.id) {
        setSelectedDraft(null);
        setDisabled(true);
        dispatch(clearSaveClickedDraft());
    } else {
        setSelectedDraft(draft);
        setDisabled(false);
        dispatch(setSaveClickedDraft(draft));
    }
};

export const handleContinueButton = (setStep: (step: number) => void) => {
    setStep(2);
};

export const handleSaveAndBackToAllDraft = (setStep: (step: number) => void) => {
    setStep(1);
};

const Draft = ({ investmentVehicleType, type }: saveToDraftProps) => {
    const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState(1);

    const dispatch = useDispatch();
    const saveClickedDraft = useSelector((state: RootState) => state.vehicle.saveClickedDraft);
    console.log(saveClickedDraft);

    const { data, isLoading } = useGetInvestmentVehiclesByTypeAndStatusQuery({
        pageSize: 20,
        pageNumber: 0,
        type: investmentVehicleType,
        status: "DRAFT",
    });

    return (
        <div className={`${inter.className}`}>
            {step === 1 ? (
                <div className="w-full">
                    <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {isLoading && <SkeletonForLoanOrg/>}
                        {data?.data.map((draft: Draft) => (
                            <div
                                key={draft.id}
                                className={`${inter.className} p-4 border rounded-lg cursor-pointer transition ${
                                    selectedDraft?.id === draft.id ? "bg-[#F9F9F9]" : "ring-[#ECECEC]"
                                }`}
                                onClick={() =>
                                    handleClick(draft, selectedDraft, setSelectedDraft, setDisabled, dispatch)
                                }
                            >
                                <h3
                                    className={`${inter.className} font-medium text-sm leading-5 text-meedlBlack capitalize`}
                                >
                                    {draft.name}
                                </h3>
                                <p className={`${inter.className} font-medium text-sm leading-5 text-[#999999]`}>
                                    Last updated on {"Dec, 4th 2025"}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end py-4">
                        <UpdateDraftButton
                            disable={disabled}
                            backgroundColor="#142854"
                            textColor="white"
                            id="continueButton"
                            height="3.4rem"
                            data-testid="continueButtonModal"
                            buttonText="Continue"
                            width="24%"
                            handleClick={() => handleContinueButton(setStep)}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <UpdateDraft
                        handleSaveAndBackToAllDraft={() => handleSaveAndBackToAllDraft(setStep)}
                        investmentVehicleType={investmentVehicleType}
                        type={type}
                    />
                </div>
            )}
        </div>
    );
};

export default Draft;