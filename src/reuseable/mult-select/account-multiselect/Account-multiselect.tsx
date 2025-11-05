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
      canOpen = true,
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
          if (open && !canOpen) {
            return; 
          }
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
        newSelectedValues = [...selectedValues, { id: option.id, name: option.name }];
      }
      
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

  return (
    <div>
      
    </div>
  )
}

)

AccountMultiSelect.displayName = "AccountMultiSelect";
