"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface MultiSelectContentProps {
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
  onToggleAll: () => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  selectAllcondition?: boolean;
  id?: string;
  restrictedItems?: string[]; 
}

export const MultiSelectContent = ({
  options,
  selectedValues,
  onToggleOption,
  onClear,
  onClose,
  onToggleAll,
  onInputKeyDown,
  selectAllcondition = false,
  id,
  restrictedItems = [], 
}: MultiSelectContentProps) => {
  const handleItemClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    callback();
  };

  
  const isOptionDisabled = (value: string) => {
    if (restrictedItems.length === 0) {
      return false; 
    }

    if (selectedValues.length > 0) {
      const isSelectedItemRestricted = restrictedItems.includes(selectedValues[0]);

      if (isSelectedItemRestricted) {
        return !restrictedItems.includes(value);
      } else {
        return value !== selectedValues[0];
      }
    }

    return false; 
  };

  return (
    <Command shouldFilter={true} className="w-full">
      <CommandList className="w-full" id="listId">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {!selectAllcondition ? null : (
            <CommandItem
              key="all"
              value="all"
              onMouseDown={handleItemClick(onToggleAll)}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  selectedValues.length === options.length
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className="h-4 w-4" />
              </div>
              <span>(Select All)</span>
            </CommandItem>
          )}
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const isDisabled = isOptionDisabled(option.value); // Check if the option is disabled

            return (
              <CommandItem
                key={option.value}
                value={option.value}
                onMouseDown={
                  !isDisabled
                    ? handleItemClick(() => onToggleOption(option.value))
                    : undefined // Disable click if the option is disabled
                }
                className={cn(
                  "cursor-pointer w-64 md:w-72",
                  isDisabled && "opacity-50 pointer-events-none" // Apply disabled styles
                )}
                id={`${option.label}${id}`}
              >
                <div
                  id={`${option.label}${id}`}
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected ? "bg-blue-950 text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon width={"4px"} />
                </div>
                {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                <span id={`${option.label}${id}`}>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup className="hover:bg-white">
          <div className="flex items-center justify-between">
            {selectedValues.length > 0 && (
              <>
                <CommandItem
                  value="clear"
                  onMouseDown={handleItemClick(onClear)}
                  className="flex-1 justify-center cursor-pointer data-[selected=true]:bg-white"
                >
                  Clear
                </CommandItem>
                <Separator orientation="vertical" className="flex min-h-6 h-full" />
              </>
            )}
            <CommandItem
              value="close"
              onSelect={() => onClose()}
              className="flex-1 justify-center cursor-pointer max-w-full data-[selected=true]:bg-white"
            >
              Close
            </CommandItem>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

MultiSelectContent.displayName = "MultiSelectContent";