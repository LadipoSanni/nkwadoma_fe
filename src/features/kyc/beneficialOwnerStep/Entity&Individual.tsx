import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {updateBeneficialOwner} from "@/redux/slice/kyc/kycFormSlice";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MdAdd, MdDeleteOutline, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDateRange} from "react-icons/md";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import FileUpload from "../../../reuseable/Input/FileUpload";

const EntityIndividual = () => {




    return (
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
                                                <input
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
                        // disabled={!isFormValid}
                        className={`h-[2.8125rem] w-full md:w-[9.3125rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md  order-1 md:order-2`}
                    >
                        Save & continue
                    </Button>
                </div>
            </main>

        </Tabs>
    );
};

export default EntityIndividual;