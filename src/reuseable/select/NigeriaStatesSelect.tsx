import React, { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type Props = {
    id?: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    name?: string;
    placeHolder?: string;
    triggerId?: string;
    isItemDisabled?: (item: string | number) => boolean;
    readonly?: boolean;
    testId?: string
  };

function NigeriaStatesSelect({ value, onChange, className,  name, placeHolder, id, triggerId, isItemDisabled,readonly,testId="testId" }: Props) {
     const [dropdownOpen, setDropdownOpen] = useState(false);

     const handleDropdownOpen = () => {

        setDropdownOpen(!dropdownOpen);
      };

   const nigerianStates = [
        { value: "ABIA", label: "Abia" },
        { value: "ADAMAWA", label: "Adamawa" },
        { value: "AKWA_IBOM", label: "Akwa Ibom" },
        { value: "ANAMBRA", label: "Anambra" },
        { value: "BAUCHI", label: "Bauchi" },
        { value: "BAYELSA", label: "Bayelsa" },
        { value: "BENUE", label: "Benue" },
        { value: "BORNO", label: "Borno" },
        { value: "CROSS_RIVER", label: "Cross River" },
        { value: "DELTA", label: "Delta" },
        { value: "EBONYI", label: "Ebonyi" },
        { value: "EDO", label: "Edo" },
        { value: "EKITI", label: "Ekiti" },
        { value: "ENUGU", label: "Enugu" },
        { value: "FCT", label: "Federal Capital Territory" },
        { value: "GOMBE", label: "Gombe" },
        { value: "IMO", label: "Imo" },
        { value: "JIGAWA", label: "Jigawa" },
        { value: "KADUNA", label: "Kaduna" },
        { value: "KANO", label: "Kano" },
        { value: "KATSINA", label: "Katsina" },
        { value: "KEBBI", label: "Kebbi" },
        { value: "KOGI", label: "Kogi" },
        { value: "KWARA", label: "Kwara" },
        { value: "LAGOS", label: "Lagos" },
        { value: "NASARAWA", label: "Nasarawa" },
        { value: "NIGER", label: "Niger" },
        { value: "OGUN", label: "Ogun" },
        { value: "ONDO", label: "Ondo" },
        { value: "OSUN", label: "Osun" },
        { value: "OYO", label: "Oyo" },
        { value: "PLATEAU", label: "Plateau" },
        { value: "RIVERS", label: "Rivers" },
        { value: "SOKOTO", label: "Sokoto" },
        { value: "TARABA", label: "Taraba" },
        { value: "YOBE", label: "Yobe" },
        { value: "ZAMFARA", label: "Zamfara" }
      ] 

  return (
    <div>
        <Select
              name={name}
              value={value}
              onValueChange={(val: string) => { onChange(val); }}
              onOpenChange={handleDropdownOpen}
              disabled={readonly}
            >
              <SelectTrigger
                id={triggerId}
                className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
                role='button'
                data-testid={testId}
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
                className='border-none border-[#FAFBFC] text-[#404653] text-sm '
                style={{ zIndex: 1000 }}
                
              >
                <SelectGroup className='selectgroup'>
                  {nigerianStates?.map((content, index) => (
                    <div key={content.value} id={`${content.value}`}>
                      <SelectItem
                        key={`${content.value}-${index}`}
                        id={`${content.value}`}
                        value={String(content.value)}
                        className={`${content.value} hover:bg-[#EEF5FF]`}
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
  )
}

export default NigeriaStatesSelect
