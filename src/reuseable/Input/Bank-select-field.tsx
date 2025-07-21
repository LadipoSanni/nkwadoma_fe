import React, { useMemo, useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem,  SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { getBanks } from 'banks-ng';
import Image from 'next/image';
import { Virtuoso } from 'react-virtuoso';

type Bank = {
  id: number;
  name: string;
  logo: string;
};

type ProcessedBank = Bank & {
  displayName: string;
};

type Props = {
  setLogo?: (value: string) => void;
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  bankName?: string;
  placeHolder?: string;
  triggerId?: string;
  isItemDisabled?: (item: string) => boolean;
};



const BankSelectField = ({ 
  value, 
  onChange, 
  className, 
  placeHolder, 
  id, 
  triggerId, 
  isItemDisabled,
  setLogo 
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const processedBanks = useMemo(() => {
    const BANK_ACRONYMS: Record<string, string> = {
        "United Bank For Africa": "UBA",
        "Guaranty Trust Bank": "GTB",
        "First City Monument Bank": "FCMB",
        "First Bank of Nigeria": "FBN"
      };
    return (getBanks() as Bank[]).map(bank => ({
      ...bank,
      displayName: BANK_ACRONYMS[bank.name] || bank.name
    }));
  },[]);

  
  const selectedBank = useMemo(() => {
    return value ? processedBanks.find(b => b.name === value) || null : null;
  }, [value, processedBanks]);

  const handleValueChange = (bankName: string) => {
    const bank = processedBanks.find(b => b.name === bankName);
    if (bank) {
      onChange(bank.name);
      if (setLogo) setLogo(bank.logo);
    }
  };

  const renderBankItem = useMemo(() => 
    (index: number, bank: ProcessedBank) => (
      <SelectItem
        id={`${id}${bank.id}`}
        key={bank.id}
        value={bank.name}
        className="hover:bg-[#EEF5FF]"
        disabled={isItemDisabled ? isItemDisabled(bank.name) : false}
      >
        <div className="flex items-center gap-2">
          <Image
            src={bank.logo}
            alt={bank.name}
            width={20}
            height={20}
            priority={index < 10}
            className="w-5 h-5 rounded-sm"
          />
          <span>{bank.displayName}</span>
        </div>
      </SelectItem>
    ),
    [id, isItemDisabled]
  );

  return (
    <div>
      <Select
        value={value}
        onValueChange={handleValueChange}
        onOpenChange={setDropdownOpen}
      >
        <SelectTrigger
          id={triggerId}
          className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
          role='button'
        >
          <div className="flex items-center gap-2">
            {selectedBank?.logo && (
              <Image
                src={selectedBank.logo}
                alt={selectedBank.name}
                width={20}
                height={20}
                className="w-4 h-4 rounded-sm"
              />
            )}
            {/* <SelectValue placeholder={placeHolder} /> */}
              {selectedBank ? selectedBank.displayName : <span className="text-grey400 opacity-50">{placeHolder}</span>}
            {/* </SelectValue> */}
          </div>
          {dropdownOpen ? (
            <ChevronUpIcon className="h-4 font-semibold" />
          ) : (
            <ChevronDownIcon className="h-4 font-semibold" />
          )}
        </SelectTrigger>
        
        <SelectContent className='border-none border-[#FAFBFC] text-[#404653] text-sm' style={{ zIndex: 1000, width: "275px" }}>
          <SelectGroup className='selectgroup'>
            <Virtuoso
              style={{ height: '250px', width: "275px" }}
              data={processedBanks}
              itemContent={renderBankItem}
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

BankSelectField.displayName = 'BankSelectField';

export default BankSelectField;
