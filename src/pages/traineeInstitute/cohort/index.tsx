"use client"
import React,{useState,useCallback} from 'react'
import { Input } from '@/components/ui/input'
import { MdSearch } from 'react-icons/md'
import { DropdownMenu, DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem,DropdownMenuLabel} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {Formik,Form} from "formik"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue,SelectGroup } from '@/components/ui/select'
import * as Yup from "yup";
import loadingLoop from "@iconify/icons-line-md/loading-loop";


export const initialFormValue = {
  selectProgram:""
}

export const programData = {
  "value 1" : "Design Thinking",
  "value 2" : "Software Engineering",
  "value 3" : "Data Science",
  "value 4" : "Cybersecurity",
  "value 5" : "UX/UI Design",
  "value 6" : "Product design",
  "value 7" : "Digital Marketing",
  "value 8" : "Business Administration",
  "value 9" : "Finance",
  "value 10" : "Human Resources",
  "value 11" : "Project Management",
  "value 12" : "Product Marketing",
   "value 13" : "Product Management",
}

const Cohort = () => {
  const [isDropdown,setIsDropdown] = useState(false)
  const [selectProgram, setSelectProgram] = useState('')
   const [isLoading, setIsLoading] = useState(false);

  

   const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
  }, []);


  const handleSubmit = async (values: any) => {
    console.log('Form submitted', values)
    setIsDropdown(false)

  }

  const handleSelectProgram = (programType: string) => {
       setSelectProgram(programType)
  }

 const validationSchema = Yup.object().shape({
   selectProgram: Yup.string().required('Program is required'),
 })

  return (
    <div className='px-4'>
        <div id='cohortName'>
          <h1 className='mt-7 font-semibold text-lg mb-7'>Cohort</h1>
          <div id='buttonFilterCreate' className='flex justify-between items-center'>
            <div id='buttonFilter' className='flex gap-4'> 
            <div className='relative'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <MdSearch className="h-6 w-6 text-grey200" />
      </span>
            <Input
             id='CohortSearch'
              placeholder='Search'
              className='w-96 h-12 focus-visible:ring-0  border-solid border-2 text-lg text-grey450 pl-10'
              />
            </div>
             <div>
              <DropdownMenu onOpenChange={toggleDropdown}>
                <DropdownMenuTrigger asChild>
                  <Button className='text-black  bg-neutral650 h-12 border-1  hover:bg-neutral650 ring-1 ring-grey100 focus-visible:ring-grey100' >
                     Filter
                    <span className='ml-4'>
                      {isDropdown ? (
          <ChevronUpIcon className="h-4 w-5 font-semibold" />
        ) : (
          <ChevronDownIcon className="h-4 w-5 font-semibold" />
        )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2 relative left-[-100px] px-4 pb-6'>
                  <DropdownMenuLabel>Program</DropdownMenuLabel>
                  <Formik
                  initialValues={initialFormValue}
                  onSubmit={handleSubmit}
                  validateOnMount={true}
                  validationSchema={validationSchema}
                  >
                     {({values, errors, isValid, touched, setFieldValue,resetForm}) => (
                    <Form>
                      <Select
                      value={selectProgram}
                      onValueChange={(value: string) => {
                        handleSelectProgram(value);
                        setFieldValue("selectProgram", value);
                      }}
                      onOpenChange={toggleDropdown}
                      >
                      <SelectTrigger className='flex justify-between w-72  focus:ring-0 focus:outline-none text-forgetPasswordBlue'>
                      <SelectValue placeholder="Select Program" className=''/>
                      <div className='ml-4'>
                {isDropdown ? (
          <ChevronUpIcon className="h-4 w-5 font-semibold" />
        ) : (
          <ChevronDownIcon className="h-4 w-5 font-semibold" />
        )}
                </div>

                      </SelectTrigger>
                      <SelectContent
                      className='border-none border-[#FAFBFC] text-[#404653]  text-sm '
                      >
                        <SelectGroup
                          className=''
                        >
                          {Object.entries(programData).map(([key, value]) => (
                           <SelectItem key={key} value={value} className='hover:bg-blue-200'>
                             {value}
                           </SelectItem>
                          ))}
                        </SelectGroup>

                      </SelectContent>

                      </Select>
                      {/* <div>
                        {errors.selectProgram && touched.selectProgram && ( <div className='text-red-500'>{errors.selectProgram}</div>)}
                      </div> */}
                      <div className='flex justify-between items-center pt-7'>
                      
                        <Button 
                        // type="reset"
                        variant={`outline`} 
                        className='text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
                        onClick={()=> {
                          resetForm();
                          setSelectProgram("")
                        }}
                        >
                          Reset
                        </Button>
                        <DropdownMenuItem>
                        <Button 
                        className={`${!isValid? "bg-neutral650 cursor-not-allowed  h-[38px] " : "bg-meedlBlue h-[38px] cursor-pointer hover:bg-meedlBlue"}font-bold  w-[80px]  text-white`
                       }
                        type='submit'
                        disabled={!isValid}
                        >Filter</Button>
                          </DropdownMenuItem>
                        
                      </div>
                    </Form>
               )}
                  </Formik>
                </DropdownMenuContent>
              </DropdownMenu>
             </div>
            </div>
             <div className='createCohort'>
              <Button 
              type='button'
              // className='text-meedlBlue h-12 font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
              className='bg-meedlBlue h-12 hover:bg-meedlBlue cursor-pointer'
              >
                Create Cohort
              </Button>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Cohort