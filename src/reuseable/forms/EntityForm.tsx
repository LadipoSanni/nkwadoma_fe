import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover/Index";

interface EntityFormProps {
    entityName: string;
    rcNumber: string;
    country: string | undefined;
    onEntityNameChange: (value: string) => void;
    onRcNumberChange: (value: string) => void;
    onCountryChange: (value: string | undefined) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({
    entityName,
    rcNumber,
    country,
    onEntityNameChange,
    onRcNumberChange,
    onCountryChange,
}) => {
    return (
        <div className="grid gap-5">
            <div id="entityNameContainer" className="grid gap-2">
                <Label htmlFor="entityName" id="entityNameLabel" className="block text-sm font-medium text-labelBlue">
                    Entity name
                </Label>
                <Input
                    id="entityName"
                    value={entityName}
                    onChange={(e) => onEntityNameChange(e.target.value)}
                    placeholder="Enter name"
                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                />
            </div>
            <div id="countryOfIncorporationContainer" className="grid gap-2">
                <Label htmlFor="countryOfIncorporation" id="countryOfIncorporationLabel" className="block text-sm font-medium text-labelBlue">
                    Country of incorporation
                </Label>
                <CountrySelectPopover
                    selectedCountry={country}
                    onCountryChange={onCountryChange}
                    restrictedCountries={["US", "NG"]}
                    disableSearch={true}
                />
            </div>
            <div id="rcNumberContainer" className="grid gap-2">
                <Label htmlFor="rcNumber" id="rcNumberLabel" className="block text-sm font-medium text-labelBlue">
                    RC number
                </Label>
                <Input
                    id="rcNumber"
                    value={rcNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/^rc/i, "RC");
                        onRcNumberChange(value);
                    }}
                    placeholder="Enter RC number"
                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                />
            </div>
        </div>
    );
};

export default EntityForm;
