'use client';
import React, {useState, useEffect} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import CountrySelectPopover from '@/reuseable/select/countrySelectPopover/Index';
import {MdAdd, MdDeleteOutline, MdOutlineDateRange, MdKeyboardArrowUp, MdKeyboardArrowDown} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {updateBeneficialOwner} from "@/redux/slice/kyc/kycFormSlice";
import FileUpload from "@/reuseable/Input/FileUpload";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";

interface BaseSection {
    id: number;
}

interface EntitySection extends BaseSection {
    entityName: string;
    rcNumber: string;
    country: string | undefined;
}

interface Section extends EntitySection {
    firstName?: string;
    lastName?: string;
    dob?: Date | string;
    relationship?: string;
    entityOwnership?: string;
    individualOwnership?: string;
    proofType?: string;
    proofFile?: File | null;
    proofFileUrl?: string;
    errors: {
        rcNumber?: string;
        entityName?: string;
        firstName?: string;
        lastName?: string;
        ownership?: string;
    };
}

type FormSection = Partial<Section>;

const BeneficialOwnerStep = () => {
    const dispatch = useDispatch();
    const {
        entityData,
        individualData,
        selectedForm: storedSelectedForm
    } = useSelector((state: RootState) => state.kycForm.beneficialOwner);

    const [selectedForm, setSelectedForm] = useState<"entity" | "individual">(storedSelectedForm || "entity");
    const [entityName] = useState(entityData.entityName || "");
    const [rcNumber] = useState(entityData.rcNumber || "");
    const [selectedCountry] = useState<string | undefined>(entityData.country);
    const [sections, setSections] = useState<Section[]>(
        (selectedForm === "entity" ? (entityData.sections || []) : (individualData.sections || [])) as Section[]
    );
    const [sectionTypes, setSectionTypes] = useState<{ [key: number]: "entity" | "individual" }>({});
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
    const [disabledContinueButton, setDisabledContinueButton] = useState(true);
    // const [error, setError] = useState("");

    const validateRcNumber = (rcNumber: string) => {
        // const rcNumberRegex = /^\d{7}$/i;
        if(/^[a-zA-Z]+$/.test(rcNumber)){
            return "RC Number can not  contain  letters";
        }
        return undefined
        // return rcNumberRegex.test(rcNumber) ? undefined : "RC Number must start with 7 digits";
    };

    const validateEntityName = (name: string) => {
        if (/^[^a-zA-Z0-9&]/.test(name)) {
            return "Entity name cannot start with a special character";
        }

        if (/[^a-zA-Z0-9&\s]/.test(name)) {
            return "Entity name can only contain '&' as a special character";
        }
        if(/^\d+$/.test(name)){
            return "Entity name can not  contain only digits";
        }

        return undefined;
    };

    const validatePersonName = (name: string) => {
        if (/\d/.test(name)) {
            return "Name cannot contain numbers";
        }

        return undefined;
    };

    const validateTotalOwnership = (sections: Section[]) => {
        const array: number[] = [] ;
        sections?.filter(section=> array?.push(Number(section?.entityOwnership)) )
        const initial = 0
        const totalEntityOwnershipss = array.reduce((sum, currentValue) => sum + currentValue, initial)
        if (totalEntityOwnershipss > 100) {
            return 'Total entity ownership must be exactly 100%'
        }
        return undefined;
    };

    const calculateTotalOwnership = (sections: Section[]) => {
        const array: number[] = [] ;
        sections?.filter(section=> array?.push(Number(section?.entityOwnership)) )
        const initial = 0
        const totalEntityOwnerships = array.reduce((sum, currentValue) => sum + currentValue, initial)
        return totalEntityOwnerships;
    }
    useEffect(() => {
        if (selectedForm === "entity") {
            const entitySections = entityData.sections || [];
            if (entitySections.length === 0) {
                const newSectionId = Date.now();
                const rcNumber = entityData.rcNumber || "";
                setSections([{
                    id: newSectionId,
                    entityName: entityData.entityName || "",
                    rcNumber: rcNumber,
                    country: entityData.country,
                    entityOwnership: "",
                    proofType: "national_id",
                    proofFile: null,
                    proofFileUrl: undefined,
                    errors: {
                        rcNumber: rcNumber ? validateRcNumber(rcNumber) : undefined
                    }
                }]);
                setSectionTypes(prev => ({
                    ...prev,
                    [newSectionId]: "entity"
                }));
            } else {
                const validatedSections = entitySections.map((section: EntitySection) => ({
                    ...section,
                    errors: {
                        rcNumber: section.rcNumber ? validateRcNumber(section.rcNumber) : undefined
                    }
                }));
                setSections(validatedSections);
            }
        } else {
            const individualSections = individualData.sections || [];
            if (individualSections.length === 0) {
                const entitySections = entityData.sections || [];
                const entityInfo = entitySections.length > 0 ? entitySections[0] : null;
                const rcNumber = entityInfo?.rcNumber || entityData.rcNumber || "";

                const newSectionId = Date.now();
                setSections([{
                    id: newSectionId,
                    entityName: entityInfo?.entityName || entityData.entityName || "",
                    rcNumber: rcNumber,
                    country: entityInfo?.country || entityData.country,
                    firstName: "",
                    lastName: "",
                    dob: new Date().toISOString(),
                    relationship: "",
                    individualOwnership: "", 
                    proofType: "national_id",
                    proofFile: null,
                    proofFileUrl: undefined,
                    errors: {
                        rcNumber: rcNumber ? validateRcNumber(rcNumber) : undefined
                    }
                }]);
                setSectionTypes(prev => ({
                    ...prev,
                    [newSectionId]: "individual"
                }));
            } else {
                const validatedSections = individualSections.map((section: FormSection): Section => ({
                    ...section,
                    id: section.id || Date.now(),
                    entityName: section.entityName || "",
                    rcNumber: section.rcNumber || "",
                    country: section.country,
                    errors: {
                        ...section.errors,
                        rcNumber: section.rcNumber ? validateRcNumber(section.rcNumber) : undefined
                    }
                }));
                setSections(validatedSections);
            }
        }
    }, [selectedForm, entityData.sections, individualData.sections, entityData.entityName, entityData.rcNumber, entityData.country]);

    const proofOptions = [
        {id: "national_id", label: "National ID card"},
        {id: "voters_card", label: "Voter's card"},
    ];

    const router = useRouter();


    const handleBackClick = () => {
        router.back();
    };

    const handleAddSection = () => {
        const newSectionId = Date.now();
        setSections((prev) => [
            ...prev,
            {
                id: newSectionId,
                entityName: "",
                rcNumber: "",
                country: undefined,
                firstName: "",
                lastName: "",
                dob: undefined,
                relationship: "",
                entityOwnership: "",
                individualOwnership: "",
                proofType: "national_id",
                proofFile: null,
                proofFileUrl: undefined,
                errors: {
                    rcNumber: undefined
                }
            },
        ]);
        setSectionTypes((prev) => ({
            ...prev,
            [newSectionId]: selectedForm
        }));
    };

    const handleDeleteSection = (id: number) => {
        setSections((prev) => prev.filter((section) => section.id !== id));
        setSectionTypes((prev) => {
            const newTypes = {...prev};
            delete newTypes[id];
            return newTypes;
        });
    };

    const handleSectionTypeChange = (id: number, type: "entity" | "individual") => {
        setSectionTypes((prev) => ({
            ...prev,
            [id]: type
        }));
    };

    const handleInputChange = (id: number, field: string, value: string) => {
        console.log('id: ', id, 'field: ', field, 'value: ', value)
        setSections((prev) => {
            const updatedSections = prev.map((section) => {
                if (section.id === id) {
                    let updatedSection = { ...section, [field]: '' };

                    // Validate specific fields
                    if (field === "rcNumber") {
                        if(validateRcNumber(value) === undefined){
                            updatedSection = { ...section, [field]: value };
                            updatedSection.errors = {
                                ...updatedSection.errors,
                                rcNumber: ''
                            };
                        }else{
                            updatedSection.errors = {
                                ...updatedSection.errors,
                                rcNumber: validateRcNumber(value)
                            };
                        }
                    }
                    if (field === "entityName") {
                        console.log('entity name')
                       if(validateEntityName(value) === undefined) {
                           updatedSection = { ...section, [field]: value };
                           updatedSection.errors = {
                               ...updatedSection.errors,
                               entityName: ''
                           };
                       }else{
                           updatedSection.errors = {
                               ...updatedSection.errors,
                               entityName: validateEntityName(value)
                           };
                       }
                    }
                    if (field === "firstName") {
                        console.log('first name')
                        updatedSection.errors = {
                            ...updatedSection.errors,
                            firstName: validatePersonName(value)
                        };
                    }
                    if (field === "lastName") {
                        updatedSection.errors = {
                            ...updatedSection.errors,
                            lastName: validatePersonName(value)
                        };
                    }
                    if(field === 'country'){
                        updatedSection = { ...section, [field]: value };
                    }
                    if (field === "entityOwnership" || field === "individualOwnership") {
                        console.log('ownership')
                        // Validate that ownership is a number between 0 and 100
                        const numValue = parseFloat(value);

                        let ownershipError;
                        const totalOwnerShipEntered = calculateTotalOwnership(prev)
                        if (isNaN(numValue)) {
                            ownershipError = "Ownership must be a number";
                        } else if (numValue < 0 || numValue > 100) {
                            ownershipError = "Ownership must be between 0 and 100";
                        }
                        else if(numValue + totalOwnerShipEntered > 100 ) {
                            ownershipError = "Total ownership must be  100%";
                        }
                        updatedSection.errors = {
                            ...updatedSection.errors,
                            ownership: ownershipError
                        };
                    }


                    return updatedSection;
                }
                return section;
            });

            // Validate total ownership across all sections
            const ownershipError = validateTotalOwnership(updatedSections);
            if (ownershipError) {
                // Update all sections with the ownership error
                return updatedSections.map(section => ({
                    ...section,
                    errors: {
                        ...section.errors,
                        ownership: ownershipError
                    }
                }));
            }

            return updatedSections;
        });
    };

    const handleDateSelect = (id: number, date: Date | undefined) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id ? {...section, dob: date ? date.toISOString() : undefined} : section
            )
        );
    };

    const handleRelationshipSelect = (id: number, value: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id ? {...section, relationship: value} : section
            )
        );
    };

    const handleProofTypeChange = (id: number, value: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id ? {...section, proofType: value} : section
            )
        );
    };

    const handleDrop = (id: number, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        setSections((prev) =>
            prev.map((section) =>
                section.id === id ? {...section, proofFile: file || null} : section
            )
        );
    };

    const handleSetUploadedImageUrl = (id: number, url: string | null) => {
        if (url) {
            setSections((prev) =>
                prev.map((section) =>
                    section.id === id ? {...section, proofFileUrl: url} : section
                )
            );
        }
    };

    const handleSaveAndContinue = () => {
        let hasErrors = false;
        const validatedSections = sections.map(section => {
            const sectionType = sectionTypes[section.id] || "entity";
            const ownership = sectionType === "entity" ? section.entityOwnership : section.individualOwnership;

            const rcNumberError = validateRcNumber(section.rcNumber);
            const entityNameError = validateEntityName(section.entityName);

            let firstNameError, lastNameError;
            if (sectionType === "individual") {
                firstNameError = validatePersonName(section.firstName || "");
                lastNameError = validatePersonName(section.lastName || "");
            }

            // const numOwnership = ownership ? parseFloat(ownership) : 0;
            // let ownershipError;

            // if (isNaN(numOwnership)) {
            //     ownershipError = "Ownership must be a number";
            // } else if (numOwnership < 0 || numOwnership > 100) {
            //     ownershipError = "Ownership must be between 0 and 100";
            // }

            if (rcNumberError || entityNameError || firstNameError || lastNameError || ownershipError) {
                hasErrors = true;
            }

            return {
                ...section,
                type: sectionType,
                firstName: section.firstName || "",
                lastName: section.lastName || "",
                relationship: section.relationship || "",
                proofType: section.proofType || "",
                entityOwnership: section.entityOwnership || "",
                individualOwnership: section.individualOwnership || "",
                ownership: ownership || "", 
                proofFile: section.proofFile || null,
                dob: section.dob instanceof Date ? section.dob.toISOString() : section.dob,
                errors: {
                    rcNumber: rcNumberError,
                    entityName: entityNameError,
                    firstName: firstNameError,
                    lastName: lastNameError,
                    ownership: ownershipError
                }
            };
        });

        const ownershipError = validateTotalOwnership(validatedSections);
        if (ownershipError) {
            hasErrors = true;
            validatedSections.forEach(section => {
                section.errors.ownership = ownershipError;
            });
        }

        setSections(validatedSections);

        if (hasErrors) {
            return;
        }

        if (selectedForm === "entity") {
            dispatch(
                updateBeneficialOwner({
                    selectedForm: "entity",
                    entityData: {
                        entityName,
                        rcNumber,
                        country: selectedCountry,
                        sections: validatedSections
                    }
                })
            );
        } else {
            dispatch(
                updateBeneficialOwner({
                    selectedForm: "individual",
                    individualData: {
                        sections: validatedSections
                    }
                })
            );
        }

        router.push('/kyc/political-exposure');
    };

    return (
        <main id="beneficialOwnerStepMain" className={`${inter.className} w-full xl:px-48 grid-cols-1 gap-y-5 grid`}>
            <div id="beneficialOwnerHeader"
                 className={`${cabinetGroteskMediumBold.className} max-w-[30rem] md:mx-auto w-full`}>
                <h1 id="beneficialOwnerTitle"
                    className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <section id="beneficialOwnerSection"
                     className={'md:max-w-[30rem] w-full md:mx-auto h-[calc(100vh-250px)] pt-1 overflow-y-auto pr-3'}>
                <Tabs
                    id="beneficialOwnerTabs"
                    value={selectedForm}
                    onValueChange={(value) => {
                        const newValue = value as "entity" | "individual";
                        setSelectedForm(newValue);
                        dispatch(updateBeneficialOwner({selectedForm: newValue}));
                    }}
                    className={'grid gap-7'}
                >
                    <TabsContent id="entityTabContent" value="entity">
                        <main id="entityFormMain" className="grid gap-6">
                            {sections.map((section) => (
                                <section key={section.id} className={'relative grid mt-6'}>
                                    <Tabs
                                        id={`beneficialOwnerTabs-${section.id}`}
                                        value={sectionTypes[section.id] || "entity"}
                                        onValueChange={(value) => handleSectionTypeChange(section.id, value as "entity" | "individual")}
                                        className={'grid gap-7'}
                                    >
                                        <TabsList id={`beneficialOwnerTabsList-${section.id}`}
                                                className="flex gap-3 bg-transparent p-0 justify-start">
                                            <TabsTrigger
                                                id={`entityTabTrigger-${section.id}`}
                                                value="entity"
                                                className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-grey250"
                                            >
                                                Entity
                                            </TabsTrigger>
                                            <TabsTrigger
                                                id={`individualTabTrigger-${section.id}`}
                                                value="individual"
                                                className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-grey250"
                                            >
                                                Individual
                                            </TabsTrigger>
                                        </TabsList>
                                        <section
                                            className="grid p-5 gap-5 border rounded-md border-lightBlue250 relative">
                                            <TabsContent id={`entityTabContent-${section.id}`} value="entity">
                                                <div className="grid gap-5">
                                                    <div id="entityNameContainer" className="grid gap-2">
                                                        <Label htmlFor={`entityName-${section.id}`}
                                                            className="block text-sm font-medium text-labelBlue">
                                                            Entity name
                                                        </Label>
                                                        <Input
                                                            id={`entityName-${section.id}`}
                                                            value={section.entityName}
                                                            onChange={(e) => handleInputChange(section.id, "entityName", e.target.value)}
                                                            placeholder="Enter name"
                                                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                        />
                                                        {section.errors?.entityName && (
                                                            <p className="text-red-500 text-sm">{section.errors.entityName}</p>
                                                        )}
                                                    </div>
                                                    <div id="countryOfIncorporationContainer" className="grid gap-2">
                                                        <Label htmlFor={`country-${section.id}`}
                                                            className="block text-sm font-medium text-labelBlue">
                                                            Country of incorporation
                                                        </Label>
                                                        <CountrySelectPopover
                                                            selectedCountry={section.country}
                                                            onCountryChange={(value) => handleInputChange(section.id, "country", value)}
                                                            restrictedCountries={["US", "NG"]}
                                                            disableSearch={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <div id="rcNumberContainer" className="md:flex grid gap-4 md:gap-5">
                                                            <div className="grid gap-2">
                                                                <Label htmlFor={`rcNumber-${section.id}`}
                                                                    className="block text-sm font-medium text-labelBlue">
                                                                    RC number
                                                                </Label>
                                                                <Input
                                                                    id={`rcNumber-${section.id}`}
                                                                    value={section.rcNumber}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.replace(/^rc/i, 'RC');
                                                                        handleInputChange(section.id, "rcNumber", value);
                                                                    }}
                                                                    placeholder="Enter RC number"
                                                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                                />
                                                                {section.errors?.rcNumber && (
                                                                    <p className="text-red-500 text-sm">{section.errors.rcNumber}</p>
                                                                )}
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor={`ownership-${section.id}`}>
                                                                    Ownership/Share(%)
                                                                </Label>
                                                                <input
                                                                    id={`ownership-${section.id}`}
                                                                    name="ownership"
                                                                    type="number"
                                                                    max="100"
                                                                    placeholder="0"
                                                                    value={section.entityOwnership || ""}
                                                                    onChange={(e) => handleInputChange(section.id, "entityOwnership", e.target.value)}
                                                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                                />
                                                                {section.errors?.ownership && (
                                                                    <p className="text-red-500 text-sm">{section.errors.ownership}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                            <TabsContent id={`individualTabContent-${section.id}`} value="individual">
                                                <div className="grid gap-5">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`firstName-${section.id}`}>First
                                                                name</Label>
                                                            <Input
                                                                id={`firstName-${section.id}`}
                                                                name="firstName"
                                                                placeholder="Enter first name"
                                                                value={section.firstName || ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(section.id, "firstName", e.target.value)
                                                                }
                                                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                            />
                                                            {section.errors?.firstName && (
                                                                <p className="text-red-500 text-sm">{section.errors.firstName}</p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`lastName-${section.id}`}>Last name</Label>
                                                            <Input
                                                                id={`lastName-${section.id}`}
                                                                name="lastName"
                                                                placeholder="Enter last name"
                                                                value={section.lastName || ""}
                                                                onChange={(e) =>
                                                                    handleInputChange(section.id, "lastName", e.target.value)
                                                                }
                                                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                            />
                                                            {section.errors?.lastName && (
                                                                <p className="text-red-500 text-sm">{section.errors.lastName}</p>
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
                                                                            <span>
                                                                                {section.dob ? new Date(section.dob).toLocaleDateString() : "Select date"}
                                                                            </span>
                                                                        <MdOutlineDateRange
                                                                            className="h-5 w-5 text-neutral950"/>
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0 shadow-none"
                                                                                align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={section.dob ? new Date(section.dob) : undefined}
                                                                        onSelect={(date) => handleDateSelect(section.id, date)}
                                                                        disabled={(date) => date > new Date()}
                                                                        initialFocus
                                                                        defaultMonth={section.dob ? new Date(section.dob) : new Date()}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Relationship</Label>
                                                            <Select
                                                                onValueChange={(value) => handleRelationshipSelect(section.id, value)}
                                                                value={section.relationship || ""}
                                                                onOpenChange={(open) => setIsOpen({
                                                                    ...isOpen,
                                                                    [section.id]: open
                                                                })}
                                                            >
                                                                <SelectTrigger
                                                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex justify-between items-center"
                                                                >
                                                                    <SelectValue placeholder="Select relationship"/>
                                                                    {isOpen[section.id] ? (
                                                                        <MdKeyboardArrowUp
                                                                            className="h-5 w-5 text-neutral950"/>
                                                                    ) : (
                                                                        <MdKeyboardArrowDown
                                                                            className="h-5 w-5 text-neutral950"/>
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
                                                        <Label htmlFor={`ownership-${section.id}`}>Ownership / Share
                                                            (%)</Label>
                                                        <Input
                                                            id={`ownership-${section.id}`}
                                                            name="ownership"
                                                            type="number"
                                                            max="100"
                                                            placeholder="0"
                                                            value={section.individualOwnership || ""}
                                                            onChange={(e) => handleInputChange(section.id, "individualOwnership", e.target.value)}
                                                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md w-full md:w-[47%] h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                                        />
                                                        {section.errors?.ownership && (
                                                            <p className="text-red-500 text-sm">{section.errors.ownership}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-4">
                                                        <Label>Proof of beneficial ownership</Label>
                                                        <div className="flex gap-3">
                                                            {proofOptions.map((option) => (
                                                                <label
                                                                    key={option.id}
                                                                    className={`rounded-[20px] px-3 py-2 text-[14px] leading-[150%] font-medium bg-blue50 hover:bg-blue50 cursor-pointer ${
                                                                        section.proofType === option.id
                                                                            ? "border border-meedlBlue bg-blue50 text-meedlBlue"
                                                                            : "text-black300"
                                                                    }`}
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
                                                        setUploadedImageUrl={(url) => handleSetUploadedImageUrl(section.id, url)}
                                                    />
                                                </div>
                                            </TabsContent>
                                            {sections.length > 1 && (
                                                <div className={'flex justify-end'}>
                                                    <button
                                                        onClick={() => handleDeleteSection(section.id)}
                                                        className="bg-greyBase200 py-1 px-2 hover:bg-greyBase200 flex rounded-md gap-1 h-[1.8125rem] w-[5.25rem]"
                                                    >
                                                        <MdDeleteOutline className="text-error450 h-5 w-5"/>
                                                        <span
                                                            className={'text-error450 text-[14px] leading-[150%] font-medium'}>Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </section>
                                    </Tabs>
                                </section>
                            ))}
                        </main>
                    </TabsContent>
                    <main className={'sticky bottom-0  bg-white py-4 pr-4'}>

                        <div className="flex items-center gap-1 mb-4">
                            <Button
                                onClick={handleAddSection}
                                className="flex items-center gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
                            >
                                <MdAdd className="text-meedlBlue h-5 w-5"/>
                                <span className={'font-semibold text-[14px] leading-[150%]'}>Add</span>
                            </Button>
                        </div>
                        <div id="entityFormButtons" className={'md:flex grid gap-4 md:justify-between'}>
                            <Button
                                id="entityFormBackButton"
                                onClick={handleBackClick}
                                type={'button'}
                                className={'h-[2.813rem] w-full md:w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md  order-2 md:order-1'}
                            >
                                Back
                            </Button>
                            <Button
                                id="entityFormSaveContinueButton"
                                type={'button'}
                                onClick={handleSaveAndContinue}
                                disabled={disabledContinueButton}
                                className={`h-[2.8125rem] w-full md:w-[9.3125rem] px-4 py-2 ${disabledContinueButton ? `bg-[#e8eaee] hover:bg-[#e8eaee]`:` bg-meedlBlue hover:bg-meedlBlue text-white`} rounded-md  order-1 md:order-2`}
                            >
                                Save & continue
                            </Button>
                        </div>
                    </main>

                </Tabs>
            </section>
        </main>
    );
};

export default BeneficialOwnerStep;
