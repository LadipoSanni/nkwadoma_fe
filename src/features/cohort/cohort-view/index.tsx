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
import {
    useGetAllCohortByAParticularProgramQuery,
    useGetAllCohortsByOrganisationQuery
} from '@/service/admin/cohort_query'
import { useSearchCohortByOrganisationQuery } from '@/service/admin/cohort_query'
import { useGetAllProgramsQuery } from '@/service/admin/program_query'
import { useDeleteCohortMutation } from '@/service/admin/cohort_query'
import {useToast} from "@/hooks/use-toast"
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonForLoanOrg from '@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations'
import GeneralEmptyState from '@/reuseable/emptyStates/General-emptystate'
import { Book } from 'lucide-react';
import Modal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import AddCohortInAnOrganization from '@/components/portfolio-manager/organization/AddCohort-in-organization'
import { useAppSelector } from '@/redux/store'
// import { resetcohortId, } from '@/redux/slice/create/cohortSlice'



export const initialFormValue = {
  selectProgram:""
}

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
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
   numberOfLoanees: number
   
}

interface viewAllProgramProps extends TableRowData  {
  id?: string;
  name: string;
  
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}


interface TabState {
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
}



const CohortView = () => {
  const [isDropdown,setIsDropdown] = useState(false)
  const [selectProgram, setSelectProgram] = useState('')
  const [organisationCohort,setOrganisationCohort] = useState<allCohortsProps[]>([])
  const [originalCohortData, setOriginalCohortData] = useState<allCohortsProps[]>([]);
  const [listOfPrograms, setListOfPrograms] = useState<viewAllProgramProps[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [programId, setProgramId] = useState('');
  const [pendingProgramId, setPendingProgramId] = useState('');
  const [deleteProgram, setDeleteProgram] = useState("")
   const [hasNextPage, setNextPage] = useState(true);
   const [pageNumber,setPageNumber] = useState(0);
   const [isOpen, setIsOpen] = React.useState(false);
   const [page] = useState(0)
   const size = 10;
   const {toast} = useToast()
   const user_role = getUserDetailsFromStorage('user_role');
   const cohortTab = useAppSelector(state => state?.cohort?.cohortStatusTab)
   const organizationId = useAppSelector(state => state?.organization?.setOrganizationId)
  const organisationTabStatus = useAppSelector(store => store?.organization?.organizationStatusTab)
   const [tabStates, setTabStates] = useState<Record<string, TabState>>({
    incoming: { pageNumber: 0, totalPages: 0, hasNextPage: false },
    current: { pageNumber: 0, totalPages: 0, hasNextPage: false },
    graduated: { pageNumber: 0, totalPages: 0, hasNextPage: false }
});

const currentTabState = tabStates[cohortTab];
   
   const { data: cohortData,isLoading,refetch:refetchCohortData } = useGetAllCohortsByOrganisationQuery({  ...(user_role === "PORTFOLIO_MANAGER" && organizationId 
    ? { organizationId } 
    : {}),cohortStatus: cohortTab.toUpperCase(),pageSize: 10, pageNumber:currentTabState.pageNumber }, { refetchOnMountOrArgChange: true, })
    
    const { data: searchData, isLoading: searchIsloading } = useSearchCohortByOrganisationQuery({cohortName: searchTerm,...(user_role === "PORTFOLIO_MANAGER" && organizationId 
      ? { organizationId } 
      : {}),programId: programId,cohortStatus: cohortTab.toUpperCase(), pageSize: size, pageNumber: currentTabState.pageNumber,}, { skip: !searchTerm });

   const { data: programDatas, isLoading: programIsloading,isFetching  } = useGetAllProgramsQuery({ ...(user_role === "PORTFOLIO_MANAGER" && organizationId 
    ? { organizationId } 
    : {}),pageSize: size, pageNumber: pageNumber }, { skip: !isCreateModalOpen, refetchOnMountOrArgChange: true, })
  const { data: cohortsByProgram, refetch, isLoading: cohortIsLoading } = useGetAllCohortByAParticularProgramQuery({ programId,cohortStatus: cohortTab.toUpperCase(), pageSize: 300, pageNumber: page }, { refetchOnMountOrArgChange: true, skip: !programId });
  const [deleteItem] = useDeleteCohortMutation()
 
  const handleModalOpen = () => {
    setIsOpen(!isOpen)
}


   useEffect(() => {
    if(searchTerm && searchData && searchData?.data) {
      const result = searchData?.data?.body
      setOrganisationCohort(result)
      setTabStates(prev => ({
        ...prev,
        [cohortTab]: {
            pageNumber: searchData?.data.pageNumber,
            totalPages: searchData?.data.totalPages,
            hasNextPage:searchData?.data.hasNextPage
        }
    }));
    }
    else if(!searchTerm && cohortData && cohortData?.data) {
        const result = cohortData?.data?.body
      setOrganisationCohort(result)
      setOriginalCohortData(result);  
      setTabStates(prev => ({
        ...prev,
        [cohortTab]: {
            pageNumber: cohortData?.data.pageNumber,
            totalPages: cohortData?.data.totalPages,
            hasNextPage:cohortData?.data.hasNextPage
        }
    }));
    }
    
   },[searchTerm,searchData,cohortData,cohortTab])

    const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
           const newPage = typeof value === 'function' ? value(currentTabState.pageNumber) : value;
           setTabStates(prev => ({
               ...prev,
               [cohortTab]: {
                   ...prev[cohortTab],
                   pageNumber: newPage
               }
           }));
       };

    useEffect(() => {
        if (programDatas && programDatas?.data) {
            const sortedPrograms = [...programDatas.data.body].sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            setListOfPrograms((prev) => {
                if (pageNumber === 0) {
                    return sortedPrograms;
                }
                const newPrograms = sortedPrograms.filter(
                    (newProgram: viewAllProgramProps) => !prev.some((prev) => prev.id === newProgram.id)
                );
                return [...prev, ...newPrograms].sort((a, b) => a.name.localeCompare(b.name));
            });

            setNextPage(programDatas?.data?.hasNextPage);
        }
    }, [programDatas,pageNumber]);


    useEffect(() => {
    if (cohortsByProgram && cohortsByProgram?.data) { 
      const result = cohortsByProgram?.data?.body; 
      setOrganisationCohort(result);
      setTabStates(prev => ({
        ...prev,
        [cohortTab]: {
            pageNumber: cohortsByProgram?.data.pageNumber,
            totalPages: cohortsByProgram?.data.totalPages,
            hasNextPage:cohortsByProgram?.data.hasNextPage
        }
    }));
     } }, [cohortsByProgram]);

     const loadMore = () => {
      if (!isFetching && hasNextPage) {
          setPageNumber((prevPage) => prevPage + 1);
      }
  };


   const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
    setIsCreateModalOpen(true)
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


 const validationSchema = Yup.object().shape({
   selectProgram: Yup.string().required('Program is required'),
 })


  
const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   }

   useEffect(() => {
    const handler = setTimeout(() => {
      if(searchTerm){
        setSearchTerm(searchTerm)
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
     

const handleDeleteCohortByOrganisation = async (id: string) => {
       
    try{
       const deleteCohort = await deleteItem({id}).unwrap();
         if(deleteCohort){
          setOrganisationCohort((prevData) => prevData.filter((item) => item.id !== id))
          setTimeout(() => {
            toast({
              description:"Cohort deleted successfully"  ,
              status: "success",
          })
           }, 600); 
         }else {
          setDeleteProgram("Failed to delete program")
         
      }
       
    }catch(error){
        const err = error as ApiError;
        setDeleteProgram(err?.data?.message || "Cohort with loanee cannot be deleted")
        setTimeout(() => {
          toast({
            description:  deleteProgram || "Cohort with loanee cannot be deleted"  ,
            status: "error",
        })
         }, 600); 
    }
}


  return (
    <div className=''>
        <div id='cohortName' className={` ${user_role === "PORTFOLIO_MANAGER"? "" : "md:px-6 px-4"}`}>
          <div id='buttonFilterCreate' className={`md:flex justify-between items-center z-50 relative  ${inter.className} ${user_role === "PORTFOLIO_MANAGER"? "top-2" : "top-6  bottom-2"}`}>
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
                  <Button id='cohortInProgram' variant={'default'} className='w-full text-black  bg-neutral100 h-11 border-1  hover:bg-neutral100 ring-1 ring-neutral650 focus-visible:ring-neutral650 shadow-none' >
                    {!selectProgram? "Program" : selectProgram}
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
                      <SelectTrigger id='cohortInProgramSelectTrigger' className='flex justify-between w-72  focus:ring-0 focus:outline-none text-forgetPasswordBlue'>
                      <SelectValue  placeholder="Select program" className='' data-testid='Select Program'/>
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
                        {
                          programIsloading? (<div><SkeletonForLoanOrg/></div>) : listOfPrograms.length === 0? (<div>
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
                            <div >
                             <InfiniteScroll
                               dataLength={listOfPrograms.length}
                               next={loadMore}
                               hasMore={hasNextPage}
                               loader = {isFetching ?  <SkeletonForLoanOrg /> : null}
                               height="30.5vh"
                               className="w-full"
                             >
                             <SelectGroup
                          className='w-full'
                        >
                          {listOfPrograms.map((value,index) => (
                           <SelectItem key={value.id} id={`${value}-${index}`} value={value.name} className='hover:bg-blue-200'>
                             {value.name}
                           </SelectItem>
                          ))}
                        </SelectGroup>
                             </InfiniteScroll>
                          </div>)
                        }
                      </SelectContent>

                      </Select>
                     
                      <div className='flex justify-between items-center pt-7'>

                        <Button
                        id='resetButton'
                        variant={`outline`}
                        className='text-meedlBlue h-[38px] font-bold ring-meedlBlue border-meedlBlue border-solid w-[80px]'
                        onClick={()=> {
                          resetForm();
                          setSelectProgram("")
                          setProgramId("")
                          setPendingProgramId("") 
                          setOrganisationCohort(originalCohortData);
                          setTabStates(prev => ({
                            ...prev,
                            [cohortTab]: {
                              pageNumber: 0,  
                              totalPages: cohortData?.data?.totalPages || 0,  // Restore original total pages
                              hasNextPage: cohortData?.data?.hasNextPage || false
                            }
                          }));
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
                           {cohortIsLoading ? (
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
               <Button variant={"secondary"}
                  size={"lg"}
                  className={`${inter.className}   h-12 flex justify-center items-center w-full ${user_role === "PORTFOLIO_MANAGER" && organisationTabStatus !== "active"? "bg-gray text-grey150" : "bg-meedlBlue text-meedlWhite"}`}
                  id='createProgramModal'
                   onClick={handleModalOpen}
                   disabled={user_role === "PORTFOLIO_MANAGER" && organisationTabStatus !== "active" ? true : false}
                  >
                   {user_role === "PORTFOLIO_MANAGER"? "Add cohort" : "Create cohort"}
                </Button>

             </div>
          </div>
        </div>
        <div>
        </div>
        <div className={` ${user_role === "PORTFOLIO_MANAGER"? "mt-8" : " mr-auto ml-auto relative w-[96%] mt-12 "}`}>
         <CohortTabs 
         isLoading={isLoading || searchIsloading || cohortIsLoading } 
         listOfCohorts={organisationCohort} 
         handleDelete={handleDeleteCohortByOrganisation} 
         errorDeleted={deleteProgram} searchTerm={searchTerm} 
         userRole={user_role} 
         currentTab={cohortTab}
         handlePageChange={handlePageChange}
         hasNextPage={currentTabState.hasNextPage}
         pageNumber={currentTabState.pageNumber}
         totalPages={currentTabState.totalPages}
         />
         
        </div>
        <div>
          <Modal
            isOpen={isOpen}
            closeOnOverlayClick={true}
            closeModal={() => setIsOpen(false)}
             width='36%'
            headerTitle={user_role === "PORTFOLIO_MANAGER"? "Add cohort" : 'Create cohort'}
             className='pb-1'
              icon={Cross2Icon}
          >
            {user_role === "PORTFOLIO_MANAGER"? <AddCohortInAnOrganization  setIsOpen={setIsOpen} organizationId={organizationId} cohortRefetch={refetchCohortData}/> : <CreateCohort setIsOpen={setIsOpen}/> }
          </Modal>
        </div>
    </div>
  )
}

export default CohortView