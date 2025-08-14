"use client"
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import Table from '@/reuseable/table/Table';
// import { getPaginatedData } from '@/utils/Mock-paginated-data';
import { formatMonthInDate } from '@/utils/Format'
import {MdOutlineAssignmentTurnedIn} from 'react-icons/md';
import Modal from '@/reuseable/modals/TableModal';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Cross2Icon } from "@radix-ui/react-icons";
import DeclineOrApprove from './Decline-or-approve';
import { useViewOrganizationAdminQuery} from '@/service/admin/organization';
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { setRequestStatusTab } from '@/redux/slice/staff-and-request/request';
import { store,useAppSelector } from '@/redux/store';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface TabState {
  pageNumber?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageSearchNumber?: number;
}

function ViewAllRequests() {
   const [searchTerm, setSearchTerm] = useState("");
  const requestTabStatusType = useAppSelector(state => state?.request?.requestStatusTab)
   const [isOpen,setOpen] = useState(false)
   const [requestedBy, setRequestedBy] = useState("")
   const [invitee, setInvitee] = useState("")
   const [id,setId] = useState("")
   const [role,setRole] = useState("")
   const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

   const [tabStates, setTabStates] = useState<Record<string, TabState>>({
                     pending: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     declined: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     
                 });

    const currentTabState = tabStates[requestTabStatusType];

   
       const dataElement = {
         name: debouncedSearchTerm,
         activationStatuses: requestTabStatusType === "pending"? ["PENDING_APPROVAL"] : ["DECLINED"],
         identityRoles:["PORTFOLIO_MANAGER","MEEDL_ASSOCIATE"],
         pageNumber: debouncedSearchTerm? currentTabState?.pageSearchNumber : currentTabState?.pageNumber,
         pageSize: 10
     }
   
   
      const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement)

      useEffect(()=> {
          if(debouncedSearchTerm && adminData && adminData?.data ){
            setTabStates(prev => ({
              ...prev,
              [requestTabStatusType]: {
                pageSearchNumber: adminData?.data.pageNumber,
                  totalPages: adminData?.data.totalPages,
                  hasNextPage: adminData?.data.hasNextPage
              }
          }));  
          }else  if(!debouncedSearchTerm && adminData && adminData?.data  ){
            setTabStates(prev => ({
              ...prev,
              [requestTabStatusType]: {
                pageNumber: adminData?.data.pageNumber,
                  totalPages: adminData?.data.totalPages,
                  hasNextPage: adminData?.data.hasNextPage
              }
          }));  
        }
         },[adminData,debouncedSearchTerm,requestTabStatusType])

  const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
              if(!searchTerm){
                const newPage = typeof value === 'function' ? value(currentTabState.pageNumber || 0 ) : value;
                setTabStates(prev => ({
                    ...prev,
                    [requestTabStatusType]: {
                        ...prev[requestTabStatusType],
                        pageNumber: newPage
                    }
                }));
              }else {
                const newPage = typeof value === 'function' ? value(currentTabState.pageSearchNumber || 0 ) : value;
                setTabStates(prev => ({
                    ...prev,
                    [requestTabStatusType]: {
                        ...prev[requestTabStatusType],
                        pageSearchNumber: newPage
                    }
                }));
              }
              
          };


          console.log(tabStates)

   const getTableData = () => {
    if (!adminData?.data?.body) return [];
    if (debouncedSearchTerm) return adminData?.data?.body || [];
    return adminData?.data?.body;
}
  

       const handleRowClick = (row: TableRowData) => {
          const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
          const requestedBy = capitalizeFirstLetters(row?.requestedBy?.toString())
          const role =  row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" : "Associate"
           setOpen(true)
           setRequestedBy(requestedBy)
           setInvitee(fullName)
           setId(row?.id as string)
           setRole(role  as string)
      }
   
       const tableHeader = [
           { 
             title: "Requested by",  
             sortable: true, 
             id: "requestedBy", 
             selector: (row: TableRowData) => row.requestedBy || "Not provided"
           },
           { 
            title:  <div className='md:mr-16'>Invitee</div>,  
            sortable: true, 
            id: "firstName", 
            selector: (row: TableRowData) => capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
          },
           { 
             title: <div className='md:mr-32'>Email</div>,  
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
          //  { 
          //    title: "Status",  
          //    sortable: true, 
          //    id: "activationStatus", 
          //    selector: (row: TableRowData) => <span className={`${row.activationStatus === "DECLINED"? " bg-[#FBE9E9] text-[#971B17] " :row.activationStatus === "PENDING_APPROVAL"? "bg-[#FEF6E8] text-[#68442E] w-20" :  "bg-[#E6F2EA] text-[#045620]"} rounded-lg  px-2 `}>{row.activationStatus === "PENDING_APPROVAL"? "Pending" : "Declined"}</span> 
          //  },
           { 
             title: "Requested on",  
             sortable: true, 
             id: "createdAt", 
             selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
           }
         ]
  
  return (
    <div className='mt-5'>
      <Tabs
       value={requestTabStatusType}
       onValueChange={(value) => {
      store.dispatch(setRequestStatusTab(value));}}
      >
          
<TabsList>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="declined">Declined</TabsTrigger>
</TabsList>
     <div className='mt-4 '>
   <div className=''>
   <SearchInput
          testId='search-input'
          id="staffSearchLoanee"
          value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         style="md:w-20 w-full"
   />
   </div>
   <TabsContent value="pending">
       <div className='mt-4' data-testid="table">
       <Table 
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader='Requested by'
        staticColunm='requestedBy'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='request'
        tableCellStyle="h-12"
        tableHeight={50}
        isLoading={isLoading || isFetching }
        // hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        // setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
        setPageNumber={handlePageChange}
        // totalPages={ totalPage}
        totalPages={currentTabState.totalPages}
         sx='cursor-pointer'
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
         optionalFilterName='Pending'
       />
      </div>
   </TabsContent>
   </div>
   <TabsContent value="declined">
   <div className='mt-4' data-testid="table">
       <Table 
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader='Requested by'
        staticColunm='requestedBy'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='request'
        tableCellStyle="h-12"
        tableHeight={50}
        isLoading={isLoading || isFetching }
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        setPageNumber={handlePageChange}
        totalPages={currentTabState.totalPages}
         sx='cursor-pointer'
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
         optionalFilterName='declined'
       />
      </div>
   </TabsContent>
   </Tabs>
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
          requestType='staff'
        />
         
        </Modal>
      </div>
    </div>
   
  )
}

export default ViewAllRequests
