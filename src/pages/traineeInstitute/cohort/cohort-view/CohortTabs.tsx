import React from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import { cohortsData } from '@/utils/LoanRequestMockData/cohortProduct'
import { MdOutlinePeople } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { cabinetGrotesk } from '@/app/fonts'
import { formatAmount } from '@/utils/Format'
import { formatDate } from '@/utils/Format'
import TableModal from '@/reuseable/modals/TableModal'
import { Cross2Icon } from "@radix-ui/react-icons";



const CohortTabs = () => {
  const [programId, setProgramId] =  React.useState("")
  const [isOpen, setIsOpen] = React.useState(false);

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



  interface TableRowData {
      [key: string]: string | number | null | React.ReactNode;
     }

  const handleRowClick = (row: TableRowData) => {
    router.push('/cohort/cohort-details')
    console.log('The row: ',row)

  }



  const handleDropdownClick = (id:string,row: TableRowData) => {
    if(id === "1") router.push('/cohortDetail')
    else if(id === "2") {
      setProgramId(String(row.id))
      setIsOpen(true)
      console.log(programId)

    }
    else {
      router.push('/loan')
    }
  }


  const ProgramHeader = [
    { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:TableRowData ) => row.cohort },
    { title: 'End date', sortable: true, id: 'endDate', selector: (row:TableRowData ) => formatDate(row?.endDate)},
    { title: 'No. of Trainees', sortable: true, id: 'noOfTrainees', selector: (row: TableRowData) => row.noOfTrainees },
    { title: 'No. of Loanees', sortable: true, id: 'noOfLoan', selector: (row:TableRowData) => row.noOfLoan },
    { title: 'Tuition', sortable: true, id: 'tuition', selector: (row:TableRowData) => formatAmount(row.tuition)},
    { title: 'Amount recieved', sortable: true, id: 'amountRecieved', selector: (row:TableRowData) => <div className='ml-8'>{formatAmount(row.amountRecieved)}</div> },
    { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => <div className='ml-8'>{formatAmount(row.amountRequested)}</div> },
    { title: 'Amount Outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) =>  <div className='ml-8'>{formatAmount(row.amountOutstanding)}</div> },

  ]

  // const IncomingData = cohortsData.filter((data) => data.Cohort === 'Cohort 1')
  const dataTabs = [
    {
      value: 'incoming',
      table: <div >
             <Tables
              tableData={cohortsData}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={47}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='incoming'
              handleDropDownClick={handleDropdownClick}

             />
             </div>
    },
     {
      value: 'current',
      table: <div>
             <Tables
              tableData={cohortsData}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={47}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='current'
             />
             </div>
    },
    {
      value: 'graduate',
      table: <div>
             <Tables
              tableData={cohortsData}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={47}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
              icon={MdOutlinePeople}
              sideBarTabName='Cohort'
              optionalFilterName='graduate'
             />
             </div>
    },

  ]


  return (
    <div className=''>
      <Tabs defaultValue='incoming'>
        <TabsList className= {`z-50 ${cabinetGrotesk.className}`}>
          {tabData.map((tab,index) => (
            <TabsTrigger data-testid={`tabName${tab.value}`}  value={tab.value} key={index}>
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
        <TableModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        closeOnOverlayClick={true}
        headerTitle='Edit Cohort'
        className='w-100%'
        icon={Cross2Icon}
        >
          hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </TableModal>
      </div>
    </div>
  )
}

export default CohortTabs