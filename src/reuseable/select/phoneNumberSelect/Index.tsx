import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { PatternFormat } from "react-number-format";

interface CountryCodeOption {
    id: string;
    name: string;
}

interface PhoneNumberSelectProps {
    selectedCountryCode: string;
    setSelectedCountryCode: (code: string) => void;
    phoneNumber: string;
    setPhoneNumber: (number: string) => void;
    isSelectOpen: boolean;
    setIsSelectOpen: (open: boolean) => void;
    countryCodeOptions: CountryCodeOption[];
    label: string;
    placeholder: string;
    id: string;
}

const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = ({
                                                                 selectedCountryCode,
                                                                 setSelectedCountryCode,
                                                                 phoneNumber,
                                                                 setPhoneNumber,
                                                                 isSelectOpen,
                                                                 setIsSelectOpen,
                                                                 countryCodeOptions,
                                                                 label,
                                                                 placeholder,
                                                                 id
                                                             }) => {
    const uniqueId = `select${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div id="phoneNumberContainer" className={`grid gap-2`}>
            <Label htmlFor={uniqueId} className="block text-[14px] font-medium leading-[22px] text-labelBlue">{label}</Label>
            <div className="flex gap-2">
                <Select
                    onValueChange={(value) => {
                        const selectedCode = countryCodeOptions.find((option) => option.name === value);
                        if (selectedCode) {
                            setSelectedCountryCode(selectedCode.id);
                        }
                    }}
                    onOpenChange={(open) => setIsSelectOpen(open)}
                >
                    <SelectTrigger id="countryCodeSelectTrigger" className={`${selectedCountryCode ? 'text-black500' : 'text-black300'}  min-w-[82px]  w-[82px] mt-0 mb-0 border border-solid border-neutral650`}>
                        <SelectValue placeholder={placeholder}>
                            {selectedCountryCode ? countryCodeOptions.find(option => option.id === selectedCountryCode)?.name : placeholder}
                        </SelectValue>
                        {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950" /> : <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950" />}
                    </SelectTrigger>
                    <SelectContent id="countryCodeSelectContent">
                        {countryCodeOptions.map((option) => (
                            <SelectItem id={`countryCode${option.name.replace(/\s+/g, '')}`} className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950" key={option.id} value={option.name}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <PatternFormat
                    id={id}
                    placeholder="Enter phone number"
                    className="p-4 w-full  focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-r-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                    value={phoneNumber || undefined}
                    onValueChange={(values) => {
                        const { value } = values;
                        setPhoneNumber(value);
                    }}
                    format="### #### ####"
                    allowEmptyFormatting={false}
                />
            </div>
        </div>
    );
}

export default PhoneNumberSelect;