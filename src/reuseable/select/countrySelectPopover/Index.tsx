import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineSearch } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import { countries } from "countries-list";

interface CountrySelectPopoverProps {
    selectedCountry: string | undefined; // Ensure this matches the type used in the parent
    onCountryChange: (value: string) => void; // Define the type for the callback
}

const CountrySelectPopover: React.FC<CountrySelectPopoverProps> = ({ selectedCountry, onCountryChange }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const countryOptions = Object.entries(countries).map(([code, { name }]) => ({
        value: code,
        label: name,
    }));

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <button
                    id="countryOfIncorporationTrigger"
                    className="mt-0 h-[3.375rem] w-full px-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 flex items-center justify-between"
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
                    {isPopoverOpen ? (
                        <MdKeyboardArrowUp className="ml-2 h-[22px] w-[22px] text-primary200" />
                    ) : (
                        <MdKeyboardArrowDown className="ml-2 h-[22px] w-[22px] text-primary200" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 max-h-[13.3125rem] md:w-[27.5rem] w-full overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 px-2 py-1">
                    <div className="flex gap-2 p-2 items-center border-[0.5px] border-blue550 rounded h-[2.3125rem]">
                        <MdOutlineSearch className="text-primary200 h-[18px] w-[18px]" />
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
                                    onCountryChange(option.value);
                                    setIsPopoverOpen(false);
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
        </Popover>
    );
};

export default CountrySelectPopover;