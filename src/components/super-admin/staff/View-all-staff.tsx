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
import Detail from './Detail';
import { useViewOrganizationAdminQuery } from '@/service/admin/organization';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface Props{
    status?: string
}


function Staff({status}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const filteredStaff = status? allStaff?.filter(staff => staff?.Status?.toLowerCase() === status.toLowerCase()) : allStaff;
    const [isOpen,setOpen] = useState(false)
    const paginationData = React.useMemo(() => {
      return getPaginatedData(currentPage, 10, filteredStaff);
    }, [currentPage, filteredStaff]);
    const { hasNextPage, currentPageItems, totalPages } = paginationData;
    const [modal,setModal] = useState("invite")
    const [id,setId] = useState("")
     const [role,setRole] = useState("")
     const [stat,setStatus] = useState('')
     const [email,setEmail] = useState('')
     const [name,setName] = useState('')
     const [date, setInvitedDate] = useState('')
     const [isSwitch, setSwitch] = useState(false);
     const adminRoleType = [ { value: "MEEDL_ADMIN", label: "Admin" }, { value: "PORTFOLIO_MANAGER", label: "Portfolio manager" }, { value: "MEEDL_ASSOCIATE", label: "Associate"} ];
      const [hasNextPages,setNextPage] = useState(false)
      const [totalPage,setTotalPage] = useState(0)
      const [pageNumber,setPageNumber] = useState(0)
    const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [searchHasNextPages,setSearchNextPage] = useState(false)

    const dataElement = {
      activationStatuses: ['INVITED',"APPROVED"],
      identityRoles:["PORTFOLIO_MANAGER","MEEDL_ADMIN","MEEDL_ASSOCIATE"],
      pageNumber:pageNumber,
      pageSize: 10
  }

   const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement)
    
   const handleOpen =() => {
    setModal('invite')
    setOpen(true)
   }


   const handleRowClick = (row: TableRowData) => {
    setModal('detail')
    setOpen(true)
    setStatus(row?.Status as string)
    setName(row?.Name as string)
    setEmail(row?.Email as string)
    setRole(row?.Role  as string)
    setInvitedDate(row?.DateInvited as string)
    setId(row?.id as string)
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
          selector: (row: TableRowData) => <span className={`${row.Status === "Active"? "bg-[#E6F2EA] text-[#045620] " :row.Status === "Pending"? "bg-[#FEF6E8] text-[#68442E] w-20" :  "bg-[#FBE9E9] text-[#971B17]"} rounded-lg  px-2 `}>{row.Status}</span> 
        },
        { 
          title: "Invited",  
          sortable: true, 
          id: "DateInvited", 
          selector: (row: TableRowData) => formatMonthInDate(row.DateInvited) 
        }
      ]


  return (
    <div className='mt-8 px-6'>
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
        handleRowClick={handleRowClick}
        staticHeader='Name'
        staticColunm='Name'
        icon={MdOutlineAccountBalance}
        sideBarTabName='staff'
        tableCellStyle="h-12"
        tableHeight={59}
        hasNextPage={hasNextPage}
        pageNumber={currentPage}
        totalPages={totalPages}
        setPageNumber={setCurrentPage}
         sx='cursor-pointer'
        //  condition={true}
        //  showKirkBabel={true}
       />
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => {
          setOpen(false)
          setSwitch(false)
        }}
        className='pb-1'
        closeOnOverlayClick={true}
        icon={Cross2Icon}
        width='36%'
         headerTitle={modal === "invite"?'Invite staff' : isSwitch && stat === "Active"? "Deactivate reason" :  isSwitch && stat === "Deactivated"? "Activate reason" : ""}
         styeleType={modal === "invite" || isSwitch? "styleBody" :  "styleBodyTwo"}
      >
       { modal === "invite" ?
        <InviteStaff 
        setIsOpen={setOpen}
        roleOptions={adminRoleType}
        /> : 
         <div className='mt-16'>
          <Detail
          role={role}
          name={name}
          email={email}
          status={stat}
          dateInvited={date}
          setSwitch={setSwitch}
          isSwitch={isSwitch}
          id={id}
          setIsOpen={setOpen}
          />
          </div>
        }
      </Modal>
    </div>
  )
}

export default Staff
