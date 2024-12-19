'use client'
import React,{useState} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import {inter} from '@/app/fonts'
import { Button } from '@/components/ui/button';
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import { investmentVehicleData } from '@/utils/cohort/trainee-details-mock-data/Index';
import { formatAmount } from '@/utils/Format';
import { Book } from "lucide-react";



interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
 }

function Financiers() {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const investmentHeader = [
      { title: 'Financier', sortable: true, id: 'financier', selector: (row:TableRowData ) => row.financier },
      { title: 'Type', sortable: true, id: 'type', selector: (row: TableRowData) => <div className={`${row.type === "Individual"? "text-[#68442E] bg-warning50 ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-20 h-6 flex items-center justify-center`}>{row.type}</div> },
      { title: 'No. of investments', sortable: true, id: 'noOfInvestments', selector: (row:TableRowData) => row.noOfInvestments|| 0 },
      { title: 'Amount invested', sortable: true, id: 'amountInvested', selector: (row:TableRowData) => formatAmount(row.amountInvested)},
      { title: 'Amount earned', sortable: true, id: 'amountEarned', selector: (row:TableRowData) =>formatAmount(row.amountEarned)},
      { title: 'Payout', sortable: true, id: 'payout', selector: (row:TableRowData) => formatAmount(row.payout)},
      { title: 'Portfolio value', sortable: true, id: 'portfolioValue', selector: (row:TableRowData) => formatAmount(row.portfolioValue)},
  
    ]
  return (
    <div  className={`${inter.className}`}>
        <div className={'md:flex  md:justify-between gap-5 grid'}>
        <SearchInput
            id={'financiersSearchInput'}
             value={searchTerm}
            onChange={handleSearchChange}
         />     
         <Button
          variant={"secondary"}
          size={"lg"}
          id='inviteFinancierModal'
          className={` bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center md:max-w-32 w-full`}
         >
          Invite financier
         </Button>
        </div>
        <div className='mt-4 '>
          <LoanProductTable
             tableData={investmentVehicleData}
             tableHeader={investmentHeader}
             handleRowClick={()=>{}}
             optionalRowsPerPage={10}
             tableHeight={48}
            icon={Book}
            sideBarTabName='Investment vehicle'
            condition={true}
            staticHeader={"Financier"}
            staticColunm={"financier"}
            
          />
        </div>
    </div>
  )
}

export default Financiers