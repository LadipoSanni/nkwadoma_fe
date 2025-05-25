import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDateRange} from "react-icons/md";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import FileUpload from "../../../reuseable/Input/FileUpload";
import {validateEntityOwnership, validateName} from "@/utils/GlobalMethods";

interface IndividualData {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    relationShip: string,
    ownership: string,
    errorMessage: string,
    entityError: string,

}
const Individual = () => {
    const initialIndividualData = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        relationShip: '',
        ownership: '',
        errorMessage: '',
        entityError: '',

    }

    const [individualData, setIndividualData] = React.useState<IndividualData>(initialIndividualData)

    const handleInputChange = ( field: string, value: string) => {
        setIndividualData((prevState) => (
            { ...prevState, [field]: value }
        ))
    }
    const handleDateSelect = (field: string, date: Date | undefined) => {
        console.log('date: ', date)
        setIndividualData((prev) =>(
                { ...prev, [field]: date ? date.toISOString() : undefined}

        ));
    };

    return (
        <div className="grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor={`firstName-`}>First
                        name</Label>
                    <Input
                        id={`firstName`}
                        name="firstName"
                        placeholder="Enter first name"
                        value={individualData.firstName || ""}
                        onChange={(e) => {
                            const isInputValid = validateName(e.target.value)
                            if (typeof  isInputValid === "string") {
                                setIndividualData((prevState) => (
                                    { ...prevState, ['entityError']: 'firstName' }
                                ))
                                setIndividualData((prevState) => (
                                    { ...prevState, ['errorMessage']: isInputValid }
                                ))

                            }else {
                                setIndividualData((prevState) => (
                                    { ...prevState, ['errorMessage']: '' }
                                ))
                                handleInputChange('firstName', e.target.value)
                            }
                        }}
                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                    />
                    {individualData.entityError === 'firstName' && (
                        <p className="text-red-500 text-sm">{individualData.errorMessage}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`lastName-`}>Last name</Label>
                    <Input
                        // id={`lastName-${section.id}`}
                        name="lastName"
                        placeholder="Enter last name"
                        value={individualData.lastName || ""}
                        onChange={(e) =>
                            handleInputChange( "lastName", e.target.value)
                        }
                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                    />
                    {individualData.entityError === 'lastName' && (
                        <p className="text-red-500 text-sm">{individualData.errorMessage}</p>
                    )}
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
                                  {individualData.dateOfBirth ? new Date(initialIndividualData.dateOfBirth).toLocaleDateString() : "Select date"}
                                <MdOutlineDateRange className="h-5 w-5 text-neutral950"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 shadow-none"
                                        align="start">
                            <Calendar
                                mode="single"
                                selected={individualData.dateOfBirth ? new Date(individualData.dateOfBirth) : undefined}
                                onSelect={(date) => handleDateSelect('dateOfBirth', date)}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                defaultMonth={individualData.dateOfBirth ? new Date(individualData.dateOfBirth) : new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Select
                        onValueChange={(value) => handleInputChange('relationShip', value)}
                        value={individualData.relationShip || ""}
                        // onOpenChange={(open) => setIsOpen({
                        //     ...isOpen,
                        //     [section.id]: open
                        // })}
                    >
                        <SelectTrigger
                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex justify-between items-center"
                        >
                            <SelectValue placeholder="Select relationship"/>
                            {/*{isOpen[section.id] ? (*/}
                            {/*    <MdKeyboardArrowUp*/}
                            {/*        className="h-5 w-5 text-neutral950"/>*/}
                            {/*) : (*/}
                            {/*    <MdKeyboardArrowDown*/}
                            {/*        className="h-5 w-5 text-neutral950"/>*/}
                            {/*)}*/}
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
                <Label
                    // htmlFor={`ownership-${section.id}`}
                >Ownership / Share
                    (%)</Label>
                <Input
                    // id={`ownership-${section.id}`}
                    name="ownership"
                    type="number"
                    max="100"
                    placeholder="0"
                    value={individualData.ownership || ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/^rc/i, 'RC');
                        const isInputValid = validateEntityOwnership(e.target.value)
                        if (typeof  isInputValid === "string") {
                            setIndividualData((prevState) => (
                                { ...prevState, ['entityError']: 'ownership' }
                            ))
                            setIndividualData((prevState) => (
                                { ...prevState, ['errorMessage']: isInputValid }
                            ))
                        }
                        else{
                            setIndividualData((prevState) => (
                                { ...prevState, ['errorMessage']: '' }
                            ))
                            handleInputChange('ownership', value)
                        }
                    }}
                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md w-full md:w-[47%] h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                />
                {individualData.entityError ==='ownership' && (
                    <p className="text-red-500 text-sm">{individualData.errorMessage}</p>
                )}
            </div>
            {/*<div className="space-y-4">*/}
            {/*    <Label>Proof of beneficial ownership</Label>*/}
            {/*    <div className="flex gap-3">*/}
            {/*        {proofOptions.map((option) => (*/}
            {/*            <label*/}
            {/*                key={option.id}*/}
            {/*                className={`rounded-[20px] px-3 py-2 text-[14px] leading-[150%] font-medium bg-blue50 hover:bg-blue50 cursor-pointer ${*/}
            {/*                    section.proofType === option.id*/}
            {/*                        ? "border border-meedlBlue bg-blue50 text-meedlBlue"*/}
            {/*                        : "text-black300"*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                <input*/}
            {/*                    type="radio"*/}
            {/*                    name={`proofType-${section.id}`}*/}
            {/*                    value={option.id}*/}
            {/*                    checked={section.proofType === option.id}*/}
            {/*                    onChange={(e) => handleProofTypeChange(section.id, e.target.value)}*/}
            {/*                    className="hidden"*/}
            {/*                />*/}
            {/*                <span className="text-sm">{option.label}</span>*/}
            {/*            </label>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<FileUpload*/}
            {/*    handleDrop={(e) => handleDrop(section.id, e)}*/}
            {/*    handleDragOver={(e) => e.preventDefault()}*/}
            {/*    setUploadedImageUrl={(url) => handleSetUploadedImageUrl(section.id, url)}*/}
            {/*/>*/}
        </div>

    );
};

export default Individual;