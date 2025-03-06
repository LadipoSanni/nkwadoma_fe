"use client";
import React, { useState } from "react";
import { inter } from "@/app/fonts";
import UpdateDraftButton from "@/reuseable/buttons/UpdateDraftButton";
import CreateInvestmentVehicle from "@/components/portfolio-manager/fund/Create-investment-vehicle";

interface saveToDraftProps {
    setIsOpen?: (b: boolean) => void;
}

interface DraftItem {
    id: number;
    name: string;
    lastUpdated: string;
    sponsors: string;
    fundManager: string;
    minimumInvestmentAmount: number;
    bankPartner: string;
    custodian: string;
    mandate: string;
    rate: number;
    size: number;
    tenure: number;
    trustee: string;
    draftType: "COMMERCIAL" | "ENDOWMENT";
}

const drafts: DraftItem[] = [
    {
        id: 1,
        name: "Girls in Tech",
        sponsors: "Google",
        lastUpdated: "13th Jan, 2025",
        fundManager: "Tech Fund Managers Ltd",
        minimumInvestmentAmount: 5000,
        bankPartner: "Chase Bank",
        custodian: "Custodian Trust Ltd",
        mandate: "Support women in technology",
        rate: 3.5,
        size: 1000000,
        tenure: 5,
        trustee: "Women in STEM Foundation",
        draftType: "COMMERCIAL",
    },
    {
        id: 2,
        name: "Empower the Youth Fund",
        sponsors: "WhatsApp",
        lastUpdated: "20th Jan, 2025",
        fundManager: "Youth Empowerment Fund Ltd",
        minimumInvestmentAmount: 10000,
        bankPartner: "Standard Chartered",
        custodian: "Safe Custody Ltd",
        mandate: "Empowering young entrepreneurs",
        rate: 4.2,
        size: 2000000,
        tenure: 7,
        trustee: "Global Youth Trust",
        draftType: "ENDOWMENT",
    },
    {
        id: 3,
        name: "Green Energy Initiative",
        sponsors: "Tesla",
        lastUpdated: "25th Jan, 2025",
        fundManager: "Eco Fund Managers",
        minimumInvestmentAmount: 15000,
        bankPartner: "Bank of America",
        custodian: "Eco Custodians Ltd",
        mandate: "Invest in renewable energy projects",
        rate: 5.0,
        size: 3000000,
        tenure: 10,
        trustee: "Green Future Foundation",
        draftType: "ENDOWMENT",
    },
    {
        id: 4,
        name: "Health for All Fund",
        sponsors: "Pfizer",
        lastUpdated: "30th Jan, 2025",
        fundManager: "Global Health Investments",
        minimumInvestmentAmount: 20000,
        bankPartner: "Citi Bank",
        custodian: "Health Custody Services",
        mandate: "Expand access to healthcare",
        rate: 3.8,
        size: 2500000,
        tenure: 6,
        trustee: "Universal Health Trust",
        draftType: "ENDOWMENT",
    },
    {
        id: 5,
        name: "Education First Initiative",
        sponsors: "UNESCO",
        lastUpdated: "5th Feb, 2025",
        fundManager: "Education Growth Fund",
        minimumInvestmentAmount: 8000,
        bankPartner: "HSBC",
        custodian: "Safe Learning Custodians",
        mandate: "Increase global literacy rates",
        rate: 4.0,
        size: 1800000,
        tenure: 8,
        trustee: "Education for All Trust",
        draftType: "ENDOWMENT",
    },
    {
        id: 6,
        name: "Education First Initiative",
        sponsors: "UNESCO",
        lastUpdated: "5th Feb, 2025",
        fundManager: "Education Growth Fund",
        minimumInvestmentAmount: 8000,
        bankPartner: "HSBC",
        custodian: "Safe Learning Custodians",
        mandate: "Increase global literacy rates",
        rate: 4.0,
        size: 1800000,
        tenure: 8,
        trustee: "Education for All Trust",
        draftType: "COMMERCIAL",
    },
    {
        id: 7,
        name: "Education First Initiative",
        sponsors: "UNESCO",
        lastUpdated: "5th Feb, 2025",
        fundManager: "Education Growth Fund",
        minimumInvestmentAmount: 8000,
        bankPartner: "HSBC",
        custodian: "Safe Learning Custodians",
        mandate: "Increase global literacy rates",
        rate: 4.0,
        size: 1800000,
        tenure: 8,
        trustee: "Education for All Trust",
        draftType: "COMMERCIAL",
    },
];

const Draft = ({ setIsOpen }: saveToDraftProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState(1);

    const handleClick = (id: number) => {
        if (id === selectedId) {
            setSelectedId(null);
            setDisabled(true);
        } else {
            setSelectedId(id);
            setDisabled(false);
        }
    };

    const handleUpdateInvestmentVehicleDraft = () => {
        if (selectedId) {
            setStep(2);
        }
    };

    const handleClose = () => {
        setStep(1);
        if (setIsOpen) setIsOpen(false);
    };

    const selectedDraft = drafts.find((draft) => draft.id === selectedId);

    return (
        <div>
            {step === 1 ? (
                <div className="w-full">
                    <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {drafts.map((draft) => (
                            <div
                                key={draft.id}
                                className={`p-4 border rounded-lg cursor-pointer transition ${
                                    selectedId === draft.id ? "bg-[#F9F9F9]" : "ring-[#ECECEC]"
                                }`}
                                onClick={() => handleClick(draft.id)}
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
                        <UpdateDraftButton
                            disable={disabled}
                            backgroundColor="#142854"
                            textColor="white"
                            id="continueButton"
                            height="3.4rem"
                            data-testid="continueButtonModal"
                            buttonText="Continue"
                            width="32%"
                            handleClick={handleUpdateInvestmentVehicleDraft}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    {selectedDraft && (
                        <>
                            {selectedDraft.draftType === "COMMERCIAL" ? (
                                <CreateInvestmentVehicle
                                    setIsOpen={handleClose}
                                    type="sponsor"
                                    investmentVehicleType="COMMERCIAL"
                                />
                            ) : (
                                <CreateInvestmentVehicle
                                    setIsOpen={handleClose}
                                    type="donor"
                                    investmentVehicleType="ENDOWMENT"
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Draft;