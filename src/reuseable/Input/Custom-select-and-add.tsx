import React,{useRef, useState,useEffect} from 'react'
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup} from '@/components/ui/select'
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
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
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
    isTyping?: boolean
};

function CustomSelect({
                          value,
                          onChange,
                          className,
                          selectContent,
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
                          isTyping
                      }: Props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleBlur = () => {
          console.log("Search input lost focus");
        };
      
        const input = searchInputRef.current;
        input?.addEventListener("blur", handleBlur);
      
        return () => {
          input?.removeEventListener("blur", handleBlur);
        };
      }, []);

    const handleDropdownOpen = (open: boolean) => {
        setDropdownOpen(open);
        
        if (open) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 150);
        } else {
            if (!open && searchTerm) {
                setSearchTerm("");
              }
        }
    };


    const initialFormValue ={ name: "" }

    const handleSubmit = (values: typeof initialFormValue, 
        { resetForm }: FormikHelpers<InitialValuesType>) => {
            if (values.name.trim()) {
                const trimmed = values.name.trim();
                onChange(trimmed); 
                setTimeout(() => {
                  setDropdownOpen(false);
                  if (!open && searchTerm) {
                    setSearchTerm("");
                }
                  resetForm(); 
                }, 100); 
              }
    }

    const validationSchema = Yup.object().shape({
       name: Yup.string()
          .trim()
          .required("Obligor limit is required")    
     });

   
    const handle = () => {
        if (handleReset){
            handleReset();

        }
        setDropdownOpen(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (dropdownOpen && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const handleSelectItemClick = (value: string) => {
        if (value && value.trim()) {
            onChange(value);
            setDropdownOpen(false); 
            setTimeout(() => {
                setSearchTerm(""); 
              }, 100);
          }
    }

    return (
        <div>
            <Select
                name={name}
                value={value}
               onValueChange={handleSelectItemClick}
                onOpenChange={handleDropdownOpen} 
                open={dropdownOpen}
            >
                <SelectTrigger
                    id={triggerId}
                    className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
                     role="button"
                     onKeyDown={handleKeyDown}
                >
                    <SelectValue className="" data-testid="SelectContent" placeholder={placeHolder} id={`selectId${id}`} >
                    {value ? capitalizeFirstLetters(value) : placeHolder}
                    </SelectValue>
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
                    className="border-none border-[#FAFBFC] text-[#404653] text-sm max-h-full  overflow-visible"
                    style={{ zIndex: 1000 }}
                    onKeyDown={handleKeyDown}
                   
                >
                {!showSearch? "" :  <div className='w-full mb-3 px-2 border-black border-opacity-30 border-solid border-b-[1px] pb-3'>
      <SearchInput
          testId='search-input'
          id="staffSearchLoanee"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value);
          }}
          style="md:w-full w-full"
          onKeyDown={(e: React.KeyboardEvent) => {                          
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }}
        ref={searchInputRef}
         />
       </div>}

                   { isloading ? (
            <div><SkeletonForLoanOrg className='h-8'/></div>
          ) 
        
          :  (searchTerm &&  selectContent?.length === 0) || selectContent?.length === 0 ? (
            <div className='relative bottom-2'>
              <GeneralEmptyState
                icon={ searchTerm? MdSearch : Book}
                iconSize='1.6rem'
                iconContainerClass='w-[30px] h-[30px]'
                message={<div className='relative bottom-2'>
                  <p>{searchTerm? "Not found" : emptyState}</p>
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
            {
               infinityScroll ? (
                <InfiniteScroll
                  dataLength={selectContent?.length || 0}
                  next={infinityScroll.loadMore}
                  hasMore={infinityScroll.hasMore}
                  loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                  height="18vh"
                  className="w-full"
                >

<SelectGroup 
                    className="selectgroup "

                    >
                        {selectContent?.filter(content => {
    const value = typeof content === 'object' ? content.name : String(content);
    return value && value.trim() !== "";
  })?.map((content, index) => {
                            const itemValue = typeof content === 'object' ? content.name : String(content);
                            const itemDisplay = typeof content === 'object' ? content.name : String(content);
                            
                            const itemId = typeof content === 'object' 
            ? content.id || `obj-${content.name}-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
            : `str-${String(content)}-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;


                            return (
                                <div key={itemId} id={itemId}>
                                    <SelectItem
                                        key={`${itemId}-selectitem`}
                                        onClick={() => handleSelectItemClick(itemValue)}
                                        value={itemValue}
                                        className={`${itemValue} hover:bg-[#EEF5FF]`}
                                        disabled={isItemDisabled ? isItemDisabled(content) : false}
                                    >
                                        {itemDisplay}
                                    </SelectItem>
                                </div>
                            );
                        })}
                    </SelectGroup>
                </InfiniteScroll> ) :  <SelectGroup 
                    className="selectgroup max-h-36 overflow-y-scroll overflow-x-hidden"

                    >
                        {selectContent?.filter(content => {
    const value = typeof content === 'object' ? content.name : String(content);
    return value && value.trim() !== "";
  })?.map((content, index) => {
                            const itemValue = typeof content === 'object' ? content.name : String(content);
                            const itemDisplay = typeof content === 'object' ? content.name : String(content);
                            
                            const itemId = typeof content === 'object' 
            ? content.id || `obj-${content.name}-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
            : `str-${String(content)}-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;


                            return (
                                <div key={itemId} id={itemId}>
                                    <SelectItem
                                         key={`${itemId}-selectitem`}
                                         onClick={() => handleSelectItemClick(itemValue)}
                                        value={itemValue}
                                        className={`${itemValue} hover:bg-[#EEF5FF]`}
                                        disabled={isItemDisabled ? isItemDisabled(content) : false}
                                    >
                                        {itemDisplay}
                                    </SelectItem>
                                </div>
                            );
                        })}
                    </SelectGroup>
            }
             
          </div>)

                    }
                    {showRestButton && value !== 'Month' ?
                        <button  onClick={handle} className={` grid hover:border w-full  `}>
                            All
                        </button>
                        : null
                    }
                    <div className='border-solid border-t-[1px] pt-3 mt-2 border-black border-opacity-30 px-2'>
                         <Formik
                         initialValues={initialFormValue || {}}
                         validateOnMount={true}
                         onSubmit={handleSubmit}
                         validationSchema={validationSchema}
                         >
                        {
                             ({setFieldValue,isValid,values}) => (
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
                                    const formattedValue = formatPlaceName(value,true);
                                    const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                                    if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {
                                        
                                        setFieldValue("name", cleanedValue.substring(1));
                                    } else {
                                        setFieldValue("name", cleanedValue);
                                    }
                                    }}
                                    onKeyDown={(e: React.KeyboardEvent) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                    }}
                                  />
                                  <Button
                                   className={`h-11 w-24 relative top-1  ${!isValid ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                                   variant={"secondary"}
                                   type={"submit"}
                                   disabled={!isValid}
                                  >
                                   Add
                                    </Button>
                                  </div>
                                </div>
                                </Form>
                             )
                        }
                         </Formik>
                    </div>
                </SelectContent>
            </Select>
        </div>
    );
}

export default CustomSelect;