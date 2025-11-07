import React, { useEffect } from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Table  from '@/reuseable/table/Table'
import { MdOutlinePeople } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { formatAmount } from '@/utils/Format'
import { formatMonthInDate } from '@/utils/Format'
import TableModal from '@/reuseable/modals/TableModal'
import DeleteModal from '@/reuseable/modals/Delete-modal'
import { Cross2Icon } from "@radix-ui/react-icons";
// import EditCohortForm from './EditCohortForm'
import { inter } from '@/app/fonts'
import DeleteCohort  from '@/reuseable/details/DeleteCohort'
import { setItemSessionStorage } from '@/utils/storage';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'
import { store,useAppSelector } from '@/redux/store'
import {
    setcohortStatusTab,
    setcohortId,
    setSelectedCohortInOrganization,
    setSelectedCohortInOrganizationType,
    resetCreateCohortField, setCreateCohortField, setTotalNumberOfLoanee,setSelectedProgramName,setTotalRefferedNumberOfLoanee
} from '@/redux/slice/create/cohortSlice'
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { setcohortOrProgramRoute } from '@/redux/slice/program/programSlice';
import { resetNotificationCohortId } from '@/redux/slice/create/cohortSlice'
import {setUnderlineTabCurrentTab} from "@/redux/slice/layout/adminLayout";

import EditCohort from './CreateCohort'
import { LoanBreakDowns } from './CreateCohort'
import DeletionRestrictionMessageProps from './DeletionRestrictionMessageProps'
import { resetCurrentProgramId } from '@/redux/slice/program/programSlice'

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

interface TableRowData {
      [key: string]: string | number | null | React.ReactNode;
     }

interface cohortList {
  listOfCohorts: allCohortsProps[]
  handleDelete?: (id: string) => void;
  isLoading?: boolean
  errorDeleted?: string
  searchTerm?: string
  userRole?: string;
  currentTab?: string;
  hasNextPage: boolean;
  totalPages: number;
  pageNumber: number
  handlePageChange:  (value: React.SetStateAction<number>, tabType?: string) => void;
  isTyping?: boolean;
  isDeleteOpen?: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  isDeleteLoading?: boolean
  setDeleteProgram: (value: string) => void
}


const CohortTabs = (
             {listOfCohorts = [],handleDelete,
              isLoading,errorDeleted,
              searchTerm,userRole,currentTab,
              hasNextPage,totalPages,
              handlePageChange,pageNumber,
              isTyping,isDeleteOpen= false,
              setIsDeleteOpen,isDeleteLoading,
              setDeleteProgram}:cohortList)  => {
  const [cohortId, setCohortId] =  React.useState("")
  const [isOpen, setIsOpen] = React.useState(false);
  const organizationTabStatus = useAppSelector(store => store?.organization?.organizationDetailTabStatus)
  const totalNumberOfLoanee = useAppSelector(store => store?.cohort?.numberOfLoanees)
  const currentProgramId = useAppSelector(state => (state.program.currentProgramId))
  const totalNumberOfRefferdLoanee = useAppSelector(store => store?.cohort?.numberOfRefferedLoanees)
    // const cohortTab = useAppSelector(state => state?.cohort?.cohortStatusTab)

  useEffect(() => {
       if(currentProgramId){
         store.dispatch(resetCurrentProgramId())
       }
        store.dispatch(resetNotificationCohortId())
     },[currentProgramId])

  const router = useRouter()

  const tabData = [
   {name:"Incoming",
      value: "incoming"
    },
    {
      name:"Current",
      value: "current"
    },
    {
      name:"Graduated",
      value: "graduated"
    },

  ]

  const dropDownOption = [
  
    {
      name: "View Cohort",
      id: "1"
    },
    { 
      name: "Edit Cohort",
      id: "2"
    },
   {
      name: "Delete Cohort",
      id: "3"
    }
  
  ]



  
    

     interface rowData {
      [key: string]: string | number | null | React.ReactNode | object;
     }

  const handleRowClick = (row: TableRowData) => {
    store.dispatch(setcohortId(String(row.id)))
      store.dispatch(setUnderlineTabCurrentTab('Details'))
      if(["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")){
         const cohort = {name: String(row?.name),id: String(row?.id)}
         store.dispatch(setSelectedCohortInOrganization(cohort))
         if(organizationTabStatus === "cohort"){
          router.push('/organizations/cohort/all')
         } else {
          router.push('/organizations/loanees/uploaded')
         }
     }else {

         const cohort = {name: String(row?.name),id: String(row?.id)}
         store.dispatch(setSelectedCohortInOrganization(cohort))
         store.dispatch(setcohortOrProgramRoute("cohort"))
         store.dispatch(setSelectedCohortInOrganizationType(String(row?.cohortStatus)))

         router.push('/cohort/details')

     }
     setItemSessionStorage("programsId", String(row.programId))

  }



  const handleDropdownClick = async (id:string,row: rowData) => {
    const breakdown = row?.loanBreakDowns as LoanBreakDowns[]

    const formattedBreakdowns = breakdown?.map((item: LoanBreakDowns) => ({
      ...item,
      itemAmount: String(item.itemAmount)
  })) || [];
 
  const programName =  row?.programName as string
  const totalNumberOfLoanee = row?.numberOfLoanees as number
  const totalNumberOfRefferedLoanee = row?.numberOfReferredLoanee as number
   store.dispatch(setTotalNumberOfLoanee(totalNumberOfLoanee))
   store.dispatch(setSelectedProgramName(programName))
   store.dispatch(setTotalRefferedNumberOfLoanee(totalNumberOfRefferedLoanee))

    const cohortDetails = {
             id: row?.id as string ,
            name: row?.name as string ,
            programId: row?.programId as string,
            startDate: row?.startDate as string ,
            cohortDescription: row?.cohortDescription as string,
            tuitionAmount : String(row?.tuitionAmount),
            loanBreakDowns: formattedBreakdowns || [],
            programName: ""
        };

    if(id === "1") {
      setItemSessionStorage("programsId", String(row.programId))
      store.dispatch(setcohortId(String(row.id)))
      if(["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")){
        const cohort = {name: String(row?.name),id: String(row?.id)}
        store.dispatch(setSelectedCohortInOrganization(cohort))
        router.push('/organizations/loanees/uploaded')
       }else {
         store.dispatch(setcohortOrProgramRoute("cohort"))
        router.push('/cohort/details')
       }
  }
    else if(id === "2") {
      setCohortId(String(row.id))
      store.dispatch(setCreateCohortField(cohortDetails))
      if(cohortId){
        setTimeout(()=>{setIsOpen(true)},800)
      }
      setTimeout(()=>{ setIsOpen(true)},800)
      
    
    }
    else {
      setCohortId(String(row.id))
      setIsDeleteOpen(true)
    }
  }



  
  
  const ProgramHeader = [
    { title: 'Cohort', sortable: true, id: 'name', selector: (row:TableRowData ) => <div className="truncate">{capitalizeFirstLetters(row.name?.toString())}</div> },
    { title: <div className='relative lg:right-2 lg:left-2'>Start date</div>, sortable: true, id: 'startDate', selector: (row:TableRowData ) =>(
      <div className="truncate">{formatMonthInDate(row?.startDate)}</div>
    )},
    { title: 'No. of loanees', sortable: true, id: 'numberOfLoanees', selector: (row:TableRowData) => (
      <div className="truncate">{row.numberOfLoanees || 0}</div>
    ) },
    { title: <div className='lg:w-28'>Tuition</div>, sortable: true, id: 'tuitionAmount', selector: (row:TableRowData) => (
      <div className="truncate">{formatAmount(row.tuitionAmount)}</div>
    )},
    { title: 'Amount received', sortable: true, id: 'amountReceived', selector: (row:TableRowData) => (
      <div className="truncate">{formatAmount(row.amountReceived)}</div>
    )},
    { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => (
      <div className="truncate">{formatAmount(row.amountRequested)}</div>
    ) },
    { title: 'Amount outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) =>  (
      <div className="truncate">{formatAmount(row.amountOutstanding)}</div>
    ) },

  ]


  const renderTable = (tabValue: string) => {
        const isEmpty =!isTyping && searchTerm && listOfCohorts.length === 0
        const emptyStateName = `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} cohort`;

        return isEmpty ? (
          <SearchEmptyState icon={MdSearch} name={emptyStateName} />
      ) : (
        <Table
        tableData={listOfCohorts}
        handleRowClick={handleRowClick}
        tableHeader={ProgramHeader}
        tableHeight={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "") && listOfCohorts.length < 10 ? 60 : 52}
        sx='cursor-pointer'
        staticColunm='name'
        staticHeader='cohort'
        showKirkBabel={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")? false : true}
        kirkBabDropdownOption={dropDownOption}
        icon={MdOutlinePeople}
        sideBarTabName='cohort'
        optionalFilterName={tabValue}
        handleDropDownClick={handleDropdownClick}
        isLoading={isLoading}
        condition={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")? true : false}
        hasNextPage={hasNextPage}
        pageNumber={pageNumber}
        setPageNumber={handlePageChange}
        totalPages={totalPages}
        tableStyle={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")? 'h-8 flex items-center' : ""}
        
        />
      )
  }

   const tabContent = tabData.map(tab => ({
      value: tab.value,
      content: (
            <div>
               {renderTable(tab.value)}
            </div>
      )
   }))



  return (
    <div >
      <Tabs value={currentTab}
       onValueChange={(value) => {
                          store.dispatch(setcohortStatusTab(value));
                      }}
      >
        <TabsList className= {`z-50 ${inter.className}`}>
          {tabData.map((tab,index) => (
            <TabsTrigger id={`${tab.name}-${index}`} data-testid={`tabName${tab.value}`}  value={tab.value} key={index}>
                {tab.name}
          </TabsTrigger>
          ))}
        </TabsList>
        {
          tabContent.map((tab, index) => (
            <TabsContent key={index} value={tab.value}  className='mt-5'>
                {tab.content}
            </TabsContent>
          ))
        }

      </Tabs>
      <div>
        { totalNumberOfRefferdLoanee > 0? 
        <TableModal
         styeleType="styleBodyTwo"
         isOpen={isOpen}
         icon={Cross2Icon}
         closeModal={() => {
           setIsOpen(false)
           setCohortId('')
           store.dispatch(resetCreateCohortField())
         }}
         closeOnOverlayClick={true}
        >
         <DeletionRestrictionMessageProps
          totalNumberOfLoanee={totalNumberOfRefferdLoanee}
          image={ "/Icon - Warning.svg" }
          message={`This program can not be edited because it has Cohort that contains ${totalNumberOfRefferdLoanee > 1? "loanees" : "loanee"} that has been referred` }
          />
        </TableModal>
         : (
        <TableModal
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false)
          setCohortId('')
          store.dispatch(resetCreateCohortField())
        }}
        closeOnOverlayClick={true}
        headerTitle='Edit Cohort'
        className='pb-1'
        icon={Cross2Icon}
       
        >
          <EditCohort setIsOpen={()=>{setIsOpen(false); setCohortId("")}} isEdit={true}/>
         
        </TableModal>
        )
           }

       { totalNumberOfLoanee > 0?
       <TableModal
         isOpen={isDeleteOpen}
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          headerTitle=''
          closeModal={() => {
          setIsDeleteOpen(false)
          }}
           styeleType="styleBodyTwo"
       >
          <DeletionRestrictionMessageProps totalNumberOfLoanee={totalNumberOfLoanee}/>
       </TableModal>
        :
        <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={() => {
          setIsDeleteOpen(false)
          setDeleteProgram("")
        }}
        closeOnOverlayClick={true}
        icon={Cross2Icon}
        width='auto'
        >
        <DeleteCohort 
        setIsOpen={()=> {
          setIsDeleteOpen(false)
          setDeleteProgram("")
        }} 
        headerTitle='Cohort' 
        title='cohort'
        handleDelete={handleDelete}
         id={cohortId}
        errorDeleting={errorDeleted}
        isLoading={isDeleteLoading}
        />
        </DeleteModal>}

      </div>
    </div>
  )
}

export default CohortTabs