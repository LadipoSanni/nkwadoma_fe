"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteScrollProps } from '@/types/Component.type';
import SkeletonForLoanOrg from '../../Skeleton-loading-state/Skeleton-for-loan-organizations';
import GeneralEmptyState from '@/reuseable/emptyStates/General-emptystate';
import { Book } from 'lucide-react';
import { MdInfoOutline } from 'react-icons/md';
import { BankAccountItem } from '@/components/loanee/Bank-account-item';
import SearchInput from "@/reuseable/Input/SearchInput";

interface MultiSelectContentProps {
  options: { id: string; bankName: string; accountNumber:string;logo: string; icon?: React.ComponentType<{ className?: string }> }[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
//   onClear: () => void;
//   onClose: () => void;
//   onToggleAll: () => void;
  selectAllcondition?: boolean;
  id?: string;
  restrictedItems?: string[];
  infinityScroll?: InfiniteScrollProps;
  isLoading?: boolean;
  emptyState? : string;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

export const AccountMultiSelectContent = ({
  options,
  selectedValues,
  onToggleOption,
//   onClear,
//   onClose,
//   onToggleAll,
  selectAllcondition = false,
  id,
  restrictedItems = [],
  infinityScroll,
  isLoading = false,
  emptyState = "No account available",
  searchTerm = "",
  setSearchTerm = () => {},
}: MultiSelectContentProps) => {
     const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
     const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleItemClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    callback();
  };

  const handleSearchChange = React.useCallback((value: string) => {
        setLocalSearchTerm(value);
      
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setSearchTerm(value);
        }, 1000);
      }, [setSearchTerm]);

  const isOptionDisabled = (id: string) => {
    if (restrictedItems.length === 0) {
      return false;
    }

    if (selectedValues.length > 0) {
      const isSelectedItemRestricted = restrictedItems.includes(selectedValues[0]);

      if (isSelectedItemRestricted) {
        return !restrictedItems.includes(id);
      } else {
        return id !== selectedValues[0];
      }
    }

    return false;
  };

  return (
    <Command shouldFilter={true} className="w-full">
      <CommandList className="w-full">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="w-full">
          {/* {!selectAllcondition  ? null : options.length === 0 ? <div></div> : (
            <CommandItem
              key="all"
              value="all"
              onMouseDown={handleItemClick(onToggleAll)}
              className="cursor-pointer border-b border-solid rounded-b-none w-full"
            >
              <div
                className={cn(
                  "mr-2 flex h-[24px] w-[24px] items-center justify-center rounded-sm border border-primary",
                  selectedValues.length === options.length
                    ? "bg-[#E8EAEE] text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon width={"4px"} className="text-blue-950" />
              </div>
              <span className="font-medium">Select all</span>
            </CommandItem>
          )} */}
          <div className="w-full px-3 mt-2 mb-1">
            <SearchInput
             placeholder="Search account"
             testId='search-input'
             id="staffSearchLoanee"
             value={localSearchTerm}
             style="md:w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                handleSearchChange(value);
            }}
            />
          </div>
          
          {isLoading ? (
            <div className="w-full"><SkeletonForLoanOrg/></div>
          ) : options?.length === 0 ? (
            <div className="relative bottom-10 w-full">
              <GeneralEmptyState
                icon={Book}
                iconSize='1.6rem'
                iconContainerClass='w-[30px] h-[30px]'
                message={<div className='relative bottom-2'>
                  <p className="text-[14px]">{emptyState}</p>
                </div>}
              />
            </div>
          ) : (
            <div 
              className={`w-full ${infinityScroll ? "" : "max-h-[16.5vh] overflow-y-auto"}`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                touchAction: "pan-y"
              }}
            >
              {infinityScroll ? (
                <InfiniteScroll
                  dataLength={options.length}
                  next={infinityScroll.loadMore}
                  hasMore={infinityScroll.hasMore}
                  loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                  height="26.5vh"
                  className="w-full"
                >
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.id);
                    const isDisabled = isOptionDisabled(option.id);

                    return (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onMouseDown={
                          !isDisabled
                            ? handleItemClick(() => onToggleOption(option.id))
                            : undefined
                        }
                        className={cn(
                          "cursor-pointer w-full flex items-center",
                          isDisabled && "opacity-50 pointer-events-none"
                        )}
                        id={`${option.id}${id}`}
                      >
                        <div
                          id={`${option.id}${id}`}
                          className={cn(
                            "mr-2 flex h-[24px] w-[24px] items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-[#E8EAEE] border-[#142854] text-primary-foreground" : "opacity-50 bg-white border-[#98A2B3] [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon width={"4px"} className="text-blue-950"/>
                        </div>
                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                        {/* <span id={`${option.id}${id}`} className="truncate flex-1">{option.bankName}</span> */}
                        <div>
                             <BankAccountItem
                            account={option}
                            showBorder={true}
                           />
                        </div>
                      </CommandItem>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                options.map((option) => {
                  const isSelected = selectedValues.includes(option.id);
                  const isDisabled = isOptionDisabled(option.id);

                  return (
                    <div  key={option.id} className="px-3">
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onMouseDown={
                        !isDisabled
                          ? handleItemClick(() => onToggleOption(option.id))
                          : undefined
                      }
                      className={cn(
                        "cursor-pointer w-full bg-[#F2F2F2] flex items-center data-[selected=true]:bg-[#F2F2F2] mt-2 px-3",
                        isDisabled && "opacity-50 pointer-events-none"
                      )}
                      id={`${option.id}${id}`}
                    >
                      <div
                        id={`${option.id}${id}`}
                        className={cn(
                          "mr-2 flex h-[24px] w-[24px] items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-[#E8EAEE] border-[#142854] text-primary-foreground" : "opacity-50 bg-white border-[#98A2B3] [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon width={"4px"} className="text-blue-950"/>
                      </div>
                      {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                      {/* <span id={`${option.id}${id}`} className="truncate flex-1">{option.bankName}</span> */}
                      <div className="">
                             <BankAccountItem
                            account={option}
                            showBorder={false}
                           />
                        </div>
                    </CommandItem>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </CommandGroup>
        <CommandSeparator />
        {/* <CommandGroup className="hover:bg-white w-full">
          <div className="flex items-center justify-between w-full">
            {selectedValues.length > 0 && (
              <>
                <CommandItem
                  value="clear"
                  onMouseDown={handleItemClick(onClear)}
                  className="flex-1 justify-center cursor-pointer data-[selected=true]:bg-white w-full"
                >
                  Clear
                </CommandItem>
                <Separator orientation="vertical" className="flex min-h-6 h-full" />
              </>
            )}
            <CommandItem
              value="close"
              onSelect={() => onClose()}
              className="flex-1 justify-center cursor-pointer w-full data-[selected=true]:bg-white"
            >
              Close
            </CommandItem>
          </div>
        </CommandGroup> */}
      </CommandList>
       <div className='flex items-center gap-1 mt-2 w-full px-3 py-2'>
        <MdInfoOutline className='h-[20px] w-[20px] text-[#06792D]'/>
        <span className='text-[#142854] text-[14px]'>You can pay from one or more linked accounts</span>
    </div>
    </Command>
  );
};