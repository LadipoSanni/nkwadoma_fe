'use client'
import React,{useState} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import {inter} from '@/app/fonts'
import { Button } from '@/components/ui/button';
import LoanProductTable from "@/reuseable/table/LoanProductTable";
// import { investmentVehicleData } from '@/utils/cohort/trainee-details-mock-data/Index';
import { formatAmount } from '@/utils/Format';
import { Book } from "lucide-react";
import Modal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";

import InviteFinanciers from '@/components/portfolio-manager/fund/financier/financiers-step';
import { financiers } from '@/utils/cohort/trainee-details-mock-data/Index';



interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
 }

function Financiers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
      setIsOpen(true)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const financierHeader = [
      { title: 'Financier', sortable: true, id: 'name', selector: (row:TableRowData ) => row.name },
      { title: 'Type', sortable: true, id: 'type', selector: (row: TableRowData) => <div className={`${row.type === "Individual"? "text-[#68442E] bg-warning50 ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-20 h-6 flex items-center justify-center`}>{row.type}</div> },
      { title: 'No. of investments', sortable: true, id: 'number_of_investments', selector: (row:TableRowData) => row.number_of_investments|| 0 },
      { title: 'Amount invested', sortable: true, id: 'amount_invested', selector: (row:TableRowData) => formatAmount(row.amount_invested)},
      { title: 'Amount earned', sortable: true, id: 'amount_earned', selector: (row:TableRowData) =>formatAmount(row.amount_earned)},
      { title: 'Payout', sortable: true, id: 'payout', selector: (row:TableRowData) => formatAmount(row.payout)},
      { title: 'Portfolio value', sortable: true, id: 'portfolio_value', selector: (row:TableRowData) => formatAmount(row.portfolio_value)},
  
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
          className={` bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center md:max-w-32 w-full cursor-pointer`}
          // className={` bg-neutral650 text-meedlWhite  h-12 flex justify-center items-center md:max-w-32 w-full cursor-auto`}
          onClick={handleOpenModal}
         >
          Invite financier
         </Button>
        </div>
        <div className='mt-6 '>
          <LoanProductTable
             tableData={financiers}
             tableHeader={financierHeader}
             handleRowClick={()=>{}}
             optionalRowsPerPage={10}
             tableHeight={48}
            icon={Book}
            sideBarTabName='financier'
            condition={true}
            staticHeader={"Financier"}
            staticColunm={"financier"}
            
          />
        </div>
        <div>
          <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          headerTitle='Invite financier'
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          width='36%'
          >
           <InviteFinanciers investmentId='1' setIsOpen={setIsOpen}/>
          </Modal>
        </div>
    </div>
  )
}

export default Financiers