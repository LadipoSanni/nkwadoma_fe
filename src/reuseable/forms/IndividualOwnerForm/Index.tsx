import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import FileUpload from "@/reuseable/Input/FileUpload";
import { useRouter } from "next/navigation";

interface FormData {
    firstName: string;
    lastName: string;
    dob: Date | undefined;
    relationship: string;
    ownership: number | string;
    proofType: string;
    proofFile: File | null;
}

const IndividualOwnerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        dob: undefined,
        relationship: '',
        ownership: '',
        proofType: 'national_id',
        proofFile: null,
    });
    const route = useRouter();

    const handleBackClick = () => {
        route.back();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const sanitizedValue = value.replace(/^0+(?=\d)/, '');

        setFormData((prev) => ({
            ...prev,
            [name]: sanitizedValue, // Keep it as a string
        }));
    };
    const handleDateSelect = (date: Date | undefined) => {
        setFormData((prev) => ({ ...prev, dob: date }));
    };

    const handleRelationshipSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, relationship: value }));
    };

    const handleProofTypeChange = (value: string) => {
        setFormData((prev) => ({ ...prev, proofType: value }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData((prev) => ({ ...prev, proofFile: e.dataTransfer.files[0] }));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const setUploadedImageUrl = (url: string | null) => {
        console.log("Uploaded file URL:", url);
    };

    const proofOptions = [
        { id: 'national_id', label: 'National ID card' },
        { id: 'voters_card', label: "Voter's card" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="w-full h-[calc(100vh-400px)] overflow-y-auto pr-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Date of birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full h-[3.375rem] justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.dob ? formData.dob.toLocaleDateString() : "Select date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.dob}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Select onValueChange={handleRelationshipSelect} value={formData.relationship}>
                            <SelectTrigger className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650">
                                <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="business_partner">Business Partner</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ownership">Ownership / Share (%)</Label>
                    <Input
                        id="ownership"
                        name="ownership"
                        type="number"
                        max="100"
                        placeholder="0"
                        value={formData.ownership}
                        onChange={handleNumberInputChange}
                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md w-full md:w-[47%] h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <Label>Proof of beneficial ownership</Label>
                    <div className="flex gap-3">
                        {proofOptions.map((option) => (
                            <label
                                key={option.id}
                                className={`rounded-[20px] px-3 py-2 text-[14px] leading-[150%] font-medium bg-blue50 hover:bg-blue50 cursor-pointer
                ${formData.proofType === option.id ? 'border border-meedlBlue bg-blue50 text-meedlBlue' : 'text-black300'}`}
                            >
                                <input
                                    type="radio"
                                    name="proofType"
                                    value={option.id}
                                    checked={formData.proofType === option.id}
                                    onChange={(e) => handleProofTypeChange(e.target.value)}
                                    className="hidden"
                                />
                                <span className="text-sm">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <FileUpload
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver}
                    setUploadedImageUrl={setUploadedImageUrl}
                />

                <div className="flex justify-between">
                    <Button
                        onClick={handleBackClick}
                        type="button"
                        className="h-[2.813rem] w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md"
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        onClick={() => route.push('/kyc/declaration')}
                        className="h-[2.8125rem] md:w-[9.3125rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md"
                    >
                        Save & continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default IndividualOwnerForm;