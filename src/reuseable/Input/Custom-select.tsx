import React,{useState} from 'react'
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup} from '@/components/ui/select'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";

type SelectItem = {
    id?: string;
    name: string;
};

type Props = {
    id?: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    selectContent?: Array<string | number | SelectItem>;
    name?: string;
    placeHolder?: string;
    triggerId?: string;
    showRestButton?: boolean;
    handleReset?: () => void;
    isItemDisabled?: (item: string | number | SelectItem) => boolean;
};

function CustomSelect({
                          value,
                          onChange,
                          className,
                          selectContent,
                          name,
                          showRestButton,
                          placeHolder,
                          id,
                          triggerId,
                          isItemDisabled,
                          handleReset,
                      }: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handle = () => {
        if (handleReset){
            handleReset();

        }
        setDropdownOpen(false);
    }

    return (
        <div>
            <Select
                name={name}
                value={value}
                onValueChange={(val: string) => onChange(val)}
                onOpenChange={handleDropdownOpen}
            >
                <SelectTrigger
                    id={triggerId}
                    className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
                    role="button"
                >
                    <SelectValue className="" data-testid="SelectContent" placeholder={placeHolder} id={`selectId${id}`} />
                    <div className="">
                        {dropdownOpen ? (
                            <ChevronUpIcon data-testid="ChevronUpIcon" id="chevronUp" className="h-4 font-semibold" />
                        ) : (
                            <ChevronDownIcon data-testid="ChevronDownIcon" id="chevronDown" className="h-4 font-semibold" />
                        )}
                    </div>
                </SelectTrigger>
                <SelectContent
                    id="generalSelectContent"
                    className="border-none border-[#FAFBFC] text-[#404653] text-sm"
                    style={{ zIndex: 1000 }}
                >
                    <SelectGroup className="selectgroup">
                        {selectContent?.map((content, index) => {
                            // Determine value and display text
                            const itemValue = typeof content === 'object' ? content.name : String(content);
                            const itemDisplay = typeof content === 'object' ? content.name : String(content);
                            const itemId = typeof content === 'object' && content.id ? content.id : `${content}-${index}`;

                            return (
                                <div key={itemId} id={itemId}>
                                    <SelectItem
                                        key={`${itemValue}-${index}`}
                                        id={itemId}
                                        value={itemValue}
                                        className={itemValue}
                                        disabled={isItemDisabled ? isItemDisabled(content) : false}
                                    >
                                        {itemDisplay}
                                    </SelectItem>
                                </div>
                            );
                        })}
                    </SelectGroup>
                    {showRestButton && value !== 'Month' ?
                        <button  onClick={handle} className={` grid hover:border w-full  `}>
                            All
                        </button>
                        : null
                    }
                </SelectContent>
            </Select>
        </div>
    );
}

export default CustomSelect;