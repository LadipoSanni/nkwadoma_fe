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
import { setIsRequestedStaffOpen,resetRequestedStaffId} from '@/redux/slice/staff-and-request/request';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import styles from "../staff/index.module.css"


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
  const isrequestedStaffOpen = useAppSelector(state => state?.request?.isRequestedStaffOpen)
   const [requestedBy, setRequestedBy] = useState("")
   const [invitee, setInvitee] = useState("")
   const [id,setId] = useState("")
   const [role,setRole] = useState("")
   const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);
   const [status,setStatus] = useState("")
   const userRole = getUserDetailsFromStorage('user_role') 

   const [tabStates, setTabStates] = useState<Record<string, TabState>>({
                     pending: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     declined: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     
                 });

    const currentTabState = tabStates[requestTabStatusType];

   
       const dataElement = {
         name: debouncedSearchTerm,
         activationStatuses: requestTabStatusType === "pending"? ["PENDING_APPROVAL"] : ["DECLINED"],
         identityRoles:userRole === "ORGANIZATION_SUPER_ADMIN"? ["ORGANIZATION_ADMIN","ORGANIZATION_ASSOCIATE"] : userRole === "COOPERATE_FINANCIER_SUPER_ADMIN"? ['COOPERATE_FINANCIER_ADMIN'] :["PORTFOLIO_MANAGER","PORTFOLIO_MANAGER_ASSOCIATE"],
         pageNumber: debouncedSearchTerm? currentTabState?.pageSearchNumber : currentTabState?.pageNumber,
         pageSize: 10
     }
   
   
      const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement,{refetchOnMountOrArgChange: true})

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


          

   const getTableData = () => {
    if (!adminData?.data?.body) return [];
    if (debouncedSearchTerm) return adminData?.data?.body || [];
    return adminData?.data?.body;
}

       const handleRowClick = (row: TableRowData) => {
          const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
          const requestedBy = capitalizeFirstLetters(row?.requestedBy?.toString())
          const role =  row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" : row.role === "COOPERATE_FINANCIER_ADMIN"? "Admin" : "Associate"
          store.dispatch(setIsRequestedStaffOpen(true))
          store.dispatch(resetRequestedStaffId())
           setRequestedBy(requestedBy)
           setInvitee(fullName)
           setId(row?.id as string)
           setRole(role  as string)
           setStatus(row?.activationStatus as string)
      }
        
       const tableHeader = [
          
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
            title: "Requested by",  
            sortable: true, 
            id: "requestedBy", 
            selector: (row: TableRowData) => row.requestedBy || "Not provided"
          },
           { 
             title: "Role",  
             sortable: true, 
             id: "role", 
             selector: (row: TableRowData) => row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN" ||row.role === "ORGANIZATION_ADMIN"  ? "Admin" : "Associate"
           },
           { 
             title: "Requested on",  
             sortable: true, 
             id: "createdAt", 
             selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
           }
         ]

         const tableFinancierHeader = [
          
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
           title: "Requested by",  
           sortable: true, 
           id: "requestedBy", 
           selector: (row: TableRowData) => row.requestedBy || "Not provided"
         },
          
          { 
            title: "Requested on",  
            sortable: true, 
            id: "createdAt", 
            selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
          }
        ]

         const isAdmin = ["MEEDL_SUPER_ADMIN","MEEDL_ADMIN"].includes(userRole || "")
  
  return (
    <div 
    // className={`mt-5 ${["ORGANIZATION_SUPER_ADMIN","COOPERATE_FINANCIER_SUPER_ADMIN"].includes(userRole || "") && styles.container? "px-5  max-h-[52vh]" : ""}`}
    className={`mt-5 ${isAdmin ? `${styles.container} h-[74vh]` : " px-4 md:pl-6 "}`}
    style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',  
        }}
    >
      <Tabs
       value={requestTabStatusType}
       onValueChange={(value) => {
      store.dispatch(setRequestStatusTab(value));}}
      >
          
<TabsList>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="declined">Declined</TabsTrigger>
</TabsList>
     <div 
     className={`${["ORGANIZATION_SUPER_ADMIN","COOPERATE_FINANCIER_SUPER_ADMIN"].includes(userRole || "") ? ` ${styles.container} mt-6 max-h-[71vh]` : 'mt-4'} `}
     style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',  
        }}
     >
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
        tableHeader={userRole === "COOPERATE_FINANCIER_SUPER_ADMIN"? tableFinancierHeader : tableHeader}
        handleRowClick={userRole !== "MEEDL_ADMIN"? handleRowClick : () => {}}
        staticHeader='Name'
        staticColunm='firstName'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='request'
        tableCellStyle="h-12"
        tableHeight={adminData?.data?.body?.length < 10 ? 60 : undefined}
        isLoading={isLoading || isFetching }
        // hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        // setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
        setPageNumber={handlePageChange}
        // totalPages={ totalPage}
        totalPages={currentTabState.totalPages}
        sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
         optionalFilterName='Pending'
       />
      </div>
   </TabsContent>
   
   <TabsContent value="declined">
   <div className='mt-4' data-testid="table">
       <Table 
        tableData={getTableData()}
        tableHeader={userRole ==="COOPERATE_FINANCIER_SUPER_ADMIN"? tableFinancierHeader : tableHeader}
        // handleRowClick={handleRowClick}
        handleRowClick={userRole !== "MEEDL_ADMIN"? handleRowClick : () => {}}
        staticHeader='Name'
        staticColunm='firstName'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='request'
        tableCellStyle="h-12"
        // tableHeight={userRole === "ORGANIZATION_SUPER_ADMIN"? 58 : 54}
        tableHeight={adminData?.data?.body?.length < 10 ? 60 : undefined}
        isLoading={isLoading || isFetching }
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        setPageNumber={handlePageChange}
        totalPages={currentTabState.totalPages}
         sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
         optionalFilterName='declined'
       />
      </div>
   </TabsContent>
   </div>
   </Tabs>
   <div>
        <Modal
        isOpen={isrequestedStaffOpen}
        closeModal={() => {store.dispatch(setIsRequestedStaffOpen(false))
           store.dispatch(resetRequestedStaffId())}
        }
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
          requestType='staff'
          status={status}
          user_role={userRole}
        />
         
        </Modal>
      </div>
    </div>
   
  )
}

export default ViewAllRequests
