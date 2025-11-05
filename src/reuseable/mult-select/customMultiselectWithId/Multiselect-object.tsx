"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MultiSelectTrigger, multiSelectVariants } from "./Multiselect-trigger";
import { MultiSelectContent } from "./Multiselect-content";
import { type VariantProps } from "class-variance-authority";
import { InfiniteScrollProps } from '@/types/Component.type';

interface Option {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SelectedValue {
  id: string;
  name: string;
}

interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue'>, // Remove defaultValue from button props
    VariantProps<typeof multiSelectVariants> {
  options: Option[];
  onValueChange: (value: SelectedValue[]) => void;
  defaultValue?: SelectedValue[]; 
  placeholder?: string;
  animation?: number;
  modalPopover?: boolean;
  className?: string;
  id?: string;
  selcetButtonId?: string;
  restrictedItems?: string[];
  horizontalScroll?: boolean;
  infinityScroll?: InfiniteScrollProps;
  canOpen: boolean;
  emptyState? : string;
  isLoading?: boolean;
  resetKey?: string;
  selectAllcondition?: boolean;
  isEdit?: boolean;
  names?: SelectedValue[]
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
      canOpen = true,
      emptyState,
      isLoading,
      resetKey,
      selectAllcondition,
      names,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<SelectedValue[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => triggerRef.current!);

    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [resetKey, defaultValue]);

    const handleOpenChange = (open: boolean) => {
      if (open && !canOpen) {
        return; 
      }
      setIsPopoverOpen(open);
    };

    // const toggleOption = (optionId: string) => {
    //   const option = options.find(opt => opt.id === optionId);
    //   if (!option) return;

    //   const isAlreadySelected = selectedValues.some(value => value.id === optionId);
      
    //   let newSelectedValues: SelectedValue[];
      
    //   if (isAlreadySelected) {
    //     newSelectedValues = selectedValues.filter(value => value.id !== optionId);
    //   } else {
    //     newSelectedValues = [...selectedValues, { id: option.id, name: option.name }];
    //   }
      
    //   setSelectedValues(newSelectedValues);
    //   onValueChange(newSelectedValues);
    // };

    const toggleOption = (optionId: string) => {
     
      const existingItemFromNames = names?.find(n => n.id === optionId);
      
      const optionFromOptions = options.find(opt => opt.id === optionId);
    
     
      if (!existingItemFromNames && !optionFromOptions) return;
    
      const isAlreadySelected = selectedValues.some(value => value.id === optionId);
      
      let newSelectedValues: SelectedValue[];
      
      if (isAlreadySelected) {
        
        newSelectedValues = selectedValues.filter(value => value.id !== optionId);
      } else {
        
        const nameToUse = existingItemFromNames?.name || optionFromOptions?.name || optionId;
        const newItem = { id: optionId, name: nameToUse };
        newSelectedValues = [...selectedValues, newItem];
      }
      
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
        const allValues = options.map(option => ({ id: option.id, name: option.name }));
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    const selectedIds = selectedValues.map(value => value.id);

    return (
      <Popover open={isPopoverOpen} onOpenChange={handleOpenChange} modal={modalPopover}>
        <PopoverTrigger asChild id={"popoverId"}>
          <MultiSelectTrigger
            ref={triggerRef}
            options={options}
            selectedValues={selectedIds} 
            variant={variant}
            placeholder={placeholder}
            animation={animation}
            onToggleOption={toggleOption} 
            isOpen={isPopoverOpen}
            className={className}
            selectButtonId={selcetButtonId}
            horizontalScroll={horizontalScroll}
            names={names}
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
            selectedValues={selectedIds} 
            onToggleOption={toggleOption} 
            onClear={handleClear}
            onClose={() => setIsPopoverOpen(false)}
            onToggleAll={toggleAll}
            id={id}
            restrictedItems={restrictedItems}
            infinityScroll={infinityScroll}
            emptyState={emptyState}
            isLoading={isLoading}
            selectAllcondition={selectAllcondition}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";