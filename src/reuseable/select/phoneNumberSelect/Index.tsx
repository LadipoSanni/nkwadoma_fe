// import React, { useMemo, useState } from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
// import Isloading from '@/reuseable/display/Isloading';
// import Image from 'next/image';
// import { Virtuoso } from 'react-virtuoso';
// import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

// interface Country {
//   id: string,
//   name: string;
//   code: string;
//   dialCode: string;
//   flag: string;
// }

// interface PhoneNumberSelectProps {
//   selectedCountryCode: string;
//   setSelectedCountryCode: (code: string) => void;
//   phoneNumber: string;
//   setPhoneNumber: (number: string) => void;
//   isSelectOpen: boolean;
//   setIsSelectOpen: (open: boolean) => void;
//   label: string;
//   placeholder: string;
//   id: string;
//   countries: Country[];
//   isLoading: boolean;
// }

// const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = ({
//   selectedCountryCode,
//   setSelectedCountryCode,
//   phoneNumber,
//   setPhoneNumber,
//   isSelectOpen,
//   setIsSelectOpen,
//   label,
//   placeholder,
//   id,
//   countries,
//   isLoading
// }) => {
//   const [error, setError] = useState<string | null>(null);

//   const displayedCountries = useMemo(() => {
//     if (!countries) return [];
//     return [...countries]
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .slice(0, 250);
//   }, [countries]);

//   const selectedCountry = useMemo(() => {
//     if (!countries) return null;
//     return countries.find((c) => c.id === selectedCountryCode);
//   }, [countries, selectedCountryCode]);

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const raw = e.target.value.replace(/\D/g, '');
//     setPhoneNumber(raw);
//     if (error) setError(null);
//   };

//   const handleBlur = () => {
//     setError(null); 
    
//     if (!selectedCountry?.code) {
//       setError('Please select a country first');
//       return;
//     }

//     if (!phoneNumber) {
//       setError('Please enter a phone number');
//       return;
//     }

//     try {
//       const parsed = parsePhoneNumberFromString(
//         phoneNumber,
//         selectedCountry.code as CountryCode
//       );
      
//       if (parsed?.isValid()) {
//         setPhoneNumber(parsed.formatInternational());
//       } else {
//         setError(`Invalid phone number for ${selectedCountry.name}`);
//       }
//     } catch (err) {
//       console.warn('Phone formatting failed:', err);
//       setError('Invalid phone number format');
//     }
//   };

//   return (
//     <div className="grid gap-2">
//       <Label className="text-[14px] font-medium leading-[22px] text-labelBlue">
//         {label}
//       </Label>
//       <div className="flex gap-2 items-center">
//         <Select
//           defaultValue={selectedCountry?.name} 
//           value={selectedCountry?.name} 
//           onValueChange={(value) => {
//             const match = displayedCountries.find((opt) => opt.name === value);
//             if (match) setSelectedCountryCode(match.id);
//           }}
//           onOpenChange={setIsSelectOpen}
//         >
//           <SelectTrigger className="min-w-[85px] w-[82px] border border-[#B6BCCA] border-opacity-65">
//             <SelectValue placeholder={placeholder}>
//               {selectedCountry?.id ? (
//                 <div className="flex items-center gap-2">
//                   <span>{selectedCountry.dialCode}</span>
//                 </div>
//               ) : (
//                 placeholder
//               )}
//             </SelectValue>
//             {isSelectOpen ? (
//               <MdKeyboardArrowUp className="h-[22px] w-[22px]" />
//             ) : (
//               <MdKeyboardArrowDown className="h-[22px] w-[22px]" />
//             )}
//           </SelectTrigger>
//           <SelectContent className="max-h-[400px]">
//             {isLoading ? (
//               <Isloading />
//             ) : (
//               <Virtuoso
//                 style={{ height: '250px', width: "150px" }}
//                 data={displayedCountries}
//                 itemContent={(index, option) => (
//                   <SelectItem
//                     key={option.id}
//                     value={option.name}
//                     className="focus:bg-lightBlue200"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={option.flag}
//                         alt={option.name}
//                         width={20}
//                         height={20}
//                         priority={index < 10}
//                         className="w-5 h-5 rounded-sm"
//                       />
//                       <span>{option.dialCode} {option.code}</span>
//                     </div>
//                   </SelectItem>
//                 )}
//               />
//             )}
//           </SelectContent>
//         </Select>

//         <div className="flex-1">
//           <Input
//             id={id}
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             onBlur={handleBlur}
//             placeholder="Enter phone number"
//             className={`p-4 h-14 w-full focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-r-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid ${
//               error ? 'border-red-500' : 'border-[#B6BCCA]'
//             } rounded-md border-opacity-65 relative bottom-1`}
//             maxLength={20}
//           />
//           {error && (
//             <p className="absolute mt-1 text-sm text-red-500">{error}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberSelect;



import React, { useMemo, useState } from 'react';
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
  id: string;
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
  name: string;
  countries: Country[];
  isLoading: boolean;
  setFieldError: (field: string, message: string | undefined) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setError: (isError: boolean) => void
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
  name,
  countries,
  isLoading,
  setFieldError,
  onBlur,
  setError
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

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
    if (localError) {
      setLocalError(null);
      setFieldError(name, undefined);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    setLocalError(null);
    setFieldError(name, undefined);
    
    if (!selectedCountry?.code) {
      const errorMsg = 'Please select a country first';
      setLocalError(errorMsg);
      setFieldError(name, errorMsg);
      return;
    }

    if (!phoneNumber) {
      const errorMsg = 'Phone number is required';
      setLocalError(errorMsg);
      setFieldError(name, errorMsg);
      return;
    }

    try {
      const parsed = parsePhoneNumberFromString(
        phoneNumber,
        selectedCountry.code as CountryCode
      );
      
      if (parsed?.isValid()) {
        setPhoneNumber(parsed.formatInternational());
        setError(false)
      } else {
        const errorMsg = `Invalid phone number for ${selectedCountry.name}`;
        setError(true)
        setLocalError(errorMsg);
        setFieldError(name, errorMsg);
      }
    } catch (err) {
      console.warn('Phone formatting failed:', err);
      const errorMsg = 'Invalid phone number format';
      setLocalError(errorMsg);
      setFieldError(name, errorMsg);
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
            if (match) {
              setSelectedCountryCode(match.id);
              if (localError) {
                setLocalError(null);
                setFieldError(name, undefined);
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
                style={{ height: '250px', width: "150px" }}
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

        <div className="flex-1 relative">
          <Input
            id={id}
            name={name}
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
            className={`p-4 h-14 w-full focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-r-md font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid ${
              localError ? 'border-red-500' : 'border-[#B6BCCA]'
            } rounded-md border-opacity-65 relative bottom-1`}
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

export default PhoneNumberSelect;








// import { PatternFormat } from "react-number-format";