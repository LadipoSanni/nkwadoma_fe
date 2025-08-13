import React, { useEffect } from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import Tables from '@/reuseable/table/LoanProductTable'
import Table  from '@/reuseable/table/Table'
import { MdOutlinePeople } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { formatAmount } from '@/utils/Format'
import { formatMonthInDate } from '@/utils/Format'
import TableModal from '@/reuseable/modals/TableModal'
import DeleteModal from '@/reuseable/modals/Delete-modal'
import { Cross2Icon } from "@radix-ui/react-icons";
import EditCohortForm from './EditCohortForm'
import { inter } from '@/app/fonts'
import DeleteCohort  from '@/reuseable/details/DeleteCohort'
import { setItemSessionStorage } from '@/utils/storage';
// import { useViewCohortDetailsQuery } from '@/service/admin/cohort_query'
import { useGetCohortDetailsQuery } from '@/service/admin/cohort_query'
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'
import { store,useAppSelector } from '@/redux/store'
import {setcohortStatusTab, setcohortId, setSelectedCohortInOrganization} from '@/redux/slice/create/cohortSlice'
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { setcohortOrProgramRoute } from '@/redux/slice/program/programSlice';
import { resetNotificationCohortId } from '@/redux/slice/create/cohortSlice'


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
  isTyping?: boolean
}


const CohortTabs = ({listOfCohorts = [],handleDelete,isLoading,errorDeleted,searchTerm,userRole,currentTab,hasNextPage,totalPages,handlePageChange,pageNumber,isTyping}:cohortList) => {
  const [cohortId, setCohortId] =  React.useState("")
  const [isOpen, setIsOpen] = React.useState(false);
 const organizationTabStatus = useAppSelector(store => store?.organization?.organizationDetailTabStatus)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [details, setDetails] = React.useState({
    id: "",
    programId: "",
    organizationId: "",
    cohortDescription: "",
    name: "",
    activationStatus: "",
    cohortStatus: "",
    tuitionAmount: 0,
    totalCohortFee: 0,
    imageUrl: "",
    startDate: "",
    expectedEndDate: "",
})

const {data: cohortDetails, isLoading: loading, refetch} = useGetCohortDetailsQuery({
  cohortId: cohortId
}, {skip: !cohortId,refetchOnMountOrArgChange: true});


useEffect(() => {
  if (cohortDetails && cohortDetails?.data) {
      const details = cohortDetails.data
      setDetails({
          id: details?.id || "",
          programId: details?.programId || "",
          organizationId: details?.organizationId || "",
          cohortDescription: details?.cohortDescription || "",
          name: details?.name || "",
          activationStatus: details?.activationStatus || "",
          cohortStatus: details?.cohortStatus || "",
          tuitionAmount: details?.tuitionAmount || "",
          totalCohortFee: details?.totalCohortFee || "",
          imageUrl: details?.imageUrl || "",
          startDate: details?.startDate || "",
          expectedEndDate: details?.expectedEndDate || "",
      })
  }
  store.dispatch(resetNotificationCohortId())
}, [cohortDetails]);

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
  // const loanee = listOfCohorts.map(data => data.numberOfLoanees)

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
     if(["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")){
         const cohort = {name: String(row?.name),id: String(row?.id)}
         store.dispatch(setSelectedCohortInOrganization(cohort))
         if(organizationTabStatus === "cohort"){
          router.push('/organizations/cohort/all')
         } else {
          router.push('/organizations/loanees/uploaded')
         }
     }else {
      store.dispatch(setcohortOrProgramRoute("cohort"))
      router.push('/cohort/cohort-details')
     }
     setItemSessionStorage("programsId", String(row.programId))

  }



  const handleDropdownClick = async (id:string,row: rowData) => {
    if(id === "1") {
      setItemSessionStorage("programsId", String(row.programId))
      store.dispatch(setcohortId(String(row.id)))
      if(["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")){
        const cohort = {name: String(row?.name),id: String(row?.id)}
        store.dispatch(setSelectedCohortInOrganization(cohort))
        router.push('/organizations/loanees/uploaded')
       }else {
         store.dispatch(setcohortOrProgramRoute("cohort"))
        router.push('/cohort/cohort-details')
       }
  }
    else if(id === "2") {
      setCohortId(String(row.id))
      if(cohortId){
        await refetch()
        setTimeout(()=>{ setIsOpen(true)},800)
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
        tableHeight={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")? 40 : 52}
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
        condition={["PORTFOLIO_MANAGER","MEEDL_SUPER_ADMIN","MEEDL_ADMIN","MEEDL_ASSOCIATE"].includes(userRole|| "")? false : true}
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
        { loading ? "" : (
        <TableModal
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false)
          setCohortId('')
        }}
        closeOnOverlayClick={true}
        headerTitle='Edit Cohort'
        className='pb-1'
        icon={Cross2Icon}
       
        >
          <EditCohortForm setIsOpen={()=>{setIsOpen(false); setCohortId("")}} cohortDetail={details}/>  
         
        </TableModal>
        )
           }
        <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        closeOnOverlayClick={true}
        icon={Cross2Icon}
        width='auto'
        >
        <DeleteCohort 
        setIsOpen={()=> setIsDeleteOpen(false)} 
        headerTitle='Cohort' 
        title='cohort'
        handleDelete={handleDelete}
        id={cohortId}
        errorDeleted={errorDeleted}
        />
        </DeleteModal>

      </div>
    </div>
  )
}

export default CohortTabs