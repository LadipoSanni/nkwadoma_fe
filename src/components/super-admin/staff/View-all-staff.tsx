"use client"
import React,{useState} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import Table from '@/reuseable/table/Table';
import { allStaff } from '@/utils/LoanRequestMockData/Index';
import { getPaginatedData } from '@/utils/Mock-paginated-data';
import { formatMonthInDate } from '@/utils/Format'
import { MdOutlineAccountBalance } from 'react-icons/md';
import InviteStaff from './Invite-staff';
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from "@radix-ui/react-icons";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface Props{
    status?: string
}


function Staff({status}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const filteredStaff = status? allStaff?.filter(staff => staff.Status.toLowerCase() === status.toLowerCase()) : allStaff;
    const [isOpen,setOpen] = useState(false)

    const {hasNextPage,currentPageItems,totalPages} = getPaginatedData(currentPage,10,filteredStaff,setCurrentPage)
    
   const handleOpen =() => {
    setOpen(true)
   }


    const tableHeader = [
        { 
          title: "Name",  
          sortable: true, 
          id: "Name", 
          selector: (row: TableRowData) => row.Name 
        },
        { 
          title: "Email",  
          sortable: true, 
          id: "Email", 
          selector: (row: TableRowData) => row.Email 
        },
        { 
          title: "Role",  
          sortable: true, 
          id: "Role", 
          selector: (row: TableRowData) => row.Role 
        },
        { 
          title: "Status",  
          sortable: true, 
          id: "Status", 
          selector: (row: TableRowData) => <span className={`${row.Status === "Active"? "bg-[#E6F2EA] text-[#045620] " :row.Status === "Pending"? "bg-[#FEF6E8] text-[#68442E] w-20" :  "bg-[#FBE9E9] text-[#971B17] "} rounded-lg  px-3 `}>{row.Status}</span> 
        },
        { 
          title: "Invited",  
          sortable: true, 
          id: "DateInvited", 
          selector: (row: TableRowData) => formatMonthInDate(row.DateInvited) 
        }
      ]

  return (
    <div className='mt-7'>
      <div className='md:flex justify-between items-center'>
        <SearchInput
          testId='search-input'
          id="staffSearchLoanee"
          value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         style="md:w-20 w-full"
        />

        <div className='md:mt-0 mt-4'>
            <Button
              id="inviteStaff"
              variant={'secondary'}
              className='h-[45px] w-full font-semibold md:w-[120px]'
              onClick={handleOpen}
            >
             Invite staff
            </Button>
        </div>
      </div>
      <div className='mt-6' data-testid="table">
       <Table 
        tableData={currentPageItems}
        tableHeader={tableHeader}
        handleRowClick={()=> {}}
        staticHeader='Name'
        staticColunm='Name'
        icon={MdOutlineAccountBalance}
        sideBarTabName='staff'
        tableCellStyle="h-12"
        tableHeight={55}
        hasNextPage={hasNextPage}
        pageNumber={currentPage}
        totalPages={totalPages}
        setPageNumber={setCurrentPage}
       />
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setOpen(false)}
        className='pb-1'
        closeOnOverlayClick={true}
        icon={Cross2Icon}
        width='36%'
         headerTitle='Invite staff'
      >
        <InviteStaff setIsOpen={setOpen}/>
      </Modal>
    </div>
  )
}

export default Staff
