import React from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import Tables from '@/reuseable/table/LoanProductTable'
// import { cohortsData } from '@/utils/LoanRequestMockData/cohortProduct'

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

  // interface TableRowData {
  //     [key: string]: string | number | null | React.ReactNode;
  //    }

  // const handleRowClick = () => {
    
  // }
  // const ProgramHeader = [
  //   { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:TableRowData ) => row.cohort },
  //   { title: 'End date', sortable: true, id: 'endDate', selector: (row:TableRowData ) => row.endDate},
  //   { title: 'No. of Trainees', sortable: true, id: 'noOfTrainees', selector: (row: TableRowData) => row.noOfTrainees },
  //   { title: 'No. of Loanees', sortable: true, id: 'noOfLoan', selector: (row:TableRowData) => row.noOfLoan },
  //   { title: 'Tuition', sortable: true, id: 'tuition', selector: (row:TableRowData) => row.tuition},
  //   { title: 'Amount recieved', sortable: true, id: 'amountRecieved', selector: (row:TableRowData) => row.amountRecieved },
  //   { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => row.AmountRequested },
  //   { title: 'Amount Outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) => row.amountOutstanding},
   
  // ]

  // const IncomingData = cohortsData.filter((data) => data.Cohort === 'Cohort 1')
  // const dataTabs = [
  //   {
  //     value: 'incoming',
  //     table: <div>

  //           </div>
  //   }
  // ]


  return (
    <div className='mt-8'>
      <Tabs defaultValue='incoming'>
        <TabsList>
          {tabData.map((tab,index) => (
            <TabsTrigger value={tab.value} key={index}>
                {tab.name}
          </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='incoming' className='mt-5'>
            <div>eeee</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CohortTabs