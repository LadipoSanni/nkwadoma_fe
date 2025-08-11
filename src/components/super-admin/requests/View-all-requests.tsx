"use client"
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import Table from '@/reuseable/table/Table';
// import { getPaginatedData } from '@/utils/Mock-paginated-data';
import { formatMonthInDate } from '@/utils/Format'
import {MdOutlineAssignmentTurnedIn} from 'react-icons/md';
import Modal from '@/reuseable/modals/TableModal';
// import { requests } from '@/utils/LoanRequestMockData/Index';
import { Cross2Icon } from "@radix-ui/react-icons";
import DeclineOrApprove from './Decline-or-approve';
import { useViewOrganizationAdminQuery} from '@/service/admin/organization';
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function ViewAllRequests() {
   const [searchTerm, setSearchTerm] = useState("");
  //  const [currentPage, setCurrentPage] = useState(0);
   const [isOpen,setOpen] = useState(false)
   const [requestedBy, setRequestedBy] = useState("")
   const [invitee, setInvitee] = useState("")
   const [id,setId] = useState("")
   const [role,setRole] = useState("")
   const [hasNextPages,setNextPage] = useState(false)
         const [totalPage,setTotalPage] = useState(0)
         const [pageNumber,setPageNumber] = useState(0)
       const [pageSearchNumber,setPageSearchNumber] = useState(0)
       const [searchHasNextPage,setSearchHasNextPage] = useState(false)
         const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);
   
       const dataElement = {
         name: debouncedSearchTerm,
         activationStatuses: ['DECLINED',"PENDING_APPROVAL"],
         identityRoles:["PORTFOLIO_MANAGER","MEEDL_ASSOCIATE"],
         pageNumber:pageNumber,
         pageSize: 10
     }
   
   
      const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement)

      useEffect(()=> {
          if(debouncedSearchTerm && adminData && adminData?.data ){
            setSearchHasNextPage(adminData?.data?.hasNextPage)
            setTotalPage(adminData?.data?.totalPages)
            setPageSearchNumber(adminData?.data?.pageNumber)    
          }else  if(!debouncedSearchTerm && adminData && adminData?.data  ){
            setNextPage(adminData?.data?.hasNextPage)
            setTotalPage(adminData?.data?.totalPages)
            setPageNumber(adminData?.data?.pageNumber)
        }
         },[adminData,debouncedSearchTerm])

  //  const { hasNextPage, currentPageItems, totalPages } = getPaginatedData(currentPage, 10, requests);

   const getTableData = () => {
    if (!adminData?.data?.body) return [];
    if (debouncedSearchTerm) return adminData?.data?.body || [];
    return adminData?.data?.body;
}
  

       const handleRowClick = (row: TableRowData) => {
          const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
          const role =  row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" : "Associate"
           setOpen(true)
           setRequestedBy(row?.requested_by as string)
           setInvitee(fullName)
           setId(row?.id as string)
           setRole(role  as string)
      }
   
       const tableHeader = [
           { 
             title: "Requested by",  
             sortable: true, 
             id: "requestedBy", 
             selector: (row: TableRowData) => row.requestedBy
           },
           { 
            title: "Invitee",  
            sortable: true, 
            id: "firstName", 
            selector: (row: TableRowData) => capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
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
             selector: (row: TableRowData) => row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" : "Associate"
           },
           { 
             title: "Status",  
             sortable: true, 
             id: "activationStatus", 
             selector: (row: TableRowData) => <span className={`${row.activationStatus === "DECLINED"? " bg-[#FBE9E9] text-[#971B17] " :row.activationStatus === "PENDING_APPROVAL"? "bg-[#FEF6E8] text-[#68442E] w-20" :  "bg-[#E6F2EA] text-[#045620]"} rounded-lg  px-2 `}>{row.activationStatus === "PENDING_APPROVAL"? "Pending" : "Declined"}</span> 
           },
           { 
             title: "Requested on",  
             sortable: true, 
             id: "createdAt", 
             selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
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
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader='Requested by'
        staticColunm='requested_by'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='requests'
        tableCellStyle="h-12"
        tableHeight={59}
        isLoading={isLoading || isFetching }
        hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
        pageNumber={searchTerm !== ""? pageSearchNumber :pageNumber}
        setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
        totalPages={ totalPage}
         sx='cursor-pointer'
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
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
        styeleType={"styleBodyTwo"}
        >

        <DeclineOrApprove
          requestedBy={requestedBy}
          invitee={invitee}
          id={id}
          role={role}
          setOpen={setOpen}
        />
         
        </Modal>
      </div>
    </div>
  )
}

export default ViewAllRequests
