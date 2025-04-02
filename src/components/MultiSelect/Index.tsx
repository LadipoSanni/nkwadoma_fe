'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react';
// Assuming these imports are correctly set up in your project
// import { inter, inter500 } from "@/app/fonts";
// import { useAppSelector } from "@/redux/store";
// import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import from your Shadcn component
import { CheckIcon, ChevronDownIcon, XCircle } from '@radix-ui/react-icons'; // Using radix-ui icons
// Assuming cn utility is correctly set up
// import { cn } from '@/lib/utils';

// --- MultiSelect Component ---
interface MultiSelectProps {
    options: { value: string; label: string }[];
    onChange: (selectedValues: string[]) => void;
    selectedValues: string[];
    placeholder?: string;
    // maxVisibleItems?: number; // This prop doesn't seem to be used currently
}

const MultiSelect: React.FC<MultiSelectProps> = ({
                                                     options,
                                                     onChange,
                                                     selectedValues,
                                                     placeholder = "Select items...",
                                                     // maxVisibleItems = 5,
                                                 }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Handles selecting/deselecting an item
    const handleSelectChange = useCallback((value: string) => {
        if (selectedValues.includes(value)) {
            // If already selected, remove it
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            // If not selected, add it
            onChange([...selectedValues, value]);
        }
    }, [selectedValues, onChange]);

    // Ensure selectedValues is always an array on component mount/update
    useEffect(() => {
        if (!Array.isArray(selectedValues)) {
            console.warn("MultiSelect received non-array selectedValues, resetting to empty array.");
            onChange([]);
        }
    }, [selectedValues, onChange]);

    // Function to render the display value (placeholder or tags)
    const displayValue = () => {
        // Ensure selectedValues is an array before proceeding
        const currentSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

        if (currentSelectedValues.length === 0) {
            return placeholder;
        } else {
            // Render selected items as tags
            return (
                <div className="flex flex-wrap gap-1.5 items-center"> {/* Added items-center */}
                    {currentSelectedValues.map((value) => {
                        const option = options.find((opt) => opt.value === value);
                        return (
                            <div
                                key={value}
                                className={
                                    "inline-flex items-center gap-1.5 " + // Use cn() if available: cn(...)
                                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 " + // Example tag styles (adjust to your theme)
                                    "px-2 py-1 rounded-full text-xs font-medium " +
                                    "border border-gray-300 dark:border-gray-600 " +
                                    "max-w-[150px] truncate" // Increased max-width slightly
                                }
                            >
                                <span className="truncate">{option?.label ?? value}</span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent dropdown from closing
                                        handleSelectChange(value);
                                    }}
                                    className={
                                        "h-4 w-4 rounded-full " + // Use cn() if available: cn(...)
                                        "hover:bg-red-200 dark:hover:bg-red-700 " + // Example delete button hover (adjust)
                                        "transition-colors duration-200 " +
                                        "flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400" // Icon color
                                    }
                                    aria-label={`Remove ${option?.label ?? value}`}
                                >
                                    {/* Using XCircle icon for removing tags */}
                                    <XCircle className="h-3.5 w-3.5" /> {/* Slightly larger icon */}
                                </button>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <Select open={open} onOpenChange={setOpen}>
            <SelectTrigger
                ref={triggerRef}
                // Using example classes, replace with cn() and your actual theme classes
                className={
                    "w-full flex items-center justify-between " +
                    "border border-gray-300 dark:border-gray-600 rounded-md " +
                    "px-3 py-2 " +
                    "bg-white dark:bg-gray-800 " +
                    "text-gray-900 dark:text-gray-100 " +
                    "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 " +
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
                    "min-h-[2.8rem] " + // Slightly increased min-height
                    (Array.isArray(selectedValues) && selectedValues.length > 0 ? "py-1.5" : "") // Adjust padding when tags are present
                }
                // Prevent default behavior which might close the dropdown on click inside trigger
                onClick={() => setOpen(prev => !prev)}
            >
                {/* SelectValue now correctly renders the tags or placeholder */}
                <div className="flex-grow truncate mr-2"> {/* Added container for tags */}
                    {displayValue()}
                </div>
                {/* Chevron Icon */}
                <ChevronDownIcon className={`h-5 w-5 opacity-50 transition-transform duration-200 ${open ? 'transform rotate-180' : ''}`} />
            </SelectTrigger>
            <SelectContent
                // Using example classes, replace with cn() and your actual theme classes
                className={
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 " +
                    "border border-gray-300 dark:border-gray-600 rounded-md shadow-lg " +
                    "z-50 " +
                    "max-h-[300px] " +
                    "overflow-y-auto " +
                    "min-w-[var(--radix-select-trigger-width)]" // Ensures content width matches trigger
                }
                position="popper" // Position the dropdown below the trigger
                sideOffset={5} // Add some space between trigger and content
            >
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        // Prevent default selection behavior and use our custom handler
                        onSelect={(e) => {
                            e.preventDefault(); // Important to prevent closing on select
                            handleSelectChange(option.value);
                        }}
                        // Using example classes, replace with cn() and your actual theme classes
                        className={
                            "flex items-center justify-between " +
                            "px-3 py-2 rounded-md cursor-pointer text-sm " +
                            "hover:bg-gray-100 dark:hover:bg-gray-700 " +
                            (selectedValues.includes(option.value) ? "bg-blue-100 dark:bg-blue-900 font-medium" : "") + // Style for selected item
                            " transition-colors duration-150"
                        }
                    >
                        <span>{option.label}</span>
                        {/* Show checkmark if the item is selected */}
                        {selectedValues.includes(option.value) && (
                            <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MultiSelect;