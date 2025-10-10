"use client"
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import Table from '@/reuseable/table/Table';
import { formatMonthInDate } from '@/utils/Format'
import {MdOutlineAssignmentTurnedIn} from 'react-icons/md';
import Modal from '@/reuseable/modals/TableModal';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Cross2Icon } from "@radix-ui/react-icons";
import DeclineOrApprove from './Decline-or-approve';
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { setRequestFinancierStatusTab,setIsRequestedFinancierOpen,resetRequestedFinancierId} from '@/redux/slice/staff-and-request/request';
import { store,useAppSelector } from '@/redux/store';
import styles from "../staff/index.module.css"
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {useSearchFinancierQuery,useGetAllActiveAndInvitedFinanciersQuery} from '@/service/admin/financier';

interface UserIdentity {
    email?: string;
   
}

interface viewAllFinancier {
    name: string,
    userIdentity: UserIdentity,
    requestedOn: string,
    invitedBy: string,
    financierType: string,
    email?: string
}

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | UserIdentity;
}

type headerRow = viewAllFinancier & TableRowData

interface TabState {
  pageNumber?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageSearchNumber?: number;
}

function ViewAllRequestedFinancier() {
   const [searchTerm, setSearchTerm] = useState("");
   const requestTabStatusType = useAppSelector(state => state?.request?.requestedFinancierStatusTab)
   const isrequestedFinancierOpen = useAppSelector(state => state?.request?.isRequestedFinancierOpen)
   const [requestedBy, setRequestedBy] = useState("")
   const [invitee, setInvitee] = useState("")
   const [id,setId] = useState("")
   const [role,setRole] = useState("")
   const [status,setStatus] = useState("")
   const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);
   const userRole = getUserDetailsFromStorage('user_role')

   const [tabStates, setTabStates] = useState<Record<string, TabState>>({
                     pending: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     declined: { pageNumber: 0, totalPages: 0, hasNextPage: false, pageSearchNumber:0 },
                     
                 });

    const currentTabState = tabStates[requestTabStatusType];

    const param = {
        pageNumber: currentTabState.pageNumber ?? 0,
        pageSize: 10,
        activationStatuses: requestTabStatusType === "pending"?['PENDING_APPROVAL'] : ['DECLINED'],
    }


    const searchElement = {
        name:debouncedSearchTerm,
        pageNumber: currentTabState.pageNumber ?? 0,
        pageSize: 10,
        activationStatuses: requestTabStatusType === "pending"?['PENDING_APPROVAL'] : ['DECLINED'],
    }

    const {data, isLoading, refetch,isFetching} = useGetAllActiveAndInvitedFinanciersQuery(param)

     const {data: searchResults, isLoading: isSearchloading, isFetching: isSearchfetching} = useSearchFinancierQuery(searchElement,{skip: !debouncedSearchTerm})
   

      useEffect(()=> {
          if(debouncedSearchTerm && searchResults && searchResults?.data ){
            setTabStates(prev => ({
              ...prev,
              [requestTabStatusType]: {
                pageSearchNumber: searchResults?.data.pageNumber,
                  totalPages: searchResults?.data.totalPages,
                  hasNextPage: searchResults?.data.hasNextPage
              }
          }));  
          }else  if(!debouncedSearchTerm && data && data?.data  ){
            setTabStates(prev => ({
              ...prev,
              [requestTabStatusType]: {
                pageNumber: data?.data.pageNumber,
                  totalPages: data?.data.totalPages,
                  hasNextPage: data?.data.hasNextPage
              }
          }));  
        }
         },[searchResults,data,debouncedSearchTerm,requestTabStatusType])

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
    if (!data?.data?.body) return [];
    if (debouncedSearchTerm) return searchResults?.data?.body || [];
    return data?.data?.body;
}
  

       const handleRowClick = (row: TableRowData) => {
          const fullName = capitalizeFirstLetters(row?.name?.toString())
          const requestedBy = capitalizeFirstLetters(row?.invitedBy?.toString())
          const role =  row.financierType === "INDIVIDUAL"? "Individual financier" : row.financierType === "COOPERATE"? "Financier super admin" : "Associate"
          store.dispatch(setIsRequestedFinancierOpen(true))
          store.dispatch(resetRequestedFinancierId())
           setRequestedBy(requestedBy)
           setInvitee(fullName)
           setId(row?.id as string)
           setRole(role  as string)
           setStatus(row?.activationStatus as string)
      }
   
       const tableHeader = [
           { 
             title: "Name",  
             sortable: true, 
             id: "name", 
             selector: (row:headerRow) => row.name || "Not provided"
           },
           { 
            title:  <div>Invited by</div>,  
            sortable: true, 
            id: "requestedBy", 
            selector: (row: headerRow) => capitalizeFirstLetters(row?.invitedBy?.toString())
          },
           { 
             title: <div className='md:mr-24'>Email</div>,  
             sortable: true, 
             id: "email", 
             selector: (row: headerRow) => row?.email 
           },
        //    { 
        //     title: "Role",  
        //     sortable: true, 
        //     id: "role", 
        //     selector: (row: TableRowData) => row.financierType === "COOPERATE"? "Super admin"  : "Individual"
        //   },
            { 
                     title: "Type",  
                     sortable: true, 
                     id: "financierType", 
                     selector: (row: TableRowData) =>  (
                                     <span className={`${row.financierType === "INDIVIDUAL"  ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5 truncate`}>
                                 {capitalizeFirstLetters(String(row.financierType))}
                             </span>
                                 )
                   },
           { 
             title: "Requested on",  
             sortable: true, 
             id: "invitedDate", 
             selector: (row: headerRow) =>  row?.requestedInvitationDate ? formatMonthInDate(String(row?.requestedInvitationDate)) : formatMonthInDate(new Date().toISOString())
           }
         ]

      const isAdmin = ["MEEDL_SUPER_ADMIN","MEEDL_ADMIN"].includes(userRole || "")
  
  return (
    <div 
    className={`mt-5 ${isAdmin ? `${styles.container} h-[74vh]` : ""}`}
    style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',  
        }}
    >
      <Tabs
       value={requestTabStatusType}
       onValueChange={(value) => {
      store.dispatch(setRequestFinancierStatusTab(value));}}
      >
          
<TabsList>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="declined">Declined</TabsTrigger>
</TabsList>
     <div className={`mt-4 `}>
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
        handleRowClick={userRole !== "MEEDL_ADMIN"? handleRowClick : () => {}}
        staticHeader='Name'
        staticColunm='name'
        icon={MdOutlineAssignmentTurnedIn}
         sideBarTabName='Organization'
        tableCellStyle="h-12"
        tableHeight={data?.data?.body?.length < 10 || searchResults?.data?.body?.length < 10 ? 60 : undefined}
        isLoading={isLoading || isFetching || isSearchfetching || isSearchloading}
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        setPageNumber={handlePageChange}
        totalPages={currentTabState.totalPages}
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchResults?.data?.body?.length < 1 }
         optionalFilterName='Pending'
         sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
       />
      </div>
   </TabsContent>
  
   <TabsContent value="declined">
   <div className='mt-4' data-testid="table">
       <Table 
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={userRole !== "MEEDL_ADMIN"? handleRowClick : () => {}}
        staticHeader='Name'
        staticColunm='name'
        icon={MdOutlineAssignmentTurnedIn}
        sideBarTabName='Financier'
        tableCellStyle="h-12"
        tableHeight={data?.data?.body?.length < 10 || searchResults?.data?.body?.length  ? 60 : undefined}
        isLoading={isLoading || isFetching || isSearchfetching || isSearchloading }
        hasNextPage={currentTabState.hasNextPage}
        pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
        setPageNumber={handlePageChange}
        totalPages={currentTabState.totalPages}
        sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
         condition={true}
         searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 &&  searchResults?.data?.body?.length < 1 }
         optionalFilterName='declined'
       />
      </div>
   </TabsContent>
   </div>
   </Tabs>
   <div>
        <Modal
        isOpen={isrequestedFinancierOpen}
        closeModal={()=> {store.dispatch(setIsRequestedFinancierOpen(false))
                   store.dispatch(resetRequestedFinancierId())}}
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
          refetches={refetch}
          requestType='financier'
          status={status}
          user_role={userRole}
        />
         
        </Modal>
      </div>
      
    </div>
   
  )
}

export default ViewAllRequestedFinancier
