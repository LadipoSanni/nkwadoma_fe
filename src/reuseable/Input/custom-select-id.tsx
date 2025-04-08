import React, { ReactNode, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { MdCheck } from "react-icons/md";


type SelectItemType = {
  id: string ;
  name: string;
};

type Props = {
  id?: string;
  value?: string; 
  onChange: (value: string) => void; 
  className?: string;
  selectContent: SelectItemType[]; 
  name?: string;
  placeholder?: string;
  triggerId?: string;
  isItemDisabled?: (item: SelectItemType) => boolean;
  additionalContent?: ReactNode | ((props: { closeDropdown: () => void }) => ReactNode);
  selectItemCss?: string
};

function CustomSelectId({
  id,
  value,
  onChange,
  className = '',
  selectContent = [],
  name,
  placeholder = 'Select an option',
  triggerId,
  isItemDisabled,
  additionalContent,
  selectItemCss
}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      onOpenChange={(open) => setIsOpen(open)} 
      open={isOpen}
    >
      <SelectTrigger
        id={triggerId}
        className={`h-12 w-full flex justify-between border border-gray-300 rounded-md focus:ring-0 focus:outline-none shadow-none ${className}`}
        role="combobox"
      >
        <SelectValue
          data-testid="select-value"
          placeholder={placeholder}
          id={id ? `select-${id}` : undefined}
        >
          
          {value
            ? selectContent.find((item) => String(item.id) === value)?.name
            : placeholder}
        </SelectValue>
        {isOpen ? (
          <ChevronUpIcon data-testid="chevron-up" className="h-4 w-4" />
        ) : (
          <ChevronDownIcon data-testid="chevron-down" className="h-4 w-4" />
        )}
      </SelectTrigger>
      <SelectContent
        data-testid="select-content"
        className="border border-gray-100 text-gray-700 text-sm bg-white"
        style={{ zIndex: 1000 }}
      >
        <SelectGroup>
        {selectContent.map((item) => {
            const disabled = isItemDisabled ? isItemDisabled(item) : false;
            const selected = value === item.id;
            
            return (
              <SelectItem
                key={item.id}
                value={String(item.id)}
                data-testid={`select-item-${item.id}`}
                className={`${selectItemCss} cursor-pointer hover:bg-gray-50 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
              >
                <div className="flex items-center justify-end w-full">
                  <span className='w-full'>{item.name}</span>
                  <div className='flex items-center justify-center absolute right-2 '>
                  {(disabled || selected) && (
                    <MdCheck className="h-4 w-4 text-[#BABABA] ml-2 " />
                  )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
        {additionalContent &&
          (typeof additionalContent === "function"
            ? additionalContent({ closeDropdown })
            : additionalContent)
            }
      </SelectContent>
    </Select>
  );
}


export default CustomSelectId;