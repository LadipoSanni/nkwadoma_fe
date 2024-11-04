import React,{useState} from 'react'
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup} from '@/components/ui/select'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";

interface Props {
    selectedcurrency: string,
    setSelectedCurrency: (currency: string) => void,
    className?: string,
}

const currencyOptions = ['NGN', 'USD', 'GBP']

function CurrencySelectInput({selectedcurrency,setSelectedCurrency,className}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
};
  return (
    <div>
       <Select
        value={selectedcurrency}
        onValueChange={(value: string) =>{
          setSelectedCurrency(value)
        }}
        onOpenChange={handleDropdownOpen}
       >
        <SelectTrigger className={`md:w-0 min-w-20 h-[3.2rem]   border  focus:ring-0 focus:outline-none text-sm text-[#404653]    shadow-none  flex justify-between ${className}`}
        role='button'

        >
          <SelectValue className='w-3' data-testid='Select Currency'/>
          <div className=''>
                {dropdownOpen ? (
                    <ChevronUpIcon className="h-4  font-semibold"/>
                ) : (
                    <ChevronDownIcon className="h-4 font-semibold"/>
                )}
            </div>
         </SelectTrigger>
         <SelectContent
         className='border-none  border-[#FAFBFC] text-[#404653]  text-sm'
         style={{zIndex:1000}}
         >
          <SelectGroup className=''>
            {currencyOptions.map((currency) => (
              <SelectItem key={currency} value={currency} className=''>
                {currency}
              </SelectItem>
            ))}
          </SelectGroup>
         </SelectContent>
       </Select>
    </div>
  )
}

export default CurrencySelectInput