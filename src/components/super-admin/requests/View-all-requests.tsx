"use client"
import React,{useState} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import Table from '@/reuseable/table/Table';
import { getPaginatedData } from '@/utils/Mock-paginated-data';
import { formatMonthInDate } from '@/utils/Format'
import {MdOutlineAssignmentTurnedIn} from 'react-icons/md';
import Modal from '@/reuseable/modals/TableModal';
import { requests } from '@/utils/LoanRequestMockData/Index';
import { Cross2Icon } from "@radix-ui/react-icons";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function ViewAllRequests() {
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(0);
   const [isOpen,setOpen] = useState(false)
   const [name, setName] = useState("")

   const { hasNextPage, currentPageItems, totalPages } = getPaginatedData(currentPage, 10, requests);
  

       const handleRowClick = (row: TableRowData) => {
           console.log(row)
           setOpen(true)
           setName(row?.requested_by as string)
          
      }
   
       const tableHeader = [
           { 
             title: "Requested by",  
             sortable: true, 
             id: "requested_by", 
             selector: (row: TableRowData) => row.requested_by
           },
           { 
            title: "Invitee",  
            sortable: true, 
            id: "invitee", 
            selector: (row: TableRowData) => row.invitee
          },
           { 
             title: "Email",  
             sortable: true, 
             id: "email", 
             selector: (row: TableRowData) => row.email 
           },
           { 
             title: "Role",  
             sortable: true, 
             id: "role", 
             selector: (row: TableRowData) => row.role 
           },
           { 
             title: "Status",  
             sortable: true, 
             id: "status", 
             selector: (row: TableRowData) => <span className={`${row.status === "Active"? "bg-[#E6F2EA] text-[#045620] " :row.status === "Pending"? "bg-[#FEF6E8] text-[#68442E] w-20" :  "bg-[#FBE9E9] text-[#971B17] "} rounded-lg  px-2 `}>{row.status}</span> 
           },
           { 
             title: "Invited",  
             sortable: true, 
             id: "date_invited", 
             selector: (row: TableRowData) => formatMonthInDate(row.date_invited) 
           }
         ]
  
  return (
    <div className='mt-8 px-6'>
       <SearchInput
          testId='search-input'
          id="staffSearchLoanee"
          value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         style="md:w-20 w-full"
        />
       <div className='mt-6' data-testid="table">
       <Table 
        tableData={currentPageItems}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader='Name'
        staticColunm='Name'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='requests'
        tableCellStyle="h-12"
        tableHeight={59}
        hasNextPage={hasNextPage}
        pageNumber={currentPage}
        totalPages={totalPages}
        setPageNumber={setCurrentPage}
         sx='cursor-pointer'
         condition={true}
      
       />
      </div>
      <div>
        <Modal
        isOpen={isOpen}
        closeModal={() => setOpen(false)}
       className='pb-1'
        closeOnOverlayClick={true}
        icon={Cross2Icon}
        headerTitle='Request'
        >

        {name}
        </Modal>
      </div>
    </div>
  )
}

export default ViewAllRequests
