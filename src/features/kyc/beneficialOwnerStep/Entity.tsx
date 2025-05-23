import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover";

const Enity = () => {
    return (
        <div>
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
        </div>
    );
};

export default Enity;