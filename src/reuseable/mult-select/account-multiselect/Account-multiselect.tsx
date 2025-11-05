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


function AccountMultiselect() {
  return (
    <div>
      
    </div>
  )
}

export default AccountMultiselect
