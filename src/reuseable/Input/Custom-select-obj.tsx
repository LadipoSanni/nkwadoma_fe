import React, { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type SelectOption = {
  value: string | number;
  label: string;
};

type Props = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  selectContent?: Array<SelectOption>;
  name?: string;
  placeHolder?: string;
  triggerId?: string;
  isItemDisabled?: (item: string | number) => boolean;
};

function CustomSelectObj({ value, onChange, className, selectContent, name, placeHolder, id, triggerId, isItemDisabled }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <Select
        name={name}
        value={value}
        onValueChange={(val: string) => { onChange(val); }}
        onOpenChange={handleDropdownOpen}
      >
        <SelectTrigger
          id={triggerId}
          className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
          role='button'
        >
          <SelectValue className='' data-testid='SelectContent' placeholder={placeHolder} id={`selectId${id}`} />
          <div className=''>
            {dropdownOpen ? (
              <ChevronUpIcon data-testid="ChevronUpIcon" id='chevronUp' className="h-4 font-semibold" />
            ) : (
              <ChevronDownIcon data-testid="ChevronDownIcon" id='chevronDown' className="h-4 font-semibold" />
            )}
          </div>
        </SelectTrigger>
        <SelectContent
          id='generalSelectContent'
          className='border-none border-[#FAFBFC] text-[#404653] text-sm'
          style={{ zIndex: 1000 }}
        >
          <SelectGroup className='selectgroup'>
            {selectContent?.map((content, index) => (
              <div key={content.value} id={`${content.value}`}>
                <SelectItem
                  key={`${content.value}-${index}`}
                  id={`${content.value}`}
                  value={String(content.value)}
                  className={`${content.value}`}
                  disabled={isItemDisabled ? isItemDisabled(content.value) : false}
                >
                  {content.label}
                </SelectItem>
              </div>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelectObj;
