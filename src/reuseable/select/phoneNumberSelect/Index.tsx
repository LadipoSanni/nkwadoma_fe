import React, { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Isloading from '@/reuseable/display/Isloading';
import Image from 'next/image';
import { Virtuoso } from 'react-virtuoso';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

interface Country {
    id: string,
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface PhoneNumberSelectProps {
  selectedCountryCode: string;
  setSelectedCountryCode: (code: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  isSelectOpen: boolean;
  setIsSelectOpen: (open: boolean) => void;
  label: string;
  placeholder: string;
  id: string;
  countries:Country[]
  isLoading: boolean
}



const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = ({
  selectedCountryCode,
  setSelectedCountryCode,
  phoneNumber,
  setPhoneNumber,
  isSelectOpen,
  setIsSelectOpen,
  label,
  placeholder,
  id,
  countries,
  isLoading
}) => {
  


  const displayedCountries = useMemo(() => {
    if (!countries) return [];
    return [...countries]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 250);
  }, [countries]);

  const selectedCountry = useMemo(() => {
    if (!countries) return null;
    return countries.find((c) => c.id === selectedCountryCode);
  }, [countries, selectedCountryCode]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhoneNumber(raw);
  };


  const handleBlur = () => {
    if (selectedCountry?.code) {
      try {
        const parsed = parsePhoneNumberFromString(
          phoneNumber,
          selectedCountry.code as CountryCode
        );
        if (parsed?.isValid()) {
          setPhoneNumber(parsed.formatInternational());
        }
      } catch (err) {
        console.warn('Phone formatting failed:', err);
      }
    }
  };

  return (
    <div className="grid gap-2">
      <Label className="text-[14px] font-medium leading-[22px] text-labelBlue">
        {label}
      </Label>
      <div className="flex gap-2 items-center">
        <Select
        defaultValue={selectedCountry?.name} 
        value={selectedCountry?.name} 
          onValueChange={(value) => {
            const match = displayedCountries.find((opt) => opt.name === value);
            if (match) setSelectedCountryCode(match.id);
          }}
          onOpenChange={setIsSelectOpen}
        >
          <SelectTrigger className="min-w-[85px] w-[82px] border border-[#B6BCCA] border-opacity-65">
            <SelectValue placeholder={placeholder}>
              {selectedCountry?.id ? (
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.dialCode}</span>
                </div>
              ) : (
                placeholder
              )}
            </SelectValue>
            {isSelectOpen ? (
              <MdKeyboardArrowUp className="h-[22px] w-[22px]" />
            ) : (
              <MdKeyboardArrowDown className="h-[22px] w-[22px]" />
            )}
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {isLoading ? (
              <Isloading />
            ) : (
              <Virtuoso
                style={{ height: '250px', width:"150px"}}
                data={displayedCountries}
                itemContent={(index, option) => (
                  <SelectItem
                    key={option.id}
                    value={option.name}
                    className="focus:bg-lightBlue200"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={option.flag}
                        alt={option.name}
                        width={20}
                        height={20}
                        priority={index < 10}
                        className="w-5 h-5 rounded-sm"
                      />
                      <span>{option.dialCode} {option.code}</span>
                    </div>
                  </SelectItem>
                )}
              />
            )}
          </SelectContent>
        </Select>

        <Input
          id={id}
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          placeholder="Enter phone number"
         className="p-4 h-14 w-full focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-r-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-[#B6BCCA] rounded-md border-opacity-65 relative bottom-1"
          maxLength={20}
        />
      </div>
    </div>
  );
};

export default PhoneNumberSelect;








// import { PatternFormat } from "react-number-format";