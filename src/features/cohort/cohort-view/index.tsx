"use client"
import React,{useState,useCallback,useEffect} from 'react'
import { Input } from '@/components/ui/input'
import { MdSearch } from 'react-icons/md'
import { DropdownMenu, DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem,DropdownMenuLabel} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {Formik,Form} from "formik"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue,SelectGroup } from '@/components/ui/select'
import * as Yup from "yup";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import CohortTabs from '../../../components/cohort/CohortTabs'
import CreateCohort from "@/reuseable/modals/CreateCohort";
import { inter } from '@/app/fonts'
import { useGetAllCohortsByOrganisationQuery } from '@/service/admin/cohort_query'
import { useSearchCohortByOrganisationQuery } from '@/service/admin/cohort_query'
import { debounce } from 'lodash';
import { useGetAllCohortByAParticularProgramQuery } from '@/service/admin/program_query'
import { useGetAllProgramsQuery } from '@/service/admin/program_query'
import { useDeleteCohortMutation } from '@/service/admin/cohort_query'


export const initialFormValue = {
  selectProgram:""
}

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
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



interface allCohortsProps extends TableRowData {
   name:string,
   cohortDescriptions:string,
   startDate:string,
   expectedEndDate:string,
   totalCohortFee:number,
   imageUrl:string,
   cohortStatus: string,
   tuitionAmount: number
   id:string
   programId: string
}

interface viewAllProgramProps extends TableRowData  {
  id?: string;
  name: string;
  
}


const CohortView = () => {
  const [isDropdown,setIsDropdown] = useState(false)
  const [selectProgram, setSelectProgram] = useState('')
  const [organisationCohort,setOrganisationCohort] = useState<allCohortsProps[]>([])
  const [originalCohortData, setOriginalCohortData] = useState<allCohortsProps[]>([]);
  const [listOfPrograms, setListOfPrograms] = useState<viewAllProgramProps[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [programId, setProgramId] = useState('');
  const [pendingProgramId, setPendingProgramId] = useState('');
   const [isLoading] = useState(false);
   const [page] = useState(0);
   const size = 200;

   const { data: cohortData } = useGetAllCohortsByOrganisationQuery({ pageSize: size, pageNumber: page }, { refetchOnMountOrArgChange: true, })  
   const { data: searchData } = useSearchCohortByOrganisationQuery(searchTerm, { skip:!searchTerm })
   const { data: programDatas, } = useGetAllProgramsQuery({ pageSize: size, pageNumber: page }, { refetchOnMountOrArgChange: true, })
  const { data: cohortsByProgram, refetch } = useGetAllCohortByAParticularProgramQuery({ programId, pageSize: size, pageNumber: page }, { refetchOnMountOrArgChange: true, skip: !programId });
  const [deleteItem] = useDeleteCohortMutation()
   

   useEffect(() => { 
    if (cohortData && cohortData?.data) { 
      const result = cohortData?.data?.body; 
      setOrganisationCohort(result); 
      setOriginalCohortData(result);  
    } }, [cohortData]);

   useEffect(() => {
    if(searchTerm && searchData && searchData?.data) {
      const result = searchData?.data
      setOrganisationCohort(result)
    }
    else if(!searchTerm && cohortData && cohortData?.data) {
        const result = cohortData?.data?.body
      setOrganisationCohort(result)
    }
   },[searchTerm,searchData,cohortData])

   useEffect(() => {
    if( programDatas &&  programDatas?.data ) {
        const programs =  programDatas?.data?.body
        setListOfPrograms(programs)
       
    }
   
},[programDatas])

   useEffect(() => { 
    if (cohortsByProgram && cohortsByProgram?.data) { 
      const result = cohortsByProgram?.data?.body; 
      setOrganisationCohort(result);
     } }, [cohortsByProgram]);


  // console.log("The organisationCohort: ",listOfPrograms)
  // console.log("The organisationCohort: ", organisationCohort);


   const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
    
  }, []);


  const handleSubmit = async () => {
    setProgramId(pendingProgramId);
    refetch(); 
    setIsDropdown(false)
  }

  const handleSelectProgram = (programType: string) => {
       setSelectProgram(programType) 
       const selectedProgram = listOfPrograms.find(program => program.name === programType); 
       if (selectedProgram) { 
        setPendingProgramId(selectedProgram.id || '');
       }
  }

  console.log("The hhhid: ",programId)

 const validationSchema = Yup.object().shape({
   selectProgram: Yup.string().required('Program is required'),
 })

 const debouncedSearch = useCallback( debounce((term) => { 
  setSearchTerm(term);
 }, 300), [] );

 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
  debouncedSearch(event.target.value);
};

const handleDeleteCohortByOrganisation = async (id: string) => {
       
    try{
        await deleteItem({id}).unwrap();
        setOrganisationCohort((prevData) => prevData.filter((item) => item.id !== id))
    }catch(error){
        console.error("Error deleting program: ", error);
    }
}


  return (
    <div className=''>
        <div id='cohortName' className='md:px-8 px-4'>
          {/* <h1 className={`mt-5 font-semibold text-2xl mb-4 normal-case z-50 ${cabinetGrotesk.className}`}>Cohort</h1> */}
          <div id='buttonFilterCreate' className={`md:flex justify-between items-center z-50 relative top-6 bottom-2 ${inter.className}`}>
            <div id='buttonFilter' className='flex gap-4'>
            <div className='relative'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MdSearch className="h-6 w-6 text-grey200" />
            </span>
            <Input
             id='CohortSearch'
              placeholder='Search'
              className='w-full lg:w-96 h-11 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
              value={searchTerm}
              onChange={handleSearchChange}
              />
            </div>
             <div className='z-10'>
              <DropdownMenu onOpenChange={toggleDropdown}>
                <DropdownMenuTrigger asChild>
                  <Button variant={'default'} className='w-full text-black  bg-neutral100 h-11 border-1  hover:bg-neutral100 ring-1 ring-neutral650 focus-visible:ring-neutral650 shadow-none' >
                     Program
                    <span className='ml-4'>
                      {isDropdown ? (
          <ChevronUpIcon className="h-4 w-5 font-semibold" />
        ) : (
          <ChevronDownIcon className="h-4 w-5 font-semibold" />
        )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2 relative left-[-30px] md:left-[-100px] px-4 pb-6 z-[1000rem]'>
                  <DropdownMenuLabel  data-testid="program">Program</DropdownMenuLabel>
                  <Formik
                  initialValues={initialFormValue}
                  onSubmit={handleSubmit}
                  validateOnMount={true}
                  validationSchema={validationSchema}
                  >
                     {({isValid,  setFieldValue,resetForm}) => (
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
                      <SelectValue placeholder="Select Program" className='' data-testid='Select Program'/>
                      <div className='ml-4'>
                {isDropdown ? (
          <ChevronUpIcon className="h-4 w-5 font-semibold" />
        ) : (
          <ChevronDownIcon className="h-4 w-5 font-semibold" />
        )}
                </div>

                      </SelectTrigger>
                      <SelectContent
                      className='border-none border-[#FAFBFC] text-[#404653]  text-sm z-50'
                      >
                        <SelectGroup
                          className=''
                        >
                          {listOfPrograms.map((value) => (
                           <SelectItem key={value.id} value={value.name} className='hover:bg-blue-200'>
                             {value.name}
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
                        id='resetButton'
                        // type="reset"
                        variant={`outline`}
                        className='text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
                        onClick={()=> {
                          resetForm();
                          setSelectProgram("")
                          setProgramId("")
                          setPendingProgramId("") 
                          setOrganisationCohort(originalCohortData);
                        }}
                        >
                          Reset
                        </Button>
                        <DropdownMenuItem className='hover:bg-none'>
                        <Button
                        id='filterButton'
                        variant={'default'}
                        className={`${!isValid? "bg-neutral650 cursor-not-allowed  h-[38px] " : "bg-meedlBlue h-[38px] cursor-pointer hover:bg-meedlBlue"}font-bold  w-[80px]  text-white`
                       }
                        type='submit'
                        disabled={!isValid}
                        >
                           {isLoading ? (
                                                <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} width={24} height={24}/>
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
            </div>
             <div className='md:mt-0 mt-4'>

                 <CreateCohort  triggerButtonStyle={`w-full`}/>
             </div>
          </div>
        </div>
        <div className='mt-12 w-[96%]  mr-auto ml-auto relative '>
         <CohortTabs listOfCohorts={organisationCohort} handleDelete={handleDeleteCohortByOrganisation}/>
        </div>
    </div>
  )
}

export default CohortView