'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { cabinetGroteskMediumBold, inter } from "@/app/fonts";
import { useRouter } from 'next/navigation';
import { countries } from "countries-list";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

interface DeclarationData {
    isPoliticallyExposedPerson: boolean | null;
    agreedToTerms: boolean;
    politicalPosition?: string;
    relationship?: string;
    country?: string;
}

const Declaration: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<DeclarationData>({
        isPoliticallyExposedPerson: null,
        agreedToTerms: false,
    });
    const [isOpen, setIsOpen] = useState(false);

    const countryOptions = Object.entries(countries).map(([code, {name}]) => ({
        value: code,
        label: name,
    }));

    const handlePEPChange = (value: boolean) => {
        setFormData(prev => ({
            ...prev,
            isPoliticallyExposedPerson: value,
            ...(value === false && {
                politicalPosition: undefined,
                relationship: undefined,
                country: undefined
            })
        }));
    };

    const handleAgreementChange = (checked: boolean | 'indeterminate') => {
        setFormData(prev => ({ ...prev, agreedToTerms: checked === true }));
    };

    const handleFinish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            console.error("Agreement checkbox must be checked to finish.");
            return;
        }
        if (formData.isPoliticallyExposedPerson === null) {
            console.error("Please answer the Politically Exposed Person question.");
            return;
        }
        if (formData.isPoliticallyExposedPerson && (!formData.politicalPosition || !formData.country)) {
            console.error("Please fill in all required PEP fields.");
            return;
        }
        console.log('Declaration Data Submitted:', formData);
        alert('Application Finished! Check console for data.');
    };

    const pepOptions = [
        { id: 'yes', label: 'Yes', value: true },
        { id: 'no', label: 'No', value: false }
    ];

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div id="declarationContainer" className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div id="declarationHeaderContainer" className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 id="declarationTitle" className="text-meedlBlack text-[24px] leading-[120%] font-medium">Declaration</h1>
            </div>
            <form id="declarationForm" onSubmit={handleFinish} className="space-y-8 md:w-[27.5rem] w-full">
                <div id="pepQuestionContainer" className="space-y-4">
                    <Label id="pepQuestionLabel" className="block text-[14px] leading-[150%] font-medium text-black500">
                        Are you or any of your close associates / relatives a Politically Exposed Person?
                    </Label>
                    <div id="pepOptionsContainer" className="flex flex-wrap gap-3">
                        {pepOptions.map((option) => (
                            <button
                                id={`pepOption${option.id}`}
                                key={option.id}
                                type="button"
                                onClick={() => handlePEPChange(option.value)}
                                className={cn(
                                    'rounded-full px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                    formData.isPoliticallyExposedPerson === option.value
                                        ? 'border border-meedlBlue bg-blue50 text-meedlBlue shadow-md'
                                        : 'bg-greyBase200 text-black300 hover:bg-gray-200 border border-gray-300'
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {formData.isPoliticallyExposedPerson === true && (
                        <div id="pepDetailsContainer" className="space-y-4 mt-6">
                            <div id="positionRelationshipContainer" className="grid md:flex gap-4">
                                <div id="politicalPositionWrapper" className="space-y-2">
                                    <Label htmlFor="politicalPosition" id="politicalPositionLabel" className="text-sm font-medium text-labelBlue">
                                        Political position
                                    </Label>
                                    <Input
                                        id="politicalPositionInput"
                                        value={formData.politicalPosition || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, politicalPosition: e.target.value }))}
                                        placeholder="Enter position"
                                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                    />
                                </div>
                                <div id="relationshipWrapper" className="space-y-2">
                                    <Label htmlFor="relationship" id="relationshipLabel" className="text-sm font-medium text-labelBlue">
                                        Relationship (Optional)
                                    </Label>
                                    <Select
                                        value={formData.relationship}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}
                                    >
                                        <SelectTrigger id="relationshipSelect" className="h-[3.375rem]">
                                            <SelectValue id="relationshipSelectValue" placeholder="Select relationship" />
                                        </SelectTrigger>
                                        <SelectContent id="relationshipOptions">
                                            <SelectItem id="relationshipOptionSelf" value="self">Self</SelectItem>
                                            <SelectItem id="relationshipOptionSpouse" value="spouse">Spouse</SelectItem>
                                            <SelectItem id="relationshipOptionSibling" value="sibling">Sibling</SelectItem>
                                            <SelectItem id="relationshipOptionParent" value="parent">Parent</SelectItem>
                                            <SelectItem id="relationshipOptionChild" value="child">Child</SelectItem>
                                            <SelectItem id="relationshipOptionAssociate" value="associate">Associate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div id="countryWrapper" className="space-y-2">
                                <Label htmlFor="country" id="countryLabel" className="text-sm font-medium text-labelBlue">
                                    Country
                                </Label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                                    onOpenChange={(open) => setIsOpen(open)}
                                >
                                    <SelectTrigger id="countrySelect" className="h-[3.375rem]">
                                        <SelectValue id="countrySelectValue" placeholder="Select country" />
                                        {isOpen ? (
                                            <MdKeyboardArrowUp id="countryArrowUp" className="h-6 w-6 text-grey250"/>
                                        ) : (
                                            <MdKeyboardArrowDown id="countryArrowDown" className="h-6 w-6 text-grey250"/>
                                        )}
                                    </SelectTrigger>
                                    <SelectContent id="countryOptions">
                                        {countryOptions.map((option) => (
                                            <SelectItem id={`countryOption${option.value}`} key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </div>

                <div id="termsContainer" className="flex items-start p-3 gap-3 rounded-md pt-4 bg-greyBase200">
                    <Checkbox
                        id="termsCheckbox"
                        checked={formData.agreedToTerms}
                        onCheckedChange={handleAgreementChange}
                        className="data-[state=checked]:bg-[#142854]"
                    />
                    <div id="termsLabelContainer" className="grid gap-1.5 leading-snug">
                        <Label htmlFor="terms" id="termsLabel" className="text-[14px] leading-[150%] font-normal text-gray-700 cursor-pointer">
                            I have read, understood and agree to this{' '}
                            <a id="termsLink" href="/declaration-agreement" target="_blank" rel="noopener noreferrer" className="font-semibold text-meedlBlue underline">
                                Declaration and Agreement
                            </a>
                        </Label>
                    </div>
                </div>

                <div id="buttonContainer" className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">
                    <Button
                        id="backButton"
                        onClick={handleBackClick}
                        variant="outline"
                        type="button"
                        className="w-full md:w-auto h-[3.375rem] order-2 md:order-1"
                    >
                        Back
                    </Button>
                    <Button
                        id="finishButton"
                        type="submit"
                        className="w-full md:w-[81px] h-[3.375rem] bg-meedlBlue hover:bg-meedlBlue text-meedlWhite order-1 md:order-2"
                        disabled={!formData.agreedToTerms || formData.isPoliticallyExposedPerson === null || (formData.isPoliticallyExposedPerson && (!formData.politicalPosition || !formData.country))}
                    >
                        Finish
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Declaration;