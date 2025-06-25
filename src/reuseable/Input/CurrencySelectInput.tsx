import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Props {
    selectedcurrency: string;
    setSelectedCurrency: (currency: string) => void;
    className?: string;
    readOnly?: boolean;
}

const currencyOptions = ['NGN', 'USD', 'GBP'];

function CurrencySelectInput({ selectedcurrency, setSelectedCurrency, className, readOnly = false }: Props) {
    return (
        <div>
            <Select
                value={selectedcurrency}
                onValueChange={(value: string) => {
                    if (!readOnly) {
                        setSelectedCurrency(value);
                    }
                }}
                onOpenChange={() => {
                    if (readOnly) {
                        return;
                    }
                }}
                disabled={readOnly}
            >
                <SelectTrigger
                    className={`md:w-0 min-w-20 h-[3rem] border focus:ring-0 focus:outline-none text-sm shadow-none flex justify-between ${
                        readOnly ? 'cursor-not-allowed bg-grey105 text-black300' : ''
                    } ${className}`}
                    role="button"
                >
                    <SelectValue
                        className={`w-full ${readOnly ? 'text-black300' : ''}`}
                        data-testid="Select Currency"
                    >
                        {selectedcurrency}
                    </SelectValue>
                    {!readOnly && <ChevronDownIcon className="h-4 font-semibold" />}
                </SelectTrigger>
                {!readOnly && (
                    <SelectContent
                        className="border-none border-[#FAFBFC] text-[#404653] text-sm"
                        style={{ zIndex: 1000 }}
                    >
                        <SelectGroup>
                            {currencyOptions.map((currency) => (
                                <SelectItem key={currency} value={currency} disabled={currency !== 'NGN'}>
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
