"use client";
import React, {useState} from "react";
import {inter} from "@/app/fonts";
import ContinueDraftButton from "@/reuseable/buttons/UpdateDraftButton";
import UpdateDraft from "./UpdateDraft";
import {drafts} from "@/utils/LoanRequestMockData/cohortProduct";

interface saveToDraftProps {
    setIsOpen?: (b: boolean) => void;
    investmentVehicleType?: string;
    type?: string
}

export const handleClick = (
    id: number,
    selectedId: number | null,
    setSelectedId: (id: number | null) => void,
    setDisabled: (disabled: boolean) => void
) => {
    if (id === selectedId) {
        setSelectedId(null);
        setDisabled(true);
    } else {
        setSelectedId(id);
        setDisabled(false);
    }
};

export const handleContinueButton = (
    setStep: (step: number) => void
) => {
    setStep(2);
};

export const handleSaveAndBackToAllDraft = (
    setStep: (step: number) => void,
) => {
    setStep(1);
};

const Draft = ({investmentVehicleType, type}: saveToDraftProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState(1);

    // const selectedDraft = drafts.find((draft) => draft.id === selectedId);

    return (
        <div>
            {step === 1 ? (
                <div className="w-full">
                    <div
                        className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {drafts.map((draft) => (
                            <div
                                key={draft.id}
                                className={`p-4 border rounded-lg cursor-pointer transition ${
                                    selectedId === draft.id ? "bg-[#F9F9F9]" : "ring-[#ECECEC]"
                                }`}
                                onClick={() => handleClick(draft.id, selectedId, setSelectedId, setDisabled)}
                            >
                                <h3 className={`${inter.className} font-medium text-sm leading-5 text-meedlBlack`}>
                                    {draft.name}
                                </h3>
                                <p className={`${inter.className} font-medium text-sm leading-5 text-[#999999]`}>
                                    Last updated on {draft.lastUpdated}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end py-4">
                        <ContinueDraftButton
                            disable={disabled}
                            backgroundColor="#142854"
                            textColor="white"
                            id="continueButton"
                            height="3.4rem"
                            data-testid="continueButtonModal"
                            buttonText="Continue"
                            width="32%"
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