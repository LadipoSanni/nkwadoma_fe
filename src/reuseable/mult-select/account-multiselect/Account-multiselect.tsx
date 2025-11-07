import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfiniteScrollProps } from '@/types/Component.type';
import { type VariantProps } from "class-variance-authority";
import { AccountMultiSelectContent } from './Account-multiselect-content';
import { AccountMultiSelectTrigger,multiSelectVariants } from './Account-Multiselect-trigger';

interface Option {
  id: string;
  bankName: string;
  logo: string;
  accountNumber: string;

  icon?: React.ComponentType<{ className?: string }>;
}

interface SelectedValue {
  id: string;
  bankName: string;
  logo: string;
  accountNumber: string;

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
  emptyState? : string;
  isLoading?: boolean;
  resetKey?: string;
  selectAllcondition?: boolean;
}


export const AccountMultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
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
      emptyState,
      isLoading,
      resetKey,
      selectAllcondition,
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
          setIsPopoverOpen(open);
        };

    const toggleOption = (optionId: string) => {
      const option = options.find(opt => opt.id === optionId);
      if (!option) return;

      const isAlreadySelected = selectedValues.some(value => value.id === optionId);
      
      let newSelectedValues: SelectedValue[];
      
      if (isAlreadySelected) {
        newSelectedValues = selectedValues.filter(value => value.id !== optionId);
      } else {
        newSelectedValues = [...selectedValues, { id: option.id, bankName: option.bankName,logo: option.logo, accountNumber: option.accountNumber }];
      }
      
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    // const handleClear = () => {
    //     setSelectedValues([]);
    //     onValueChange([]);
    //   };
  
    //   const toggleAll = () => {
    //     if (selectedValues.length === options.length) {
    //       handleClear();
    //     } else {
    //       const allValues = options.map(option => ({ id: option.id, bankName: option.bankName }));
    //       setSelectedValues(allValues);
    //       onValueChange(allValues);
    //     }
    //   };
  
      const selectedIds = selectedValues.map(value => value.id);
  

  return (
     <Popover open={isPopoverOpen} onOpenChange={handleOpenChange} modal={modalPopover}>
            <PopoverTrigger asChild id={"popoverId"}>
              <AccountMultiSelectTrigger
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
                {...props}
              />
            </PopoverTrigger>
            <PopoverContent
              ref={contentRef}
              className="w-full p-0 "
              align="start"
              onEscapeKeyDown={() => setIsPopoverOpen(false)}
              tabIndex={-1}
              id="selectedContentId"
              style={{ 
                width: 'var(--radix-popover-trigger-width)',
                maxWidth: 'none'
              }}
            >
              <AccountMultiSelectContent 
                options={options}
                selectedValues={selectedIds} 
                onToggleOption={toggleOption} 
                // onClear={handleClear}
                // onClose={() => setIsPopoverOpen(false)}
                // onToggleAll={toggleAll}
                id={id}
                restrictedItems={restrictedItems}
                infinityScroll={infinityScroll}
                emptyState={emptyState}
                isLoading={isLoading}
                selectAllcondition={selectAllcondition}
              />
            </PopoverContent>
          </Popover>
  )
}

)

AccountMultiSelect.displayName = "AccountMultiSelect";
