import React, { useState } from 'react';
import { Calendar as CalendarIcon, UploadCloud } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {useRouter} from "next/navigation"
import { cn } from "@/lib/utils";

interface FormData {
    firstName: string;
    lastName: string;
    dob: Date | undefined;
    relationship: string;
    ownership: number;
    proofType: string;
    proofFile: File | null;
}

const IndividualOwnerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        dob: undefined,
        relationship: '',
        ownership: 0,
        proofType: 'national_id',
        proofFile: null,
    });
    const [isDragging, setIsDragging] = useState(false);
    const route = useRouter()

    const handleBackClick = () => {
        route.back()
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = value === '' ? 0 : Math.max(0, parseInt(value, 10));
        if (!isNaN(numValue)) {
            setFormData(prev => ({ ...prev, [name]: numValue }));
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        setFormData(prev => ({ ...prev, dob: date }));
    };

    const handleRelationshipSelect = (value: string) => {
        setFormData(prev => ({ ...prev, relationship: value }));
    };

    const handleProofTypeChange = (value: string) => {
        setFormData(prev => ({ ...prev, proofType: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, proofFile: e.target.files![0] }));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData(prev => ({ ...prev, proofFile: e.dataTransfer.files[0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const proofOptions = [
        { id: 'national_id', label: 'National ID card' },
        { id: 'voters_card', label: "Voter's card" },
        { id: 'drivers_license', label: "Driver's license" }
    ];



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
                            className="h-[3.375rem]"
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
                            className="h-[3.375rem]"
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
                            <SelectTrigger className="h-[3.375rem]">
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
                        min="0"
                        max="100"
                        placeholder="0"
                        value={formData.ownership}
                        onChange={handleNumberInputChange}
                        className="h-[3.375rem]"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <Label>Proof of beneficial ownership</Label>
                    <div className="space-y-2">
                        {proofOptions.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="proofType"
                                    value={option.id}
                                    checked={formData.proofType === option.id}
                                    onChange={(e) => handleProofTypeChange(e.target.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <label
                    htmlFor="file-upload"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <UploadCloud className={cn(
                            "w-8 h-8 mb-3",
                            isDragging ? "text-blue-500" : "text-gray-400"
                        )} />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, PNG or JPG</p>
                        {formData.proofFile && (
                            <p className="text-xs text-green-600 mt-2">
                                Selected: {formData.proofFile.name}
                            </p>
                        )}
                    </div>
                    <input
                        id="file-upload"
                        name="proofFile"
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                    />
                </label>

                <div className={'flex justify-between'}>
                    <Button onClick={handleBackClick} type={'button'}
                            className={'h-[2.813rem] w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md'}>
                        Back
                    </Button>
                    <Button
                        type={'submit'}
                        onClick={() => route.push('/kyc/declaration')}
                        className={'h-[2.8125rem] md:w-[9.3125rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md'}
                    >
                        Save & continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default IndividualOwnerForm;