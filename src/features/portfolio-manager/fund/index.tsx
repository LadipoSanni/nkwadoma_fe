"use client";
import React,{useState} from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import { inter } from '@/app/fonts'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
import { fund } from '@/utils/LoanRequestMockData/Index';
import { formatAmount, formatDate } from '@/utils/Format';
import { MdOutlinePayments } from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
 }


const tabData = [
  {name:"Commercial funds",
      value: "commercialFund"
    },
    {
      name:"Endowment funds",
      value: "endowmentFund"
    },
]



const InvestmentVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDraftClick = () => {

  }
   const handleCreateInvestmentVehicleClick = () => {
     setIsModalOpen(true);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    // setSearchTerm(event.target.value);
    console.log(event)
  };
  
  const fundHeader = [
    { title: <div className='h-11 flex justify-center items-center'>Vehicle</div> , sortable: true, id: 'vehicle', selector: (row:TableRowData ) => row.vehicle},
    { title: 'Start Date', sortable: true, id: 'startDate', selector: (row:TableRowData ) => formatDate(row?.startDate)},
      { title: 'Tenure(Months)', sortable: true, id: 'tenureMonths', selector: (row: TableRowData) => row.tenureMonths },
      { title: 'vehicle Size', sortable: true, id: 'vehicleSize', selector: (row:TableRowData) => <div className=''>{formatAmount(row.vehicleSize)}</div> },
      { title: 'InterestRate (%)', sortable: true, id: 'interestRatePercent', selector: (row:TableRowData) => formatAmount(row.interestRatePercent)},
      { title: 'Amount Collected', sortable: true, id: 'amountCollected', selector: (row:TableRowData) => <div className='ml-4'>{formatAmount(row.amountCollected)}</div> },
      { title: 'Amount Disbursed', sortable: true, id: 'amountDisbursed', selector: (row:TableRowData) => <div className='ml-6'>{formatAmount(row.amountDisbursed)}</div> },
      { title: 'Amount Available', sortable: true, id: 'amountAvailable', selector: (row:TableRowData) =>  <div className='ml-8'>{formatAmount(row.amountAvailable)}</div> },
  ]
  
  
  const tabContent = [
    {
      actionBar: <div>
        <InvestmentActionBar 
           id='commercialFundId'
           value=''
           onChange={handleSearchChange}
           handleDraftClick={handleDraftClick}
           handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
        />
      </div>,
      value: "commercialFund",
      table: <div>
        <Tables
          tableData={fund}
          handleRowClick={() => {}}
          tableHeader={fundHeader}
           tableHeight={52}
           sx='cursor-pointer'
           tableCellStyle={'h-12'}
            optionalRowsPerPage={10}
            staticHeader={'Vehicle'}
           staticColunm={'vehicle'}
           icon={MdOutlinePayments}
           sideBarTabName='Fund'
           optionalFilterName='Commercial'
        />
      </div>
    },
    {
      actionBar: <div>
         <InvestmentActionBar 
          id='endowmentFundId'
          value=''
          onChange={handleSearchChange}
          handleDraftClick={handleDraftClick}
          handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
         />
      </div>,
      value: "endowmentFund",
      table: <div>
        <Tables
          tableData={fund}
          handleRowClick={() => {}}
          tableHeader={fundHeader}
           tableHeight={52}
           optionalRowsPerPage={10}
           staticHeader={'Vehicle'}
           staticColunm={'vehicle'}
            tableCellStyle={'h-12'}
            icon={MdOutlinePayments}
            sideBarTabName='Fund'
            optionalFilterName='Endowment'
        />
      </div>
    }
  ]


  return (
    <div className={`px-6 py-5 ${inter.className}`}>
     <Tabs defaultValue='commercialFund'>
      <TabsList className= {`z-50 `}>
      {tabData.map((tab,index) => (
            <TabsTrigger data-testid={`tabDataName${tab.value}`}  value={tab.value} key={index}>
                {tab.name}
          </TabsTrigger>
          ))}
      </TabsList>
      {
          tabContent.map((tab, index) => (
            <TabsContent key={index} value={tab.value}  className='mt-5'>
                <div className='mt-8'>
                  {tab.actionBar}
                </div>
                <div className='mt-6'>
                  {tab.table}
                </div>
            </TabsContent>
          ))
        }
     </Tabs>
      <div>
        {
          <TableModal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           headerTitle='Create Investment Vehicle'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
          >
            create
          </TableModal>
        }
      </div>
    </div>
  )
}

export default InvestmentVehicle