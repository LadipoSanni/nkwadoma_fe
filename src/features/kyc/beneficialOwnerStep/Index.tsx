'use client';
import React, {useState, useMemo} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, inter500} from "@/app/fonts";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectContent, SelectItem} from "@/components/ui/select";
import {countries} from "countries-list";
import ReactCountryFlag from "react-country-flag";

const BeneficialOwnerStep = () => {
    const [selectedForm, setSelectedForm] = useState<"entity" | "individual">("entity");
    const [searchQuery, setSearchQuery] = useState("");

    const countryOptions = useMemo(
        () =>
            Object.entries(countries).map(([code, {name}]) => ({
                value: code,
                label: name,
            })),
        []
    );

    const filteredCountryOptions = useMemo(
        () =>
            countryOptions.filter((option) =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery, countryOptions]
    );

    const handleCountryChange = (selectedOption: string) => {
        console.log(selectedOption);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.preventDefault();
    };

    return (
        <main className={`${inter.className} xl:px-36 grid-cols-1 gap-y-6 grid gap-10`}>
            <div className={`${inter500.className} grid gap-1`}>
                <h1 className="text-meedlBlack text-[18px] leading-[150%] font-medium">Beneficial owner</h1>
                <p className="text-black400 text-[14px] leading-[150%] font-normal">Add source</p>
            </div>
            <Tabs
                value={selectedForm}
                onValueChange={(value) => setSelectedForm(value as "entity" | "individual")}
            > <TabsList className="flex gap-3 bg-transparent p-0 justify-start">
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
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="entityName" className="block text-sm font-medium text-labelBlue">
                                Entity name
                            </Label>
                            <Input
                                id="entityName"
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
                                placeholder="Enter number"
                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="countryOfIncorporation"
                                   className="block text-sm font-medium text-labelBlue">
                                Country of incorporation
                            </Label>
                            <Select onValueChange={handleCountryChange}>
                                <SelectTrigger id="countryOfIncorporation" onKeyDown={handleKeyDown}>
                                    Select country
                                </SelectTrigger>
                                <SelectContent className="h-[213px] w-[440px]">
                                    <div className="p-2 sticky top-0 bg-white z-10">
                                        <Input
                                            type="text"
                                            placeholder="Search country"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[37px] w-[432px] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                                        />
                                    </div>
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
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="individual">
                    <div>
                        <h2>Individual Form</h2>
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default BeneficialOwnerStep;