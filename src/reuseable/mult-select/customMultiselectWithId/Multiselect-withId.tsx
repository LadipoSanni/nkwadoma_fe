
"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MultiSelectTrigger, multiSelectVariants } from "./Multiselect-trigger";
import { MultiSelectContent } from "./Multiselect-content";
import { type VariantProps } from "class-variance-authority";
import { InfiniteScrollProps } from '@/types/Component.type';

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: { id: string; name: string; icon?: React.ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  modalPopover?: boolean;
  className?: string;
  id?: string
  selcetButtonId?: string
  restrictedItems?: string[];
  horizontalScroll?: boolean;
  infinityScroll?: InfiniteScrollProps;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      modalPopover = false,
      variant,
      className,
      id,
      selcetButtonId,
      restrictedItems,
      horizontalScroll,
      infinityScroll,
      ...props
     
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => triggerRef.current!);

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };


    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.id);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild id={"popoverId"}>
          <MultiSelectTrigger
            ref={triggerRef}
            options={options}
            selectedValues={selectedValues}
            variant={variant}
            placeholder={placeholder}
            animation={animation}
            onToggleOption={toggleOption}
            isOpen={isPopoverOpen}
            className={className}
            selectButtonId={selcetButtonId}
            horizontalScroll={horizontalScroll}
            {...props}
          />
        </PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          className="w-full p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          tabIndex={-1}
          id="selectedContentId"
        >
          <MultiSelectContent
            options={options}
            selectedValues={selectedValues}
            onToggleOption={toggleOption}
            onClear={handleClear}
            onClose={() => setIsPopoverOpen(false)}
            onToggleAll={toggleAll}
            id={id}
            restrictedItems={restrictedItems}
            infinityScroll={infinityScroll}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";