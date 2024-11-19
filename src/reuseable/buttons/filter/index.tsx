"use client"
import React from 'react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import {Button} from "@/components/ui/button";
// import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
// import {Form, Formik} from "formik";
// import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
// import {Icon} from "@iconify/react";
// import loadingLoop from "@iconify/icons-line-md/loading-loop";
// import {initialFormValue, programData} from "@/pages/admin/cohort/cohort-view";

// interface props {
//     handleFilter : (value: string) => void;
//     buttonTitle: string,
// }

const filterButton = () => {

    // const [isDropdown,setIsDropdown] = React.useState(false)
    // const [selectProgram, setSelectProgram] = useState('')
    // const [isLoading] = useState(false);
    //
    //
    //
    // const toggleDropdown = useCallback(() => {
    //     setIsDropdown((prev) => !prev);
    //     // console.log(isDropdown)
    // }, []);
    return(
        <div></div>
    )

    // return (
    //     <div className='z-10'>
    //         <DropdownMenu onOpenChange={toggleDropdown}>
    //             <DropdownMenuTrigger asChild>
    //                 <Button variant={'default'}
    //                         className='w-full text-black  bg-neutral100 h-11 border-1  hover:bg-neutral100 ring-1 ring-neutral650 focus-visible:ring-neutral650 shadow-none'>
    //                     {buttonTitle}
    //                     <span className='ml-4'>
    //                   {isDropdown ? (
    //                       <ChevronUpIcon className="h-4 w-5 font-semibold"/>
    //                   ) : (
    //                       <ChevronDownIcon className="h-4 w-5 font-semibold"/>
    //                   )}
    //                 </span>
    //                 </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className='mt-2 relative left-[-30px] md:left-[-100px] px-4 pb-6 z-[1000rem]'>
    //                 <DropdownMenuLabel data-testid="program">Program</DropdownMenuLabel>
    //                 <Formik
    //                     initialValues={initialFormValue}
    //                     onSubmit={handleSubmit}
    //                     validateOnMount={true}
    //                     validationSchema={validationSchema}
    //                 >
    //                     {({isValid, setFieldValue, resetForm}) => (
    //                         <Form>
    //                             <Select
    //                                 value={selectProgram}
    //                                 onValueChange={(value: string) => {
    //                                     handleFilter(value);
    //                                     setFieldValue("selectProgram", value);
    //                                 }}
    //                                 onOpenChange={toggleDropdown}
    //                             >
    //                                 <SelectTrigger
    //                                     className='flex justify-between w-72  focus:ring-0 focus:outline-none text-forgetPasswordBlue'>
    //                                     <SelectValue placeholder="Select Program" className=''
    //                                                  data-testid='Select Program'/>
    //                                     <div className='ml-4'>
    //                                         {isDropdown ? (
    //                                             <ChevronUpIcon className="h-4 w-5 font-semibold"/>
    //                                         ) : (
    //                                             <ChevronDownIcon className="h-4 w-5 font-semibold"/>
    //                                         )}
    //                                     </div>
    //
    //                                 </SelectTrigger>
    //                                 <SelectContent
    //                                     className='border-none border-[#FAFBFC] text-[#404653]  text-sm z-50'
    //                                 >
    //                                     <SelectGroup
    //                                         className=''
    //                                     >
    //                                         {Object.entries(programData).map(([key, value]) => (
    //                                             <SelectItem key={key} value={value} className='hover:bg-blue-200'>
    //                                                 {value}
    //                                             </SelectItem>
    //                                         ))}
    //                                     </SelectGroup>
    //
    //                                 </SelectContent>
    //
    //                             </Select>
    //                             {/* <div>
    //                     {errors.selectProgram && touched.selectProgram && ( <div className='text-red-500'>{errors.selectProgram}</div>)}
    //                   </div> */}
    //                             <div className='flex justify-between items-center pt-7'>
    //
    //                                 <Button
    //                                     id='resetButton'
    //                                     // type="reset"
    //                                     variant={`outline`}
    //                                     className='text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
    //                                     onClick={() => {
    //                                         resetForm();
    //                                         setSelectProgram("")
    //                                     }}
    //                                 >
    //                                     Reset
    //                                 </Button>
    //                                 <DropdownMenuItem className='hover:bg-none'>
    //                                     <Button
    //                                         id='filterButton'
    //                                         variant={'default'}
    //                                         className={`${!isValid ? "bg-neutral650 cursor-not-allowed  h-[38px] " : "bg-meedlBlue h-[38px] cursor-pointer hover:bg-meedlBlue"}font-bold  w-[80px]  text-white`
    //                                         }
    //                                         type='submit'
    //                                         disabled={!isValid}
    //                                     >
    //                                         {isLoading ? (
    //                                             <div id={'loadingLoopIconDiv'}
    //                                                  className="flex items-center justify-center">
    //                                                 <Icon id={'Icon'} icon={loadingLoop} width={24} height={24}/>
    //                                             </div>
    //                                         ) : (
    //                                             "Filter"
    //                                         )}
    //                                     </Button>
    //                                 </DropdownMenuItem>
    //
    //                             </div>
    //                         </Form>
    //                     )}
    //                 </Formik>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     </div>);
};

export default filterButton;