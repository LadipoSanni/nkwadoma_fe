import React, { useEffect } from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
// import { cohortsData } from '@/utils/LoanRequestMockData/cohortProduct'
import { MdOutlinePeople } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { formatAmount } from '@/utils/Format'
import { formatDate } from '@/utils/Format'
import TableModal from '@/reuseable/modals/TableModal'
import { Cross2Icon } from "@radix-ui/react-icons";
import EditCohortForm from './EditCohortForm'
import { inter } from '@/app/fonts'
import { DeleteCohort } from '@/reuseable/details/DeleteCohort'
import { setItemSessionStorage } from '@/utils/storage';
// import { useViewCohortDetailsQuery } from '@/service/admin/cohort_query'
import { useGetCohortDetailsQuery } from '@/service/admin/cohort_query'



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

interface TableRowData {
      [key: string]: string | number | null | React.ReactNode;
     }

interface cohortList {
  listOfCohorts: allCohortsProps[]
  handleDelete?: (id: string) => void;
  isLoading?: boolean
}


const CohortTabs = ({listOfCohorts = [],handleDelete,isLoading}:cohortList) => {
  const [cohortId, setCohortId] =  React.useState("")
  const [isOpen, setIsOpen] = React.useState(false);
  // const [programId, setProgramId] = React.useState("")
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

// const {data:cohortInfo} = useViewCohortDetailsQuery({})

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
      value: "graduate"
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
    router.push('/cohort/cohort-details')
    console.log('The row: ',row.id)
     setItemSessionStorage("cohortId",String(row.id))
     setItemSessionStorage("programsId", String(row.programId))

  }



  const handleDropdownClick = async (id:string,row: rowData) => {
    if(id === "1") {router.push('/cohort/cohort-details')
      setItemSessionStorage("programsId", String(row.programId))
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

  // useEffect(()=> {
  //   const id = getItemSessionStorage("programsId")
  //   if (id) {
  //     setProgramId(id)
  //   }
  // },[])

  
  
  const ProgramHeader = [
    { title: 'Cohort', sortable: true, id: 'name', selector: (row:TableRowData ) => row.name },
    { title: 'End date', sortable: true, id: 'expectedEndDate', selector: (row:TableRowData ) => formatDate(row?.expectedEndDate)},
    // { title: 'No. of Trainees', sortable: true, id: 'noOfTrainees', selector: (row: TableRowData) => row.noOfTrainees },
    { title: 'No. of Loanees', sortable: true, id: 'noOfLoanees', selector: (row:TableRowData) => row.noOfLoanees || 0 },
    { title: 'Tuition', sortable: true, id: 'tuitionAmount', selector: (row:TableRowData) => formatAmount(row.tuitionAmount)},
    { title: 'Amount recieved', sortable: true, id: 'amountRecieved', selector: (row:TableRowData) => <div className='ml-4'>{formatAmount(row.amountRecieved)}</div> },
    { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => <div className='ml-6'>{formatAmount(row.amountRequested)}</div> },
    { title: 'Amount Outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) =>  <div className='ml-8'>{formatAmount(row.amountOutstanding)}</div> },

  ]

  const incomingCohorts = listOfCohorts.filter(cohort => cohort.cohortStatus === 'INCOMING'); 
  const currentCohorts = listOfCohorts.filter(cohort => cohort.cohortStatus === 'CURRENT'); 
  const graduatedCohorts = listOfCohorts.filter(cohort => cohort.cohortStatus === 'GRADUATED');

  const dataTabs = [
    {
      value: 'incoming',
      table: <div >
             <Tables
              tableData={incomingCohorts.slice().reverse()}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={52}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='incoming'
              handleDropDownClick={handleDropdownClick}
              optionalRowsPerPage={10}
              isLoading={isLoading}
             />
             </div>
    },
     {
      value: 'current',
      table: <div>
             <Tables
              tableData={currentCohorts.slice().reverse()}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={52}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='current'
              handleDropDownClick={handleDropdownClick}
              optionalRowsPerPage={10}
              condition={true}
              isLoading={isLoading}
             />
             </div>
    },
    {
      value: 'graduate',
      table: <div>
             <Tables
              tableData={graduatedCohorts.slice().reverse()}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={52}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='graduate'
              handleDropDownClick={handleDropdownClick}
               optionalRowsPerPage={10}
               condition={true}
               isLoading={isLoading}
             />
             </div>
    },

  ]


  return (
    <div >
      <Tabs defaultValue='incoming'>
        <TabsList className= {`z-50 ${inter.className}`}>
          {tabData.map((tab,index) => (
            <TabsTrigger id={`${tab.name}-${index}`} data-testid={`tabName${tab.value}`}  value={tab.value} key={index}>
                {tab.name}
          </TabsTrigger>
          ))}
        </TabsList>
        {
          dataTabs.map((tab, index) => (
            <TabsContent key={index} value={tab.value}  className='mt-5'>
                {tab.table}
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
        <TableModal
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
        />
        </TableModal>

      </div>
    </div>
  )
}

export default CohortTabs