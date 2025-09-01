"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
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

interface MultiSelectContentProps {
  options: { id: string; name: string; icon?: React.ComponentType<{ className?: string }> }[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
  onToggleAll: () => void;
  selectAllcondition?: boolean;
  id?: string;
  restrictedItems?: string[];
  infinityScroll?: InfiniteScrollProps;
  isLoading?: boolean;
}

export const MultiSelectContent = ({
  options,
  selectedValues,
  onToggleOption,
  onClear,
  onClose,
  onToggleAll,
  selectAllcondition = false,
  id,
  restrictedItems = [],
  infinityScroll,
  isLoading = false,
}: MultiSelectContentProps) => {
  const handleItemClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    callback();
  };

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
          
          {isLoading ? (
            <div><SkeletonForLoanOrg/></div>
          ) : (
            <div 
              className={`w-full ${infinityScroll ? "" : "max-h-[26.5vh] overflow-y-auto"}`}
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
                  height="30.5vh"
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
                          "cursor-pointer w-64 md:w-72",
                          isDisabled && "opacity-50 pointer-events-none"
                        )}
                        id={`${option.name}${id}`}
                      >
                        <div
                          id={`${option.name}${id}`}
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-blue-950 text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon width={"4px"} />
                        </div>
                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                        <span id={`${option.name}${id}`}>{option.name}</span>
                      </CommandItem>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                options.map((option) => {
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
                        "cursor-pointer w-64 md:w-72",
                        isDisabled && "opacity-50 pointer-events-none"
                      )}
                      id={`${option.name}${id}`}
                    >
                      <div
                        id={`${option.name}${id}`}
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-blue-950 text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon width={"4px"} />
                      </div>
                      {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                      <span id={`${option.name}${id}`}>{option.name}</span>
                    </CommandItem>
                  );
                })
              )}
            </div>
          )}
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