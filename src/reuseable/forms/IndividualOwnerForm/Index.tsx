import React, {useMemo, useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import FileUpload from "@/reuseable/Input/FileUpload";
import { MdOutlineDateRange, MdKeyboardArrowUp, MdKeyboardArrowDown, MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useRouter } from "next/navigation";

interface FormSection {
    id: number;
    firstName: string;
    lastName: string;
    dob: Date | undefined;
    relationship: string;
    ownership: string;
    proofType: string;
    proofFile: File | null;
}

const IndividualOwnerForm: React.FC = () => {
    const [sections, setSections] = useState<FormSection[]>([{
        id: Date.now(),
        firstName: '',
        lastName: '',
        dob: undefined,
        relationship: '',
        ownership: '',
        proofType: 'national_id',
        proofFile: null,
    }]);
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
    const route = useRouter();

    const proofOptions = [
        { id: 'national_id', label: 'National ID card' },
        { id: 'voters_card', label: "Voter's card" },
    ];

    const isFormValid = useMemo(() => {
        return sections.every(section => {
            const ownershipValue = parseFloat(section.ownership);
            const valid =
                section.firstName.trim() !== '' &&
                section.lastName.trim() !== '' &&
                section.dob !== undefined &&
                section.relationship !== '' &&
                section.ownership.trim() !== '' &&
                !isNaN(ownershipValue) &&
                ownershipValue > 0 &&
                ownershipValue <= 100 &&
                section.proofType !== '' &&
                section.proofFile !== null;
            return valid;
        });
    }, [sections]);

    const handleBackClick = () => {
        route.back();
    };

    const handleAddSection = () => {
        setSections(prev => [...prev, {
            id: Date.now(),
            firstName: '',
            lastName: '',
            dob: undefined,
            relationship: '',
            ownership: '',
            proofType: 'national_id',
            proofFile: null,
        }]);
    };

    const handleDeleteSection = (id: number) => {
        setSections(prev => prev.filter(section => section.id !== id));
    };

    const handleInputChange = (id: number, name: string, value: string) => {
        setSections(prev => prev.map(section =>
            section.id === id ? { ...section, [name]: value } : section
        ));
    };

    const handleDateSelect = (id: number, date: Date | undefined) => {
        setSections(prev => prev.map(section =>
            section.id === id ? { ...section, dob: date } : section
        ));
    };

    const handleRelationshipSelect = (id: number, value: string) => {
        setSections(prev => prev.map(section =>
            section.id === id ? { ...section, relationship: value } : section
        ));
    };

    const handleProofTypeChange = (id: number, value: string) => {
        setSections(prev => prev.map(section =>
            section.id === id ? { ...section, proofType: value } : section
        ));
    };

    const handleDrop = (id: number, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
            setSections(prev => prev.map(section =>
                section.id === id ? { ...section, proofFile: file } : section
            ));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            route.push('/kyc/declaration');
        }
    };

    return (
        <div className="w-full h-[calc(100vh-300px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {sections.map((section, index) => (
                    <section key={section.id} className={'grid gap-5 p-5 rounded-md border-[0.5px] border-lightBlue250 relative'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor={`firstName-${section.id}`}>First name</Label>
                                <Input
                                    id={`firstName-${section.id}`}
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={section.firstName}
                                    onChange={(e) => handleInputChange(section.id, 'firstName', e.target.value)}
                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`lastName-${section.id}`}>Last name</Label>
                                <Input
                                    id={`lastName-${section.id}`}
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={section.lastName}
                                    onChange={(e) => handleInputChange(section.id, 'lastName', e.target.value)}
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
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full h-[3.375rem] border border-solid border-neutral650 flex justify-between items-center font-normal focus:outline-none focus:ring-0"
                                        >
                                            <span>{section.dob ? section.dob.toLocaleDateString() : "Select date"}</span>
                                            <MdOutlineDateRange className="h-5 w-5 text-neutral950"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 shadow-none" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={section.dob}
                                            onSelect={(date) => handleDateSelect(section.id, date)}
                                            disabled={(date) => date > new Date()}
                                            initialFocus
                                            defaultMonth={section.dob || new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>Relationship</Label>
                                <Select
                                    onValueChange={(value) => handleRelationshipSelect(section.id, value)}
                                    value={section.relationship}
                                    onOpenChange={(open) => setIsOpen({ ...isOpen, [section.id]: open })}
                                >
                                    <SelectTrigger className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex justify-between items-center">
                                        <SelectValue placeholder="Select relationship"/>
                                        {isOpen[section.id] ? (
                                            <MdKeyboardArrowUp className="h-5 w-5 text-neutral950"/>
                                        ) : (
                                            <MdKeyboardArrowDown className="h-5 w-5 text-neutral950"/>
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

                        <div className="space-y-2">
                            <Label htmlFor={`ownership-${section.id}`}>Ownership / Share (%)</Label>
                            <Input
                                id={`ownership-${section.id}`}
                                name="ownership"
                                type="number"
                                max="100"
                                placeholder="0"
                                value={section.ownership}
                                onChange={(e) => handleInputChange(section.id, 'ownership', e.target.value)}
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
                                        ${section.proofType === option.id ? 'border border-meedlBlue bg-blue50 text-meedlBlue' : 'text-black300'}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`proofType-${section.id}`}
                                            value={option.id}
                                            checked={section.proofType === option.id}
                                            onChange={(e) => handleProofTypeChange(section.id, e.target.value)}
                                            className="hidden"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <FileUpload
                            handleDrop={(e) => handleDrop(section.id, e)}
                            handleDragOver={(e) => e.preventDefault()}
                            setUploadedImageUrl={() => {}}
                        />

                        {index > 0 && (
                            <div className={'flex justify-end'}>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="bg-greyBase200 py-1 px-2 hover:bg-greyBase200 flex rounded-md gap-1 h-[1.8125rem] w-[5.25rem]"
                                >
                                    <MdDeleteOutline className="text-error450 h-5 w-5"/>
                                    <span className={'text-error450 text-[14px] leading-[150%] font-medium'}>Delete</span>
                                </button>
                            </div>
                        )}
                    </section>
                ))}

                <div className={'sticky bottom-0 bg-white p-4'}>
                    <div className="flex items-center gap-1 mb-4">
                        <Button
                            onClick={handleAddSection}
                            type="button"
                            className="flex items-center gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
                        >
                            <MdAdd className="text-meedlBlue h-5 w-5"/>
                            <span className={'font-semibold text-[14px] leading-[150%]'}>Add</span>
                        </Button>
                    </div>

                    <div className="md:flex grid gap-4 justify-between">
                        <Button
                            onClick={handleBackClick}
                            type="button"
                            className="h-[2.813rem] w-full md:w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md order-2 md:order-1"
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className={`h-[2.8125rem] w-full md:w-[9.3125rem] px-4 py-2 ${
                                !isFormValid
                                    ? 'bg-blue550 hover:bg-blue550 cursor-not-allowed opacity-50'
                                    : 'bg-meedlBlue hover:bg-meedlBlue'
                            } text-white rounded-md order-1 md:order-2`}
                        >
                            Save & continue
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default IndividualOwnerForm;