import React, { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface CustomSelectProps {
    triggerId: string;
    id: string;
    selectContent?: Array<string | number>,
    value: string;
    onChange: (value: string) => void;
    name: string;
    placeHolder: string;
    className?: string;
    isItemDisabled?: (item: string | number) => boolean;
}

const LoanProductCustomSelect: React.FC<CustomSelectProps> = ({
                                                                  triggerId,
                                                                  id,
                                                                  selectContent,
                                                                  value,
                                                                  onChange,
                                                                  name,
                                                                  placeHolder,
                                                                  className,
                                                                  isItemDisabled
                                                              }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <Select
                name={name}
                value={value}
                onValueChange={onChange}
                onOpenChange={handleDropdownOpen}
            >
                <SelectTrigger
                    id={triggerId}
                    className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
                    role="button"
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
                        {selectContent?.map((content,index) => (
                            <div key={content} id={`${content}`}>
                                <SelectItem
                                    key={`${content}-${index}`}
                                    id={`${content}`}
                                    value={String(content)}
                                    className={`${content}`}
                                    disabled={isItemDisabled ? isItemDisabled(content) : false}
                                >
                                    {content}
                                </SelectItem>
                            </div>
                        ))}
                        {/*{selectContent.map((option, index) => (*/}
                        {/*    <div key={option.value} id={`${option.value}`}>*/}
                        {/*        <SelectItem*/}
                        {/*            key={`${option.value}-${index}`}*/}
                        {/*            id={`${option.value}`}*/}
                        {/*            value={option.value}*/}
                        {/*            className={`${option.value}`}*/}
                        {/*            disabled={isItemDisabled ? isItemDisabled(option.value) : false}*/}
                        {/*        >*/}
                        {/*            {option.label}*/}
                        {/*        </SelectItem>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LoanProductCustomSelect;
