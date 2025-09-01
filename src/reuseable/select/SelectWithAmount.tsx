import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteScrollProps } from '@/types/Component.type';
import SkeletonForLoanOrg from '../Skeleton-loading-state/Skeleton-for-loan-organizations';
import GeneralEmptyState from '../emptyStates/General-emptystate';
import { Book } from 'lucide-react';
import { formatAmount } from '@/utils/Format'; 

interface viewAllProgramProps {
  id?: string;
  name: string;
  totalAvailableAmount?: number;
  size?: number
}

interface ProgramSelectProps {
  selectedProgram: string | null;
  setSelectedProgram: (program: string) => void;
  isSelectOpen: boolean;
  setIsSelectOpen: (open: boolean) => void;
  selectOptions: viewAllProgramProps[];
  setId: (id: string) => void;
  label: string;
  placeholder: string;
  infinityScroll?: InfiniteScrollProps;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  emptyState?: string;
}

const SelectWithAmount: React.FC<ProgramSelectProps> = ({
  selectedProgram,
  setSelectedProgram,
  isSelectOpen,
  setIsSelectOpen,
  selectOptions,
  setId,
  placeholder,
  label,
  infinityScroll,
  isLoading,
  onOpenChange,
  emptyState = "No program available"
}) => {
  const uniqueId = `select${Math.random().toString(36).substring(2, 9)}`;

  const selectedProgramObj = selectOptions.find(program => program.name === selectedProgram);

  return (
    <div id="programContainer" className={'grid gap-2 w-full'}>
      <Label htmlFor={uniqueId}
             className="block text-[14px] font-medium leading-[22px] text-labelBlue">{label}</Label>
      <Select
        defaultValue={selectedProgram || undefined}
        value={selectedProgram || undefined}
        onValueChange={(value) => {
          const selectedProgram = selectOptions.find((program) => program.name === value);
          if (selectedProgram) {
            setId(selectedProgram.id ?? "");
          }
          setSelectedProgram(value);
        }}
        onOpenChange={(open) => {
          setIsSelectOpen(open);
          onOpenChange?.(open);
        }}
      >
        <SelectTrigger id="programSelectTrigger"
                       className={`${selectedProgram ? 'text-black500' : 'text-black300'} shadow-none mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650`}>
          <SelectValue placeholder={placeholder}>
            {selectedProgram && (
              <div className="flex items-center gap-3 truncate">
                <span className="font-normal text-[14px]">{selectedProgram}</span>
                {
                  <span className="text-[14px] bg-[#F2F2F2] px-2 rounded-xl">
                    {formatAmount(selectedProgramObj?.totalAvailableAmount)}
                  </span>
                }
              </div>
            )}
          </SelectValue>
          {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
            <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
        </SelectTrigger>
        <SelectContent 
          id="programSelectContent" 
          className="relative w-full"
          style={{ zIndex: 1000 }}
        >
          {isLoading ? (
            <div><SkeletonForLoanOrg/></div>
          ) : selectOptions?.length === 0 ? (
            <div>
              <GeneralEmptyState
                icon={Book}
                iconSize='1.6rem'
                iconContainerClass='w-[30px] h-[30px]'
                message={<div className='relative bottom-2'>
                  <p>{emptyState}</p>
                </div>}
              />
            </div>
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
                  dataLength={selectOptions.length}
                  next={infinityScroll.loadMore}
                  hasMore={infinityScroll.hasMore}
                  loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                  height="30.5vh"
                  className="w-full "
                >
                  <SelectGroup className="w-full">
                    {selectOptions?.map((item) => (
                      <SelectItem
                        id={item.id}
                        key={item.id}
                        value={item?.name}
                        className="text-lightBlue950 hover:bg-[#EEF5FF] focus:bg-[#EEF5FF] w-full !block group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <p className='truncate flex-grow mr-3 max-w-60'>
                            {item?.name}
                          </p>
                          {
                            <p className="text-xs bg-[#F2F2F2] px-2 rounded-xl whitespace-nowrap relative py-[1px] group-hover:bg-white">
                              {formatAmount(item.totalAvailableAmount)}
                            </p>
                          }
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </InfiniteScroll>
              ) : (
                <SelectGroup className="w-full">
                  {selectOptions?.map((item) => (
                    <SelectItem 
                      id={`program${item.name.replace(/\s+/g, '')}`}
                      className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950 group"
                      key={item.id} 
                      value={item.name}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className='truncate flex-grow mr-3 font-medium'>
                          {item?.name}
                        </div>
                        {
                          <div className="text-xs text-gray-500 bg-[#F2F2F2] px-2 rounded-xl whitespace-nowrap relative right-32 py-[1px] group-hover:bg-[#E0E0E0]">
                            {formatAmount(item?.totalAvailableAmount)}
                          </div>
                        }
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectWithAmount;