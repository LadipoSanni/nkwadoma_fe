import React, { useState, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { inter } from "@/app/fonts";
import { Formik, Form } from "formik";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import * as Yup from "yup";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import { Icon } from "@iconify/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteScrollProps } from '@/types/Component.type';
import SkeletonForLoanOrg from '@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations'
import GeneralEmptyState from '@/reuseable/emptyStates/General-emptystate'
import {Book} from 'lucide-react';
import { resetProgramName,resetProgramId } from "@/redux/slice/loan/selected-loan";
import { store } from "@/redux/store";

interface viewAllProgramProps  {
  id?: string;
  name: string;

}

interface filterProps {
  filterName: string;
  dropDownFilterName?: string;
  initialFormValue: {
    selectedProgram: string;
  };
  handleFilterSubmit: (values: { selectedProgram: string }) => void;
  valueName: string;
  selectedValue: string;
  handleSelectedValue: (value: string) => void;
  placeHolder: string;
  valueListData: viewAllProgramProps[];
  disabled?: boolean;
  infinityScroll?: InfiniteScrollProps;
  isLoading?: boolean;
  isProgramLoading?: boolean
}

function ProductFilter({
  filterName,
  dropDownFilterName,
  initialFormValue,
  handleFilterSubmit,
  valueName,
  selectedValue,
  handleSelectedValue,
  placeHolder,
  valueListData,
    disabled,
    isLoading,
    isProgramLoading,
    infinityScroll
}: filterProps) {
  const [isDropdown, setIsDropdown] = useState(false);


  const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
  }, []);

  const validationSchema = Yup.object().shape({
    [valueName]: Yup.string().required("Program is required"),
  });

  const getButtonDisplayText = () => {
    if (selectedValue) {
      return selectedValue; 
    }
    return filterName; 
  };

  return (
    <div className={`z-10 ${inter.className}`}>
      <DropdownMenu onOpenChange={toggleDropdown}>
        <DropdownMenuTrigger disabled={disabled} asChild>
          <Button
            variant={"default"}
            className={`w-full  ${ disabled ? `text-[#b8b8bc]` : `text-black` }  bg-neutral100 h-11 md:h-11 border-1  hover:bg-neutral100 ring-1 ring-neutral650 focus-visible:ring-neutral650 shadow-none`}
          >
             {getButtonDisplayText()}
            <span className="ml-4">
              {isDropdown ? (
                <ChevronUpIcon className="h-4 w-5 font-semibold" />
              ) : (
                <ChevronDownIcon className="h-4 w-5 font-semibold" />
              )}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 relative left-[-30px] md:left-[-100px] px-4 pb-6 z-[1000rem]">
          <DropdownMenuLabel className={``} data-testid="program">
            {dropDownFilterName}
          </DropdownMenuLabel>
          <Formik
            initialValues={initialFormValue}
            onSubmit={handleFilterSubmit}
            validateOnMount={true}
            validationSchema={validationSchema}
          >
            {({ isValid, setFieldValue, resetForm }) => (
              <Form>
                <Select
                  value={selectedValue}
                  onValueChange={(value: string) => {
                    handleSelectedValue(value);
                    setFieldValue(valueName, value);
                  }}
                  onOpenChange={toggleDropdown}
                >
                  <SelectTrigger className="flex justify-between w-72  focus:ring-0 focus:outline-none text-forgetPasswordBlue h-10">
                    <SelectValue
                      placeholder={placeHolder}
                      className=""
                      data-testid="Select Program"
                    />
                    <div className="ml-4">
                      {isDropdown ? (
                        <ChevronUpIcon className="h-4 w-5 font-semibold" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-5 font-semibold" />
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="border-none border-[#FAFBFC] text-[#404653]  text-sm z-50 mt-3 max-h-64">
                    {
                       isProgramLoading ? (<div>
                        <SkeletonForLoanOrg/>
                       </div>) : valueListData.length === 0 ? (<div>
                        <div className='relative bottom-6'>
                            <GeneralEmptyState
                                icon={Book}
                                iconSize='1.6rem'
                                iconContainerClass='w-[30px] h-[30px]'
                                message={<div className='relative bottom-2'>
                                    <p>No program available</p>
                                </div>}
                            />
                        </div>
                       </div>) : (
                        <div>
                       { infinityScroll && ( <InfiniteScroll
                         dataLength={valueListData.length}
                         next={infinityScroll.loadMore}
                         hasMore={infinityScroll.hasMore}
                         loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                        height="30.5vh"
                         className="w-full"
                        >
                         <SelectGroup>
                      {valueListData.map((value, index) => (
                        <SelectItem
                          key={value.id}
                          id={`${value}-${index}`}
                          value={value.name}
                          className="hover:bg-blue-200"
                        >
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>

                        </InfiniteScroll> )}

                       </div>)
                    }
                  </SelectContent>
                </Select>
                <div className="flex justify-between items-center pt-1">
                  <Button
                    id="resetButton"
                    // type="reset"
                    variant={`outline`}
                    className="text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]"
                    onClick={() => {
                      resetForm();
                      handleSelectedValue("");
                      store.dispatch(resetProgramName())
                      store.dispatch(resetProgramId())
                    }}
                  >
                    Reset
                  </Button>
                  <DropdownMenuItem className="hover:bg-none">
                    <Button
                      id="filterButton"
                      variant={"default"}
                      className={`${
                        !isValid
                          ? "bg-neutral650 cursor-not-allowed  h-[38px] "
                          : "bg-meedlBlue h-[38px] cursor-pointer hover:bg-meedlBlue"
                      }font-bold  w-[80px]  text-white`}
                      type="submit"
                      disabled={!isValid}
                    >
                      {isLoading ? (
                        <div
                          id={"loadingLoopIconDiv"}
                          className="flex items-center justify-center"
                        >
                          <Icon
                            id={"Icon"}
                            icon={loadingLoop}
                            width={24}
                            height={24}
                          />
                        </div>
                      ) : (
                        "Filter"
                      )}
                    </Button>
                  </DropdownMenuItem>
                </div>
              </Form>
            )}
          </Formik>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProductFilter;
