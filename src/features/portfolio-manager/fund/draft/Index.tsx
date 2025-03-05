"use client";
import React, {useState} from "react";
import {inter} from "@/app/fonts";
import UpdateDraftButton from "@/reuseable/buttons/UpdateDraftButton";
import UpdateInvestmentVehicleDraft from "./UpdateInvestmentVehicleDraft";

interface saveToDraftProps {
    setIsOpen?: (b: boolean) => void;
}

interface DraftItem {
    id: number;
    title: string;
    lastUpdated: string;
}

const drafts: DraftItem[] = [
    {id: 1, title: "Girls in tech", lastUpdated: "13th Jan, 2025"},
    {id: 2, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025"},
    {id: 3, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025"},
    {id: 4, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025"},
    {id: 5, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025"},
    // { id: 6, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025" },
    // { id: 7, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025" },
    // { id: 8, title: "Empower the youth fund", lastUpdated: "20th Jan, 2025" },
];

const Draft = ({setIsOpen}: saveToDraftProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [updateInvestmentVehicle, setUpdateInvestmentVehicle] = React.useState(false);
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
            console.log("Selected Draft ID:", selectedId);
            setUpdateInvestmentVehicle(true)
        }
        // if (setIsOpen) {
        //     setIsOpen(true);
        // }
        setStep(2)
    };

    return (
        <div>
            {
                step === 1 ? (
                    <div className="bg-white w-full">
                        <div className="space-y-3">
                            {drafts.map((draft) => (
                                <div
                                    key={draft.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition ${
                                        selectedId === draft.id ? "bg-[#F9F9F9]" : "border-[#F9F9F9]"
                                    }`}
                                    onClick={() => handleClick(draft.id)}
                                >
                                    <h3 className={`${inter.className} font-medium text-sm leading-5 text-meedlBlack`}>
                                        {draft.title}
                                    </h3>
                                    <p className={`${inter.className} font-medium text-sm leading-5 text-[#999999]`}>
                                        Last updated on {draft.lastUpdated}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className={`flex justify-end py-4`}>
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
                ) : (<div><UpdateInvestmentVehicleDraft draftId={selectedId} /></div>)
            }
        </div>

        //
        //     <div className={`md:max-w-sm`} id={`CreateLoanProduct`}>
        //         <TableModal
        //             isOpen={updateInvestmentVehicle}
        //             closeModal={() => setUpdateInvestmentVehicle(false)}
        //             closeOnOverlayClick={true}
        //             icon={Cross2Icon}
        //             headerTitle={`Create loan product`}
        //             width="36%"
        //         >
        //             <UpdateInvestmentVehicleDraft setIsOpen={() => setUpdateInvestmentVehicle(false)} draftId={selectedId} />
        //         </TableModal>
        //     </div>
        //
        // </div>
    );
};

export default Draft;