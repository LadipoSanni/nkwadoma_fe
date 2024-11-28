import React, { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface Props {
    selectedcurrency: string;
    setSelectedCurrency: (currency: string) => void;
    className?: string;
    readOnly?: boolean;
}

const currencyOptions = ['NGN', 'USD', 'GBP'];

function CurrencySelectInput({ selectedcurrency, setSelectedCurrency, className, readOnly = false }: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        if (!readOnly) {
            setDropdownOpen(!dropdownOpen);
        }
    };

    return (
        <div>
            <Select
                value={selectedcurrency}
                onValueChange={(value: string) => {
                    if (!readOnly) {
                        setSelectedCurrency(value);
                    }
                }}
                onOpenChange={handleDropdownOpen}
            >
                <SelectTrigger
                    className={`md:w-0 min-w-20 h-[3.2rem] border focus:ring-0 focus:outline-none text-sm text-[#404653] shadow-none flex justify-between ${
                        readOnly ? 'bg-gray105 cursor-not-allowed' : ''
                    } ${className}`}
                    role="button"
                >
                    <SelectValue className="w-3" data-testid="Select Currency" />
                    <div>
                        {dropdownOpen ? (
                            <ChevronUpIcon className="h-4 font-semibold" />
                        ) : (
                            <ChevronDownIcon className="h-4 font-semibold" />
                        )}
                    </div>
                </SelectTrigger>
                {!readOnly && (
                    <SelectContent
                        className="border-none border-[#FAFBFC] text-[#404653] text-sm"
                        style={{ zIndex: 1000 }}
                    >
                        <SelectGroup>
                            {currencyOptions.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                    {currency}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                )}
            </Select>
        </div>
    );
}

export default CurrencySelectInput;
