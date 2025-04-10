'use client';
import React, {useState, useMemo} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectContent, SelectItem} from "@/components/ui/select";
import {countries} from "countries-list";
import ReactCountryFlag from "react-country-flag";
import IndividualOwnerForm from '@/reuseable/forms/IndividualOwnerForm/Index'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';

const BeneficialOwnerStep = () => {
    const [selectedForm, setSelectedForm] = useState<"entity" | "individual">("entity");
    // const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery] = useState("");
    const [entityName, setEntityName] = useState("");
    const [rcNumber, setRcNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const countryOptions = useMemo(
        () =>
            Object.entries(countries).map(([code, {name}]) => ({
                value: code,
                label: name,
            })),
        []
    );

    const filteredCountryOptions = useMemo(
        () => {
            if (!searchQuery) return countryOptions;
            const query = searchQuery.toLowerCase();
            return countryOptions.filter(option =>
                option.label.toLowerCase().includes(query)
            );
        },
        [searchQuery, countryOptions]
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

    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.preventDefault();
    };

    return (
        <main className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div className={`${cabinetGroteskMediumBold.className} grid gap-1`}>
                <h1 className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <section className={'md:w-[27.5rem] w-full'}>
                <Tabs
                    value={selectedForm}
                    onValueChange={(value) => setSelectedForm(value as "entity" | "individual")}
                    className={'grid gap-7'}
                >
                    <TabsList className="flex gap-3 bg-transparent p-0 justify-start">
                        <TabsTrigger
                            value="entity"
                            className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:text-meedlBlue data-[state=inactive]:text-black300"
                        >
                            Entity
                        </TabsTrigger>
                        <TabsTrigger
                            value="individual"
                            className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:text-meedlBlue data-[state=inactive]:text-black300"
                        >
                            Individual
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="entity">
                        <main className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="entityName" className="block text-sm font-medium text-labelBlue">
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
                            <div className="grid gap-2">
                                <Label htmlFor="rcNumber" className="block text-sm font-medium text-labelBlue">
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
                            <div className="grid gap-2">
                                <Label htmlFor="countryOfIncorporation" className="block text-sm font-medium text-labelBlue">
                                    Country of incorporation
                                </Label>
                                <Select
                                    onValueChange={handleCountryChange}
                                    onOpenChange={(open) => setIsOpen(open)}
                                >
                                    <SelectTrigger
                                        id="countryOfIncorporation"
                                        onKeyDown={handleKeyDown}
                                        className={'mt-0 h-[3.375rem] px-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex items-center justify-between'}
                                    >
                                        {selectedCountry ? (
                                            <div className="flex items-center">
                                                {countries[selectedCountry as keyof typeof countries]?.name}
                                            </div>
                                        ) : (
                                            <span className="text-grey250">Select country</span>
                                        )}
                                        {isOpen ? (
                                            <MdKeyboardArrowUp className="h-6 w-6 text-grey250"/>
                                        ) : (
                                            <MdKeyboardArrowDown className="h-6 w-6 text-grey250"/>
                                        )}
                                    </SelectTrigger>
                                    <SelectContent className="p-0 h-[13.3125rem] md:w-[27.5rem] w-full">
                                        <div className="px-2 py-1">
                                            {filteredCountryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    <div className="flex items-center">
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
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className={'flex justify-between'}>
                                <Button
                                    onClick={handleBackClick}
                                    type={'button'}
                                    className={'h-[2.813rem] w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md'}
                                >
                                    Back
                                </Button>
                                <Button
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
                    <TabsContent value="individual">
                        <IndividualOwnerForm/>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
};

export default BeneficialOwnerStep;