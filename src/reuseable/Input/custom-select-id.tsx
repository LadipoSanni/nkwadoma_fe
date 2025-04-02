import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

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
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange} // Pass the selected ID directly to onChange
      onOpenChange={(open) => setIsOpen(open)} // Sync open state
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
          {/* Display the name corresponding to the selected ID */}
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
          {selectContent.map((item) => (
            <SelectItem
              key={item.id}
              value={String(item.id)} // Send ID to onChange
              data-testid={`select-item-${item.id}`}
              className="cursor-pointer hover:bg-gray-50"
              disabled={isItemDisabled ? isItemDisabled(item) : false}
            >
              {item.name} {/* Display name in dropdown */}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}


export default CustomSelectId;