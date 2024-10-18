import React from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import { cohortsData } from '@/utils/LoanRequestMockData/cohortProduct'

const CohortTabs = () => {
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
      name: "View Program",
      id: "1"
    },
    {
      name: "Edit Program",
      id: "2"
    },
    {
      name: "Delete Program",
      id: "3"
    }
  ]

  interface TableRowData {
      [key: string]: string | number | null | React.ReactNode;
     }

  const handleRowClick = () => {
    
  }
  const ProgramHeader = [
    { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:TableRowData ) => row.cohort },
    { title: 'End date', sortable: true, id: 'endDate', selector: (row:TableRowData ) => row.endDate},
    { title: 'No. of Trainees', sortable: true, id: 'noOfTrainees', selector: (row: TableRowData) => row.noOfTrainees },
    { title: 'No. of Loanees', sortable: true, id: 'noOfLoan', selector: (row:TableRowData) => row.noOfLoan },
    { title: 'Tuition', sortable: true, id: 'tuition', selector: (row:TableRowData) => row.tuition},
    { title: 'Amount recieved', sortable: true, id: 'amountRecieved', selector: (row:TableRowData) => row.amountRecieved },
    { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => row.amountRequested },
    { title: 'Amount Outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) => row.amountOutstanding},
   
  ]

  // const IncomingData = cohortsData.filter((data) => data.Cohort === 'Cohort 1')
  const dataTabs = [
    {
      value: 'incoming',
      table: <div>
             <Tables
              tableData={cohortsData}
              handleRowClick={handleRowClick}
              tableHeader={ProgramHeader}
              tableHeight={50}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
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
              tableHeight={50}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
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
              tableHeight={50}
              sx='cursor-pointer'
              staticColunm='cohort'
              staticHeader='Cohort'
              showKirkBabel={true}
              kirkBabDropdownOption={dropDownOption}
             />
             </div>
    },

  ]


  return (
    <div className='mt-8'>
      <Tabs defaultValue='incoming'>
        <TabsList>
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
    </div>
  )
}

export default CohortTabs