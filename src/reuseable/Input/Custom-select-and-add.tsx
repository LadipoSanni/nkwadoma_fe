import React,{useRef, useState, useCallback, useEffect} from 'react'
import {Select, SelectTrigger, SelectContent,  SelectGroup} from '@/components/ui/select'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {Form, Formik,Field,FormikHelpers} from "formik";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import * as Yup from "yup";
import { formatPlaceName } from "@/utils/GlobalMethods";
import SearchInput from "@/reuseable/Input/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteScrollProps } from '@/types/Component.type';
import SkeletonForLoanOrg from '../Skeleton-loading-state/Skeleton-for-loan-organizations';
import GeneralEmptyState from '../emptyStates/General-emptystate';
import { Book } from 'lucide-react';
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
import {MdSearch} from 'react-icons/md';

type SelectItem = {
    id?: string;
    name: string;
};

type InitialValuesType = {
    name: string;
};

type Props = {
    id?: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    selectContent?: Array<string | number | SelectItem>;
    name?: string;
    placeHolder?: string;
    triggerId?: string;
    showRestButton?: boolean;
    handleReset?: () => void;
    isItemDisabled?: (item: string | number | SelectItem) => boolean;
    infinityScroll?: InfiniteScrollProps;
    searchTerm?: string;
    setSearchTerm?: (value: string) => void;
    isloading?: boolean,
    emptyState?: string,
    showSearch? : boolean,
};

function CustomSelect({
    value,
    onChange,
    className,
    selectContent = [],
    name,
    showRestButton,
    placeHolder,
    id,
    triggerId,
    isItemDisabled,
    handleReset,
    searchTerm = "",
    setSearchTerm = () => {},
    isloading,
    emptyState,
    infinityScroll,
    showSearch,
  }: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [shouldResetOnOpen, setShouldResetOnOpen] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const otherFieldTimeoutRef = useRef<NodeJS.Timeout>(); 

    const handleSearchChange = useCallback((value: string) => {
      setLocalSearchTerm(value);
    
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
      }, 1000);
    }, [setSearchTerm]);

  
    const handleOtherFieldSearch = useCallback((value: string) => {
      if (otherFieldTimeoutRef.current) {
        clearTimeout(otherFieldTimeoutRef.current);
      }
      
      otherFieldTimeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
      }, 1000);
    }, [setSearchTerm]);
    
    useEffect(() => {
      setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    const handleDropdownOpen = (open: boolean) => {
      setDropdownOpen(open);
      
      if (open) {
        if (shouldResetOnOpen || searchTerm) {
          setLocalSearchTerm("");
          setSearchTerm("");
          setShouldResetOnOpen(false);
        }
        
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 300);
      } else {
        setShouldResetOnOpen(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (otherFieldTimeoutRef.current) {
          clearTimeout(otherFieldTimeoutRef.current);
        }
      }
    };
  
    const initialFormValue = { name: "" };
  
    const handleSubmit = (
      values: typeof initialFormValue, 
      { resetForm }: FormikHelpers<InitialValuesType>
    ) => {
      if (values.name.trim()) {
        const trimmed = values.name.trim();
        onChange(trimmed); 
        setTimeout(() => {
          setDropdownOpen(false);
          setSearchTerm("");
          setLocalSearchTerm("");
          resetForm(); 
        }, 100); 
      }
    };
  
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .required("required")    
    });
  
    const handle = () => {
      if (handleReset) {
        handleReset();
      }
      setDropdownOpen(false);
    };
  
    const handleItemClick = (itemValue: string) => {
      if (itemValue && itemValue.trim()) {
        onChange(itemValue);
        setDropdownOpen(false); 
        setTimeout(() => {
          setSearchTerm(""); 
          setLocalSearchTerm("");
        }, 100);
      }
    };

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
      
      if (e.key === 'Enter') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setSearchTerm(localSearchTerm);
      }
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (otherFieldTimeoutRef.current) {
          clearTimeout(otherFieldTimeoutRef.current);
        }
      };
    }, []);
  
    const filteredContent = selectContent?.filter(content => {
      const value = typeof content === 'object' ? content.name : String(content);
      return value && value.trim() !== "";
    }) || [];
  
    const CustomListItem = ({ 
      value, 
      display, 
      disabled = false,
      onClick 
    }: {
      value: string;
      display: string;
      disabled?: boolean;
      onClick: (value: string) => void;
    }) => {
      return (
        <div
          onClick={() => !disabled && onClick(value)}
          className={`
            relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none
            hover:bg-[#EEF5FF] focus:bg-[#EEF5FF]
            ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          `}
          tabIndex={-1}
        >
          {display}
        </div>
      );
    };
  
    return (
      <div>
        <Select
          name={name}
          value={value}
          onValueChange={handleItemClick}
          onOpenChange={handleDropdownOpen} 
          open={dropdownOpen}
        >
          <SelectTrigger
            id={triggerId}
            className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
            role="button"
            onKeyDown={(e) => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }
            }}
          >
            <div className="" data-testid="SelectContent"  id={`selectId${id}`}>
              {value ? capitalizeFirstLetters(value) : <span className='opacity-35'>{placeHolder}</span>}
            </div>
            <div className="">
              {dropdownOpen ? (
                <ChevronUpIcon data-testid="ChevronUpIcon" id="chevronUp" className="h-4 font-semibold" />
              ) : (
                <ChevronDownIcon data-testid="ChevronDownIcon" id="chevronDown" className="h-4 font-semibold" />
              )}
            </div>
          </SelectTrigger>
          <SelectContent
            id="generalSelectContent"
            className="border-none border-[#FAFBFC] text-[#404653] text-sm max-h-full overflow-visible"
            style={{ zIndex: 1000 }}
          >
            {showSearch && (
              <div className='w-full mb-3 px-2 border-black border-opacity-30 border-solid border-b-[1px] pb-3'>
                <SearchInput
                  testId='search-input'
                  id="staffSearchLoanee"
                  value={localSearchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    handleSearchChange(value);
                  }}
                  style="md:w-full w-full"
                  onKeyDown={handleSearchInputKeyDown}
                  ref={searchInputRef}
                  autoFocus={dropdownOpen}
                />
              </div>
            )}
  
            {isloading ? (
              <div><SkeletonForLoanOrg className='h-8'/></div>
            ) : (searchTerm && filteredContent.length === 0) || filteredContent.length === 0 ? (
              <div className='relative bottom-14'>
                <GeneralEmptyState
                  icon={searchTerm ? MdSearch : Book}
                  iconSize='1.6rem'
                  iconContainerClass='w-[30px] h-[30px]'
                  message={<div className='relative bottom-2'>
                    <p>{searchTerm ? "Not found" : emptyState}</p>
                  </div>}
                  className='h-14'
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
                    dataLength={filteredContent.length}
                    next={infinityScroll.loadMore}
                    hasMore={infinityScroll.hasMore}
                    loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                    height="18vh"
                    className="w-full"
                    key={`infinite-scroll-${filteredContent.length}`}
                  >
                    <SelectGroup className="selectgroup">
                      {filteredContent.map((content, index) => {
                        const itemValue = typeof content === 'object' ? content.name : String(content);
                        const itemDisplay = typeof content === 'object' ? content.name : String(content);
                        
                        const itemId = typeof content === 'object' 
                          ? content.id || `obj-${content.name}-${index}`
                          : `str-${String(content)}-${index}`;
  
                        const disabled = isItemDisabled ? isItemDisabled(content) : false;
  
                        return (
                          <CustomListItem
                            key={itemId}
                            value={itemValue}
                            display={capitalizeFirstLetters(itemDisplay)}
                            disabled={disabled}
                            onClick={handleItemClick}
                          />
                        );
                      })}
                    </SelectGroup>
                  </InfiniteScroll>
                ) : (
                  <SelectGroup className="selectgroup max-h-36 overflow-y-scroll overflow-x-hidden">
                    {filteredContent.map((content, index) => {
                      const itemValue = typeof content === 'object' ? content.name : String(content);
                      const itemDisplay = typeof content === 'object' ? content.name : String(content);
                      
                      const itemId = typeof content === 'object' 
                        ? content.id || `obj-${content.name}-${index}`
                        : `str-${String(content)}-${index}`;

                      const disabled = isItemDisabled ? isItemDisabled(content) : false;

                      return (
                        <CustomListItem
                          key={itemId}
                          value={itemValue}
                          display={itemDisplay}
                          disabled={disabled}
                          onClick={handleItemClick}
                        />
                      );
                    })}
                  </SelectGroup>
                )}
              </div>
            )}
  
            {showRestButton && value !== 'Month' ? (
              <button onClick={handle} className={`grid hover:border w-full`}>
                All
              </button>
            ) : null}
  
            <div className='border-solid border-t-[1px] pt-3 mt-2 border-black border-opacity-30 px-2'>
              <Formik
                initialValues={initialFormValue || {}}
                validateOnMount={true}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({setFieldValue, isValid, values}) =>{ 

                    const shouldDisableButton = !isValid || (localSearchTerm !== "" && filteredContent.length !== 0);

                    return (
                    
                  <Form className={`${inter.className}`}>
                    <div>
                      <Label htmlFor="other">Other</Label>  
                      <div className='flex items-center justify-center gap-2 mb-2'>
                        <Field
                          id="name"
                          data-testid="vendorName"
                          name="name"
                          value={values.name}
                          className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                          placeholder="Enter Provider name"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            const formattedValue = formatPlaceName(value, true);
                            const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                            if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {
                              setFieldValue("name", cleanedValue.substring(1));
                            } else {
                              setFieldValue("name", cleanedValue);
                            }
                            // Also trigger search when typing in Other field
                            handleOtherFieldSearch(cleanedValue);
                          }}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          className={`h-11 w-24 relative top-1 ${shouldDisableButton ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                          variant={"secondary"}
                          type={"submit"}
                          disabled={shouldDisableButton}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}}
              </Formik>
            </div>
          </SelectContent>
        </Select>
      </div>
    );
  }

export default CustomSelect;