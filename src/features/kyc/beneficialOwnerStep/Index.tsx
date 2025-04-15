'use client';
import React, {useState, useMemo} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {countries} from "countries-list";
import ReactCountryFlag from "react-country-flag";
import IndividualOwnerForm from '@/reuseable/forms/IndividualOwnerForm/Index';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {MdOutlineSearch} from "react-icons/md";

const BeneficialOwnerStep = () => {
    const [selectedForm, setSelectedForm] = useState<"entity" | "individual">("entity");
    const [searchQuery, setSearchQuery] = useState(""); // Fixed state for searchQuery
    const [entityName, setEntityName] = useState("");
    const [rcNumber, setRcNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);


    const countryOptions = useMemo(
        () =>
            Object.entries(countries).map(([code, {name}]) => ({
                value: code,
                label: name,
            })),
        []
    );

    const isFormValid = useMemo(() => {
        if (selectedForm === "entity") {
            return entityName.trim() !== "" &&
                rcNumber.trim() !== "" &&
                selectedCountry !== undefined;
        }
        return true;
    }, [selectedForm, entityName, rcNumber, selectedCountry]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    };

    const handleBackClick = () => {
        router.back();
    };

    return (
        <main id="beneficialOwnerStepMain" className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div id="beneficialOwnerHeader" className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 id="beneficialOwnerTitle"
                    className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <section id="beneficialOwnerSection" className={'md:w-[27.5rem] w-full'}>
                <Tabs
                    id="beneficialOwnerTabs"
                    value={selectedForm}
                    onValueChange={(value) => setSelectedForm(value as "entity" | "individual")}
                    className={'grid gap-7'}
                >
                    <TabsList id="beneficialOwnerTabsList" className="flex gap-3 bg-transparent p-0 justify-start">
                        <TabsTrigger
                            id="entityTabTrigger"
                            value="entity"
                            className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-black300"
                        >
                            Entity
                        </TabsTrigger>
                        <TabsTrigger
                            id="individualTabTrigger"
                            value="individual"
                            className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-black300"
                        >
                            Individual
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent id="entityTabContent" value="entity">
                        <main id="entityFormMain" className="grid gap-5">
                            <div id="entityNameContainer" className="grid gap-2">
                                <Label htmlFor="entityName" id="entityNameLabel"
                                       className="block text-sm font-medium text-labelBlue">
                                    Entity name
                                </Label>
                                <Input
                                    id="entityName"
                                    value={entityName}
                                    onChange={(e) => setEntityName(e.target.value)}
                                    placeholder="Enter name"
                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                />
                            </div>
                            <div id="rcNumberContainer" className="grid gap-2">
                                <Label htmlFor="rcNumber" id="rcNumberLabel"
                                       className="block text-sm font-medium text-labelBlue">
                                    RC number
                                </Label>
                                <Input
                                    id="rcNumber"
                                    value={rcNumber}
                                    onChange={(e) => setRcNumber(e.target.value)}
                                    placeholder="Enter number"
                                    className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                />
                            </div>
                            <div id="countryOfIncorporationContainer" className="grid gap-2">
                                <Label htmlFor="countryOfIncorporation" id="countryOfIncorporationLabel"
                                       className="block text-sm font-medium text-labelBlue">
                                    Country of incorporation
                                </Label>
                                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <button
                                            id="countryOfIncorporationTrigger"
                                            className="mt-0 h-[3.375rem] px-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex items-center justify-between"
                                        >
                                            {selectedCountry ? (
                                                <div id="selectedCountryContainer" className="flex items-center">
                                                    <ReactCountryFlag
                                                        countryCode={selectedCountry}
                                                        svg
                                                        style={{
                                                            width: "1em",
                                                            height: "1em",
                                                            marginRight: "0.5em",
                                                        }}
                                                    />
                                                    {countries[selectedCountry as keyof typeof countries]?.name}
                                                </div>
                                            ) : (
                                                <span id="selectCountryPlaceholder" className="text-grey250">Select country</span>
                                            )}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="p-0 max-h-[13.3125rem] md:w-[27.5rem] w-full overflow-y-auto">
                                        <div className="sticky top-0 bg-white z-10 px-2 py-1">
                                            <div
                                                className="flex gap-2 p-2 items-center border-[0.5px] border-blue550 rounded h-[2.3125rem]">
                                                <MdOutlineSearch className="text-primary200 h-[18px] w-[18px]"/>
                                                <Input
                                                    type="text"
                                                    placeholder="Search country"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full p-0 text-black300 focus-visible:ring-0 focus:outline-none border-none"
                                                />
                                            </div>
                                        </div>
                                        <div id="countryOptionsContainer" className="px-2 py-1">
                                            {countryOptions
                                                .filter((option) =>
                                                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map((option) => (
                                                    <div
                                                        id={`countryOption-${option.value}`}
                                                        key={option.value}
                                                        onClick={() => {
                                                            handleCountryChange(option.value);
                                                            setIsPopoverOpen(false); // Close the popover
                                                        }}
                                                        className="flex items-center text-black300 text-[14px] leading-[150%] cursor-pointer hover:text-black500 hover:bg-blue500 p-2 rounded"
                                                    >
                                                        <ReactCountryFlag
                                                            countryCode={option.value}
                                                            svg
                                                            style={{
                                                                width: "1em",
                                                                height: "1em",
                                                                marginRight: "0.5em",
                                                            }}
                                                        />
                                                        {option.label}
                                                    </div>
                                                ))}
                                        </div>
                                    </PopoverContent>
                                </Popover></div>
                            <div id="entityFormButtons" className={'flex justify-between'}>
                                <Button
                                    id="entityFormBackButton"
                                    onClick={handleBackClick}
                                    type={'button'}
                                    className={'h-[2.813rem] w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md'}
                                >
                                    Back
                                </Button>
                                <Button
                                    id="entityFormSaveContinueButton"
                                    type={'submit'}
                                    onClick={() => router.push('/kyc/declaration')}
                                    disabled={!isFormValid}
                                    className={`h-[2.8125rem] md:w-[9.3125rem] px-4 py-2 ${!isFormValid ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'} text-white rounded-md`}
                                >
                                    Save & continue
                                </Button>
                            </div>
                        </main>
                    </TabsContent>
                    <TabsContent id="individualTabContent" value="individual">
                        <IndividualOwnerForm/>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
};

export default BeneficialOwnerStep;