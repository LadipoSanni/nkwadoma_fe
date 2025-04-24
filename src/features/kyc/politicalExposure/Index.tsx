'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { cabinetGroteskMediumBold, inter } from "@/app/fonts";
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover/Index";
import SuccessDialog from "@/reuseable/modals/SuccessDialog/Index";
import { useAppDispatch } from "@/redux/store";
import { updateDeclaration } from "@/redux/slice/kyc/kycFormSlice";

interface PoliticalExposureData {
    isPoliticallyExposedPerson: boolean | null;
    agreedToTerms: boolean;
    politicalPosition?: string;
    relationship?: string;
    country?: string;
}

const PoliticalExposure: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<PoliticalExposureData>({
        isPoliticallyExposedPerson: true,
        agreedToTerms: false,
        politicalPosition: '',
        relationship: '',
        country: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(formData.country);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCountry) {
            setFormData(prev => ({
                ...prev,
                country: selectedCountry
            }));
        }
    }, [selectedCountry]);

    const handlePEPChange = (value: boolean) => {
        setFormData(prev => ({
            ...prev,
            isPoliticallyExposedPerson: value
        }));
        
        setErrorMessage(null);
    };

    const handleAgreementChange = (checked: boolean | 'indeterminate') => {
        setFormData(prev => ({ ...prev, agreedToTerms: checked === true }));
        setErrorMessage(null);
    };

    const handleFinish = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.agreedToTerms) {
            setErrorMessage("You must agree to the terms to proceed.");
            return;
        }
        if (formData.isPoliticallyExposedPerson === null) {
            setErrorMessage("Please answer the Politically Exposed Person question.");
            return;
        }
        
        if (formData.isPoliticallyExposedPerson && (!formData.politicalPosition || !formData.country)) {
            setErrorMessage("Please fill in all required PEP fields.");
            return;
        }

        const dataToSubmit = {
            ...formData,
            ...(formData.isPoliticallyExposedPerson === false && {
                politicalPosition: undefined,
                relationship: undefined,
                country: undefined
            })
        };

        dispatch(updateDeclaration(dataToSubmit));
        setShowSuccessDialog(true);
    };

    const handleSuccessDialogContinue = () => {
        setShowSuccessDialog(false);
        router.push('/Overview');
    };

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setFormData(prev => ({ ...prev, country: value }));
    };

    const pepOptions = [
        { id: 'yes', label: 'Yes', value: true },
        { id: 'no', label: 'No', value: false }
    ];

    const isFormValid =
        formData.agreedToTerms &&
        formData.isPoliticallyExposedPerson !== null &&
        (!formData.isPoliticallyExposedPerson || (
            formData.politicalPosition && 
            formData.country
        ));

    return (
        <div id="declarationContainer" className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div id="declarationHeaderContainer" className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 id="declarationTitle" className="text-meedlBlack text-[24px] leading-[120%] font-medium">Political exposure</h1>
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
                                    'rounded-full px-6 py-2 text-sm font-medium transition-colors shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                    formData.isPoliticallyExposedPerson === option.value
                                        ? 'border border-meedlBlue bg-blue50 text-meedlBlue'
                                        : 'bg-greyBase200 text-black300 hover:bg-gray-200 border border-gray-300'
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {formData.isPoliticallyExposedPerson === true && (
                        <div id="pepDetailsContainer" className="space-y-4 mt-6">
                            <div id="positionRelationshipContainer" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div id="politicalPositionWrapper" className="space-y-2">
                                    <Label htmlFor="politicalPosition" id="politicalPositionLabel" className="text-sm font-medium text-labelBlue">
                                        Political position
                                    </Label>
                                    <Input
                                        id="politicalPositionInput"
                                        value={formData.politicalPosition || ''}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            politicalPosition: e.target.value
                                        }))}
                                        placeholder="Enter position"
                                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md  h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                    />
                                </div>
                                <div id="relationshipWrapper" className="space-y-2">
                                    <Label htmlFor="relationship" id="relationshipLabel" className="text-sm font-medium text-labelBlue">
                                        Relationship (Optional)
                                    </Label>
                                    <Select
                                        value={formData.relationship}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}
                                        onOpenChange={(open) => setIsOpen(open)}
                                    >
                                        <SelectTrigger
                                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex justify-between items-center"
                                        >
                                            <SelectValue placeholder="Select relationship" />
                                            {isOpen ? (
                                                <MdKeyboardArrowUp className="h-5 w-5 text-neutral950" />
                                            ) : (
                                                <MdKeyboardArrowDown className="h-5 w-5 text-neutral950" />
                                            )}
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="father">Father</SelectItem>
                                            <SelectItem value="mother">Mother</SelectItem>
                                            <SelectItem value="brother">Brother</SelectItem>
                                            <SelectItem value="sister">Sister</SelectItem>
                                            <SelectItem value="friend">Friend</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div id="countryWrapper" className="space-y-2">
                                <Label htmlFor="country" id="countryLabel" className="text-sm font-medium text-labelBlue">
                                    Country
                                </Label>
                                <CountrySelectPopover
                                    selectedCountry={selectedCountry}
                                    onCountryChange={handleCountryChange}
                                />
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

                {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <div id="buttonContainer" className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">
                    <Button
                        id="backButton"
                        onClick={() => router.back()}
                        variant="outline"
                        type="button"
                        className="h-[2.813rem] w-full md:w-[4.625rem] order-2 md:order-1"
                    >
                        Back
                    </Button>
                    <Button
                        id="finishButton"
                        type="submit"
                        className={cn(
                            "w-full md:w-[81px] h-[2.8125rem] text-meedlWhite order-1 md:order-2",
                            isFormValid
                                ? "bg-meedlBlue hover:bg-meedlBlue"
                                : "bg-blue550 hover:bg-blue550 cursor-not-allowed"
                        )}
                        disabled={!isFormValid}
                    >
                        Finish
                    </Button>
                </div>
            </form>

            <SuccessDialog
                open={showSuccessDialog}
                onClose={() => setShowSuccessDialog(false)}
                onContinue={handleSuccessDialogContinue}
                title="Verification successful"
                message="Congratulations! You've successfully completed the KYC verification process"
                buttonText="Go to overview"
            />
        </div>
    );
};

export default PoliticalExposure;