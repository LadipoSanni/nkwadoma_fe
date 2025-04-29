import React, { ReactNode, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { MdCheck } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonForLoanOrg from '../Skeleton-loading-state/Skeleton-for-loan-organizations';
import GeneralEmptyState from '../emptyStates/General-emptystate';
import { MdOutlinePeopleOutline } from 'react-icons/md';

type InfiniteScrollProps = {
  hasMore: boolean;
  loadMore: () => void;
  loader?: ReactNode;
};


type SelectItemType = {
  id: string ;
  organizationName: string;
  userIdentity: {
    firstName: string,
    lastName: string,

  }
};

type Props = {
  id?: string;
  value?: string; 
  onChange: (value: string) => void; 
  className?: string;
  selectContent: SelectItemType[]; 
  name?: string;
  placeholder?: string;
  triggerId?: string;
  isItemDisabled: (item: SelectItemType) => boolean;
  additionalContent?: ReactNode | ((props: { closeDropdown: () => void }) => ReactNode);
  selectItemCss?: string
  infinityScroll?: InfiniteScrollProps
  isLoading?: boolean
  isFinancier?:(value: boolean) => void;
  button?: ReactNode | ((props: { closeDropdown: () => void }) => ReactNode);
};

function CustomSelectId({
  id,
  value,
  onChange,
  className = '',
  selectContent = [],
  name,
  placeholder = 'Select an option',
  triggerId,
  isItemDisabled,
  additionalContent,
  selectItemCss,
  infinityScroll,
  isLoading,
  isFinancier,
  button
}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const getDisplayValue = (id: string) => {
    const item = selectContent.find(item => String(item.id) === id);
    return item?.organizationName || `${item?.userIdentity?.firstName} ${item?.userIdentity?.lastName}`;
  };

  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (isFinancier) {
        isFinancier(open);
      }}} 
      open={isOpen}
    >
      <SelectTrigger
        id={triggerId}
        className={`h-12 w-full flex justify-between border border-gray-300 rounded-md focus:ring-0 focus:outline-none shadow-none ${className}`}
        role="combobox"
      >
        <SelectValue
          data-testid="select-value"
          placeholder={placeholder}
          id={id ? `select-${id}` : undefined}
        >
          
          {/* {value
            ? selectContent.find((item) => String(item.id) === value)?.organizationName
            : placeholder} */}
            {value ? getDisplayValue(value) : placeholder}
        </SelectValue>
        {isOpen ? (
          <ChevronUpIcon data-testid="chevron-up" className="h-4 w-4" />
        ) : (
          <ChevronDownIcon data-testid="chevron-down" className="h-4 w-4" />
        )}
      </SelectTrigger>
      <SelectContent
        data-testid="select-content"
        className="border border-gray-100 text-gray-700 text-sm bg-white"
        style={{ zIndex: 1000, }}
        id='idselect'
      >
       
        {isLoading? (<div><SkeletonForLoanOrg/></div>) :  selectContent.length === 0? (<div>
          <div className='relative bottom-6'>
                <GeneralEmptyState
                icon={MdOutlinePeopleOutline}
                iconSize='1.6rem'
                iconContainerClass='w-[30px] h-[30px]'
                message={<div className='relative bottom-2'>
                  <p>No financier available</p>
                    <div>
                    {button &&
                (typeof button === "function"
                  ? button({ closeDropdown })
                  : button)
                  }
                    </div>
                </div>}
                />
           </div>
        </div>) :
        <div className={`overflow-y-auto w-full overflow-x-auto ${infinityScroll? "" : "max-h-[26vh]"}`} 
         style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
       {  infinityScroll? (
        <InfiniteScroll
           dataLength={selectContent.length}
           next={infinityScroll.loadMore}
           hasMore={infinityScroll.hasMore}
           loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
          //  scrollableTarget="select-content"
           className="min-w-full w-max"
           height="26.5vh"
           
        >
           <SelectGroup className='min-w-full w-max'>
        {selectContent.map((item) => {
            const disabled =  isItemDisabled(item) ;
            const selected = value === item.id;

          return (
              <SelectItem
                id={item.id}
                key={item.id}
                value={String(item.id)}
                data-testid={`select-item-${item.id}`}
                className={`${selectItemCss} cursor-pointer hover:bg-gray-50 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
              >
                <div className="flex items-center justify-end w-full whitespace-nowrap">
                  <span className='w-full'>{item.organizationName? item.organizationName : item.userIdentity?.firstName + " " + item.userIdentity?.lastName }</span>
                  <div className='flex items-center justify-center absolute right-2 '>
                  {(disabled || selected) && (
                    <MdCheck className="h-4 w-4 text-[#BABABA] ml-2 " />
                  )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
       </InfiniteScroll>) 
       : (
        <SelectGroup className='min-w-full w-max'>
        {selectContent.map((item) => {
            const disabled =  isItemDisabled(item) ;
            const selected = value === item.id;
            return (
              <SelectItem
                key={item.id}
                value={String(item.id)}
                data-testid={`select-item-${item.id}`}
                className={`${selectItemCss} cursor-pointer hover:bg-gray-50 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
              >
                <div className="flex items-center justify-end w-full whitespace-nowrap">
                  <span className='w-full'>{item.organizationName? item.organizationName : item.userIdentity?.firstName + " " + item.userIdentity?.lastName }</span>
                  <div className='flex items-center justify-center absolute right-2 '>
                  {(disabled || selected) && (
                    <MdCheck className="h-4 w-4 text-[#BABABA] ml-2 " />
                  )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      )}
       
        {additionalContent &&
          (typeof additionalContent === "function"
            ? additionalContent({ closeDropdown })
            : additionalContent)
            }
             </div>
        }
      </SelectContent>
    </Select>
  );
}


export default CustomSelectId;


