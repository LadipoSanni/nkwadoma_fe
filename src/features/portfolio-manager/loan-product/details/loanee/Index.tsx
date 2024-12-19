"use client"
import React, { useState } from "react";

const Loanees = () => {
    const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
    const dropdownOptions = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    const handleCheckboxChange = (insuranceType: string) => {
        setSelectedInsurance(prev =>
            prev === insuranceType ? null : insuranceType
        );
    };

    const handleDropdownChange = (option: string) => {
        console.log(`Selected ${option}`);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="font-bold text-lg">Select Loan Insurance Provider (Optional)</h2>

            <div className="space-y-2">
                {["Credit life insurance provider", "Health insurance provider", "Accommodation provider", "Device provider"].map(
                    (insuranceType, index) => (
                        <div key={index} className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedInsurance === insuranceType}
                                    onChange={() => handleCheckboxChange(insuranceType)}
                                    className="checkbox"
                                />
                                {insuranceType}
                            </label>
                            {/* Conditionally render the dropdown */}
                            {selectedInsurance === insuranceType && (
                                <div className="space-y-2 pl-6">
                                    <select
                                        onChange={e => handleDropdownChange(e.target.value)}
                                        className="border rounded-md p-2 w-full"
                                    >
                                        <option value="" disabled selected>
                                            Select an option
                                        </option>
                                        {dropdownOptions.map((option, idx) => (
                                            <option key={idx} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Loanees;
