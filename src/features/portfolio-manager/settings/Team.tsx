'use client' 
import React,{useState} from 'react'
import ButtonAndSearch from '@/reuseable/action-bars/Button-and-search'
import Table from "@/reuseable/table/LoanProductTable";
import { teamData } from '@/utils/cohort/trainee-details-mock-data/Index';
import { Book } from "lucide-react";
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import {  useGetDetailsOfOrganizationQuery } from '@/service/admin/organization';
import InviteAdmin from '@/components/portfolio-manager/organization/Invite-admin';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
   }

function Team() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const {data:organizationDetail} = useGetDetailsOfOrganizationQuery({})

    const handleModalOpen =() => {
        setIsModalOpen(true);
    }

    const teamHeader = [
        { title:  <div className='relative right-4 left-4'>Full name</div>, sortable: true, id: 'fullName', selector: (row:TableRowData ) => <div className='relative right-1 left-1'>{row.fullName}</div> },
        { title: <div className='relative right-16 left-16'>Role</div>,sortable: true, id: 'role', selector: (row: TableRowData) => <div className={`${row.role === "Admin"? "text-[#212221] bg-[#ECECEC] ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-20 h-6 flex items-center justify-center relative right-10 left-10`}>{row.role}</div> },
        { title: <div className='relative right-24 left-24'>Status</div>, sortable: true, id: 'status', selector: (row:TableRowData) =>  <div className={`${row.status === "Active"? "text-success900 bg-[#E7F5EC]":   row.status === "Invited" ? "text-[#142854] bg-blue-100" :  "bg-error50 text-error900 pr-14 pl-14"} rounded-xl w-20 h-6 flex items-center justify-center relative right-20 left-20`}>{row.status}</div> },
        { title: <div className='relative right-40 left-40'>Last changed date</div>, sortable: true, id: 'lastChangedDate', selector: (row:TableRowData ) => <div className='relative right-40 left-40'>{row.lastChangedDate}</div> },
    
      ]

  return (
    <div className='mt-8'>
        <ButtonAndSearch
          id={'teamSearch'}
          value={''}
          onChange={() => {}}
          handleButtonClick={handleModalOpen}
          buttonName={'Invite colleague'}
        />
         
        <div className='w-full mt-5'>
         <Table
          tableData={teamData}
          tableHeader={teamHeader}
          handleRowClick={()=>{}}
          optionalRowsPerPage={10}
          tableHeight={48}
          icon={Book}
          condition={true}
          sideBarTabName='Colleague'
          staticHeader={"Full name"}
          staticColunm={"fullName"}
         />
        </div>
        <div>
        {
          <TableModal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           headerTitle='Invite Colleague'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
          >
           <InviteAdmin 
           setIsOpen={setIsModalOpen}
           adminType="PORTFOLIO_MANAGER"
           />
          
          </TableModal>
        }
      </div>
    
    </div>
  )
}

export default Team