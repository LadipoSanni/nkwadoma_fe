import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";


interface FormValues {
    selectValue: string;
}

interface DropdownSelectProps {
    selectValue: string;
    listOfItems: { id: string; name: string }[];
    initialFormValue: FormValues;
    validationSchema: Yup.ObjectSchema<FormValues>;
    handleSelectChange: (value: string) => void;
    handleSubmit: (values: FormValues) => void;
    handleReset: () => void;
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    isLoading: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
                                                           selectValue,
                                                           listOfItems,
                                                           initialFormValue,
                                                           validationSchema,
                                                           handleSelectChange,
                                                           handleSubmit,
                                                           handleReset,
                                                           isDropdownOpen,
                                                           toggleDropdown,
                                                           isLoading,
                                                       }) => {
    return (
        <div className='z-10'>
            <DropdownMenu onOpenChange={toggleDropdown}>
                <DropdownMenuTrigger asChild>
                    <Button id='dropdownSelectButton' variant={'default'} className='w-full text-black bg-neutral100 h-11 border-1 hover:bg-neutral100 ring-1 ring-neutral650 focus-visible:ring-neutral650 shadow-none'>
                        {!selectValue ? "Type" : selectValue}
                        <span className='ml-4'>
              {isDropdownOpen ? (
                  <ChevronUpIcon className="h-4 w-5 font-semibold" />
              ) : (
                  <ChevronDownIcon className="h-4 w-5 font-semibold" />
              )}
            </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2 relative left-[-30px] md:left-[-100px] px-4 pb-6 z-[1000rem]'>
                    <DropdownMenuLabel data-testid="dropdownLabel">Type</DropdownMenuLabel>
                    <Formik
                        initialValues={initialFormValue}
                        onSubmit={handleSubmit}
                        validateOnMount={true}
                        validationSchema={validationSchema}
                    >
                        {({ isValid, setFieldValue, resetForm }) => (
                            <Form>
                                <Select
                                    value={selectValue}
                                    onValueChange={(value: string) => {
                                        handleSelectChange(value);
                                        setFieldValue("selectValue", value);
                                    }}
                                    onOpenChange={toggleDropdown}
                                >
                                    <SelectTrigger id='dropdownSelectTrigger' className='flex justify-between w-72 focus:ring-0 focus:outline-none text-forgetPasswordBlue'>
                                        <SelectValue placeholder="Select type" className='' data-testid='Select Item' />
                                        <div className='ml-4'>
                                            {isDropdownOpen ? (
                                                <ChevronUpIcon className="h-4 w-5 font-semibold" />
                                            ) : (
                                                <ChevronDownIcon className="h-4 w-5 font-semibold" />
                                            )}
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className='border-none border-[#FAFBFC] text-[#404653] text-sm z-50'>
                                        <SelectGroup>
                                            {listOfItems.map((item, index) => (
                                                <SelectItem key={item.id} id={`${item.id}-${index}`} value={item.name} className='hover:bg-blue-200'>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className='flex justify-between items-center pt-7'>
                                    <Button
                                        id='resetButton'
                                        variant={`outline`}
                                        className='text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
                                        onClick={() => {
                                            resetForm();
                                            handleReset();
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <DropdownMenuItem className='hover:bg-none'>
                                        <Button
                                            id='filterButton'
                                            variant={'default'}
                                            className={`${!isValid ? "bg-neutral650 cursor-not-allowed h-[38px]" : "bg-meedlBlue h-[38px] cursor-pointer hover:bg-meedlBlue"} font-bold w-[80px] text-white`}
                                            type='submit'
                                            disabled={!isValid}
                                        >
                                            {isLoading ? (
                                                <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} width={24} height={24} />
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
};

export default DropdownSelect;