'use client';
import React, {useState, useMemo} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import IndividualOwnerForm from '@/reuseable/forms/IndividualOwnerForm/Index';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import CountrySelectPopover from '@/reuseable/select/countrySelectPopover/Index'

const BeneficialOwnerStep = () => {
    const [selectedForm, setSelectedForm] = useState<"entity" | "individual">("entity");
    const [entityName, setEntityName] = useState("");
    const [rcNumber, setRcNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const router = useRouter();

    const isFormValid = useMemo(() => {
        if (selectedForm === "entity") {
            return entityName.trim() !== "" &&
                rcNumber.trim() !== "" &&
                selectedCountry !== undefined;
        }
        return true;
    }, [selectedForm, entityName, rcNumber, selectedCountry]);

    const handleBackClick = () => {
        router.back();
    };

    return (
        <main id="beneficialOwnerStepMain" className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div id="beneficialOwnerHeader" className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 id="beneficialOwnerTitle"
                    className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <section id="beneficialOwnerSection" className={'md:w-[30rem] w-full'}>
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
                        <main id="entityFormMain" className="grid gap-10">
                            <section className={'grid p-5 gap-5 border rounded-md border-lightBlue250'}>

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
                                    <CountrySelectPopover
                                        selectedCountry={selectedCountry}
                                        onCountryChange={(value) => setSelectedCountry(value)}
                                    />
                                </div>
                            </section>
                            <div id="entityFormButtons" className={'md:flex grid gap-4 justify-between'}>
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
                                    type={'submit'}
                                    onClick={() => router.push('/kyc/declaration')}
                                    disabled={!isFormValid}
                                    className={`h-[2.8125rem] w-full md:w-[9.3125rem] px-4 py-2 ${!isFormValid ? 'bg-blue550 hover:bg-blue550' : 'bg-meedlBlue hover:bg-meedlBlue'} text-white rounded-md  order-1 md:order-2`}
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