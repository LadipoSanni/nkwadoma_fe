
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
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
import { useGetCountriesQuery } from '@/service/admin/external-api/countryCalling_code_query';

interface PhoneNumberSelectProps {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  label: string;
  id: string;
  name: string;
  setFieldError: (field: string, message: string | undefined) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setError: (isError: boolean) => void;
  placeholder?: string;
  selectedCountryCode?: string;
  setSelectedCountryCode?: (code: string) => void;
  defaultCountry?: string;
}

const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = ({
  phoneNumber,
  setPhoneNumber,
  label,
  id,
  name,
  setFieldError,
  onBlur,
  setError,
  placeholder = 'Select code',
  selectedCountryCode,
  setSelectedCountryCode,
  defaultCountry = 'NG',
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [internalCountryCode, setInternalCountryCode] = useState(defaultCountry);

  const { data: countries, isLoading } = useGetCountriesQuery();

  const isCountryControlled =
    typeof selectedCountryCode !== 'undefined' &&
    typeof setSelectedCountryCode !== 'undefined';

  const currentCountryCode = isCountryControlled
    ? selectedCountryCode
    : internalCountryCode;

  const setCurrentCountryCode = isCountryControlled
    ? setSelectedCountryCode!
    : setInternalCountryCode;

  useEffect(() => {
    if (countries && !isCountryControlled) {
      const fallback = countries.find((c) => c.id === defaultCountry);
      if (fallback) setInternalCountryCode(fallback.id);
    }
  }, [countries, defaultCountry, isCountryControlled]);

  const displayedCountries = useMemo(() => {
    if (!countries) return [];
    return [...countries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 250);
  }, [countries]);

  const selectedCountry = useMemo(() => {
    if (!countries) return null;
    return countries.find((c) => c.id === currentCountryCode);
  }, [countries, currentCountryCode]);

  const validatePhoneNumber = useCallback(
    (countryCode: string, number: string) => {
      try {
        const parsed = parsePhoneNumberFromString(number, countryCode as CountryCode);
        if (parsed?.isValid()) {
          setPhoneNumber(parsed.formatNational());
          setError(false);
          setLocalError(null);
          setFieldError(name, undefined);
        } else {
          const errorMsg = `Invalid phone number for ${selectedCountry?.name || 'selected country'}`;
          setError(true);
          setLocalError(errorMsg);
          setFieldError(name, errorMsg);
        }
      } catch {
        const fallback = 'Invalid phone number format';
        setError(true);
        setLocalError(fallback);
        setFieldError(name, fallback);
      }
    },
    [setPhoneNumber, setError, setLocalError, setFieldError, name, selectedCountry]
  );

  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!selectedCountry?.code || !phoneNumber) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      validatePhoneNumber(selectedCountry.code, phoneNumber);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedCountry?.code, phoneNumber, validatePhoneNumber]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhoneNumber(raw);
    if (localError) {
      setLocalError(null);
      setFieldError(name, undefined);
      setError(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    if (selectedCountry?.code && phoneNumber) {
      validatePhoneNumber(selectedCountry.code, phoneNumber);
    }
  };

  return (
    <div className="grid gap-2">
      <Label className="text-[14px] font-medium leading-[22px] text-labelBlue">
        {label}
      </Label>
      <div className="flex gap-2 items-center">
        <Select
          value={selectedCountry?.name}
          onValueChange={(value) => {
            const match = displayedCountries.find((opt) => opt.name === value);
            if (match) {
              setCurrentCountryCode(match.id);
              if (localError) {
                setLocalError(null);
                setFieldError(name, undefined);
                setError(false);
              }
            }
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
                style={{ height: '250px', width: '150px' }}
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
                      <span>
                        {option.dialCode} {option.code}
                      </span>
                    </div>
                  </SelectItem>
                )}
              />
            )}
          </SelectContent>
        </Select>

        <div className="flex-1 relative">
          <Input
            id={id}
            name={name}
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
            className={`p-4 h-14 w-full focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-r-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid 
              border-[#B6BCCA] rounded-md border-opacity-65 relative bottom-1`}
            maxLength={20}
          />
          {localError && (
            <p className="absolute mt-1 text-sm text-red-500">{localError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

PhoneNumberSelect.displayName = 'PhoneNumberSelect';

export default PhoneNumberSelect;










// import { PatternFormat } from "react-number-format";