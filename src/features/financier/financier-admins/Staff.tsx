"use client"
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import Table from '@/reuseable/table/Table';
import { formatMonthInDate} from '@/utils/Format'
import { MdOutlineAccountBalance } from 'react-icons/md';
import InviteStaff from '@/components/super-admin/staff/Invite-staff';
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from "@radix-ui/react-icons";
import Detail from '@/components/super-admin/staff/Detail';
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import styles from "./index.module.css"
import { useViewFinancierAdminsQuery,useSearchFinancierAdminsQuery } from '@/service/admin/financier';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}



function FinancierStaff() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen,setOpen] = useState(false)
    const [modal,setModal] = useState("invite")
    const [id,setId] = useState("")
    const [role,setRole] = useState("")
    const [stat,setStatus] = useState("")
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [date, setInvitedDate] = useState('')
    const [isSwitch, setSwitch] = useState(false);
    const adminRoleType = [ { value: "COOPERATE_FINANCIER_ADMIN", label: "Admin" } ] ;
      const [hasNextPages,setNextPage] = useState(false)
      const [totalPage,setTotalPage] = useState(0)
      const [pageNumber,setPageNumber] = useState(0)
    const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [searchHasNextPage,setSearchHasNextPage] = useState(false)
      const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const dataElement = {
      pageNumber:pageNumber,
      pageSize: 10
  }

  const searchElement = {
      name: debouncedSearchTerm,
      pageNumber:pageSearchNumber,
      pageSize: 10
  }


   const {data: adminData,isLoading,isFetching} =useViewFinancierAdminsQuery(dataElement,{refetchOnMountOrArgChange: true})
   const {data: searchResult,isLoading:isSearchLoading,isFetching:isfetching} =useSearchFinancierAdminsQuery(searchElement,{refetchOnMountOrArgChange: true,skip: !debouncedSearchTerm})

   useEffect(()=> {
    if(searchTerm && searchResult && searchResult?.data ){
      setSearchHasNextPage(adminData?.data?.hasNextPage)
      setTotalPage(adminData?.data?.totalPages)
      setPageSearchNumber(adminData?.data?.pageNumber)    
    }else  if(!searchTerm && adminData && adminData?.data  ){
      setNextPage(adminData?.data?.hasNextPage)
      setTotalPage(adminData?.data?.totalPages)
      setPageNumber(adminData?.data?.pageNumber)
  }
   },[adminData,searchTerm,searchResult])

   const getTableData = () => {
    if (!adminData?.data?.body) return [];
    if (debouncedSearchTerm) return searchResult?.data?.body || [];
    return adminData?.data?.body;
}
    
   const handleOpen =() => {
    setModal('invite')
    setOpen(true)
   }


   const handleRowClick = (row: TableRowData) => {
    const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
    const status = capitalizeFirstLetters(row?.activationStatus?.toString()) || "";
     const role =  row.role === "COOPERATE_FINANCIER_ADMIN"? "Admin" : ""
    setModal('detail')
    setOpen(true)
    setStatus(status)
    setName(fullName)
    setEmail(row?.email as string)
    setRole(role as string)
    setInvitedDate(row?.createdAt as string)
    setId(row?.cooperateFinancierId as string)
}

    const tableHeader = [
        { 
          title: "Name",  
          sortable: true, 
          id: "firstName", 
          selector: (row: TableRowData) => capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
        },
        { 
          title: <div className='md:mr-14'>Email</div>,  
          sortable: true, 
          id: "email", 
          selector: (row: TableRowData) => <div className='truncate'>{row.email}</div> 
        },
        { 
          title: "Status",  
          sortable: true, 
          id: "activationStatus", 
          selector: (row: TableRowData) => <span className={`${row.activationStatus === "ACTIVE"? "bg-[#E6F2EA] text-[#045620] " :row.activationStatus === "INVITED"? "bg-[#FEF6E8] text-[#045620] w-20" :  "bg-[#FBE9E9] text-[#971B17]"} rounded-lg  px-2 `}>{capitalizeFirstLetters(row.activationStatus?.toString())}</span> 
        },
        { 
          title: "Invited",  
          sortable: true, 
          id: "createdAt", 
          selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
        }
      ]


  return (
    <div className={`mt-8 px-6  max-h-[80vh] ${styles.container}`}>
      <div className='md:flex justify-between items-center md:pr-3'>
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
      <div className='mt-6 md:pr-3' data-testid="table">
       <Table 
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader='Name'
        staticColunm='firstName'
        icon={MdOutlineAccountBalance}
        sideBarTabName='staff'
        tableCellStyle="h-12"
        tableHeight={62}
        isLoading={isLoading || isFetching || isSearchLoading || isfetching}
        hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
        pageNumber={searchTerm !== ""? pageSearchNumber :pageNumber}
        setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
        totalPages={ totalPage}
         sx='cursor-pointer'
         condition={true}
        searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
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

export default FinancierStaff


