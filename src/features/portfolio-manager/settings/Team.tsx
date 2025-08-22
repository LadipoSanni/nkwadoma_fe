'use client' 
import React,{useState,useEffect} from 'react'
import ButtonAndSearch from '@/reuseable/action-bars/Button-and-search'
import Table from "@/reuseable/table/Table";
import { Book } from "lucide-react";
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { useViewOrganizationAdminQuery } from '@/service/admin/organization';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useDebounce } from '@/hooks/useDebounce';
import InviteAdmin from '@/components/super-admin/staff/Invite-staff';
import { formatMonthInDate} from '@/utils/Format'
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import Detail from '@/components/super-admin/staff/Detail';
import { setIsStaffOpen } from '@/redux/slice/staff-and-request/request';
import { store,useAppSelector } from '@/redux/store';


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
   }



function Team() {
    const [searchTerm, setSearchTerm] = useState('');
     const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [searchHasNextPage,setSearchHasNextPage]  = useState(false)
    const [role,setRole] = useState("")
    const [stat,setStatus] = useState("")
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [date, setInvitedDate] = useState('')
     const [isSwitch, setSwitch] = useState(false);
    const user_role = getUserDetailsFromStorage('user_role');
    const adminRoleType = [  { value: "PORTFOLIO_MANAGER", label: "Portfolio manager" }, { value: "PORTFOLIO_MANAGER_ASSOCIATE", label: "Associate"},{ value: "MEEDL_ADMIN", label: "Admin"} ];
     const [modal,setModal] = useState("invite")
     const [isOpen,setOpen] = useState(false)
      const isStaffOpen = useAppSelector(state => state?.request?.isStaffModalOpen)

   const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

   const dataElement = {
    name:debouncedSearchTerm,
    activationStatuses: ['DECLINED',"APPROVED","PENDING_APPROVAL","ACTIVE","INVITED"],
    identityRoles:user_role === "ORGANIZATION_SUPER_ADMIN"? ["ORGANIZATION_ADMIN","ORGANIZATION_ASSOCIATE"] : ["COOPERATE_FINANCIER_SUPER_ADMIN","COOPERATE_FINANCIER_ADMIN"].includes( user_role || "")? ["COOPERATE_FINANCIER_ADMIN"] : ["PORTFOLIO_MANAGER","MEEDL_ADMIN","PORTFOLIO_MANAGER_ASSOCIATE"],
    pageNumber:pageNumber,
    pageSize: 10
}

    const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement,{refetchOnMountOrArgChange: true})
   
    

    useEffect(()=> {
      if(debouncedSearchTerm && adminData && adminData?.data ){
        setSearchHasNextPage(adminData?.data?.hasNextPage)
        setTotalPage(adminData?.data?.totalPages)
        setPageSearchNumber(adminData?.data?.pageNumber)    
        
      }
     else 
     if(!debouncedSearchTerm && adminData && adminData?.data  ){
          setNextPage(adminData?.data?.hasNextPage)
          setTotalPage(adminData?.data?.totalPages)
          setPageNumber(adminData?.data?.pageNumber)
      }
    },[adminData,debouncedSearchTerm])

    const getTableData = () => {
      if (!adminData?.data?.body) return [];
      if (debouncedSearchTerm) return adminData?.data?.body || [];
      return adminData?.data?.body;
  }

    const handleModalOpen =() => {
      store.dispatch(setIsStaffOpen(true))
      setModal("invite")
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  };

     const handleRowClick = (row: TableRowData) => {
        const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString())
        const status = capitalizeFirstLetters(row?.activationStatus?.toString()) || "";
         const role =  row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" :row.role === "PORTFOLIO_MANAGER_ASSOCIATE"? "Associate" : row.role === "ORGANIZATION_ADMIN"? "Admin" :row.role === "ORGANIZATION_ASSOCIATE"? "Associate" : "Admin"
         store.dispatch(setIsStaffOpen(true))
        setModal('detail')
        setOpen(true)
        setStatus(status)
        setName(fullName)
        setEmail(row?.email as string)
        setRole(role as string)
        setInvitedDate(row?.createdAt as string)
    }

    const adminsHeader = [
      // {
      //   title: <div className='md:relative right-4 left-4'>Full name</div>,
      //   sortable: true,
      //   id: "fullName",
      //   selector: (row: TableRowData) =>  <div className='md:relative right-1 left-1 -z-40'>{row.fullName}</div> ,
      // },

      // {
      //   title: (
      //     <div id="adminStatusHeader" className="">
      //       Status
      //     </div>
      //   ),
      //   sortable: true,
      //   id: "adminStatus",
      //   selector: (row: TableRowData) => (
      //     <span
      //       id="adminStatus"
      //       className={`pt-1 pb-1 pr-3 pl-3  rounded-xl  relative  -z-50 ${
      //         row.status === "ACTIVE"
      //           ? "text-[#063F1A] bg-[#E7F5EC]"
      //           : row.status === "INVITED"
      //           ? "text-[#142854] bg-[#F3F8FF]"
      //           : "text-[#59100D] bg-[#FBE9E9]"
      //       }`}
      //     >
      //       {capitalizeFirstLetters(String(row.status))}
      //     </span>
      //   ),
      // },
      // { title: <div className='md:relative md:right-2 md:left-2'>Role</div>,sortable: true, id: 'role', selector: (row: TableRowData) => <div className={`${row.role === "PORTFOLIO_MANAGER"? "text-[#212221] bg-[#ECECEC] ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-36 h-6 flex items-center justify-center md:relative md:-right-2   -z-40`}>{capitalizeFirstLetters(String(row.role).replace(/_/g, ' '))}</div> },
     
      //  {
      //   title:  <div className=''>Email</div>,
      //   sortable: true,
      //   id: "email",
      //   selector: (row: TableRowData) => ( <div className="truncate">{row.email ? row.email : "null"}</div>),
      // },
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
                title: "Role",  
                sortable: true, 
                id: "role", 
                selector: (row: TableRowData) => row.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : row.role === "MEEDL_ADMIN"? "Admin" : "Associate"
              },
              { 
                title: "Status",  
                sortable: true, 
                id: "activationStatus", 
                selector: (row: TableRowData) => <span className={`${row.activationStatus === "DECLINED"? " bg-[#FBE9E9] text-[#971B17] " :row.activationStatus === "INVITED"? "bg-[#FEF6E8] text-[#68442E] w-20" : row.activationStatus === "PENDING_APPROVAL"? "bg-[#E6F7EE] text-[#039855]" : "bg-[#E6F2EA] text-[#045620]"} rounded-lg  px-2 `}>{row.activationStatus === "PENDING_APPROVAL"? "Pending" : row.activationStatus === "ACTIVE"? "Active" : row.activationStatus === "DECLINED"? "Declined" : "Invited"}</span> 
              },
              { 
                title: "Invited",  
                sortable: true, 
                id: "createdAt", 
                selector: (row: TableRowData) => formatMonthInDate(row.createdAt) 
              }
    ];

  return (
    
    <div className='mt-8'>
        <ButtonAndSearch
          id={'teamSearch'}
          value={searchTerm}
          onChange={handleSearchChange}
          handleButtonClick={handleModalOpen}
          buttonName={'Invite colleague'}
        />
         
        <div className='w-full mt-5'>
         {/* {
         !isTyping && debouncedSearchTerm && searchResults?.data?.body.length === 0? <div><SearchEmptyState icon={MdSearch} name='Colleague'/></div> :  */}
          <Table
          tableData={getTableData()}
          tableHeader={adminsHeader}
          handleRowClick={handleRowClick}
          tableHeight={53}
          icon={<Book/>}
          condition={true}
          sideBarTabName='colleague'
          staticHeader={"Full name"}
          staticColunm={"firstName"}
          isLoading={isLoading || isFetching}
          hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPage}
          pageNumber={searchTerm !== ""? pageSearchNumber :pageNumber}
          setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
          totalPages={ totalPage}
          searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
          tableCellStyle="h-12"
           sx='cursor-pointer'
         />
{/* } */}
        </div>
        <div>
        {
          <TableModal
           isOpen={isStaffOpen}
           closeModal={()=> {
            store.dispatch(setIsStaffOpen(false))
            setSwitch(false)
          }}
           className='pb-1'
           headerTitle={modal === "invite"? "" : 'Invite colleague'}
           closeOnOverlayClick={true}
           icon={Cross2Icon}
            width='36%'
            styeleType={modal === "invite" || isSwitch? "styleBody" :  "styleBodyTwo"}
          >
          
                  { modal === "invite" ?
        <InviteAdmin
        setIsOpen={()=> {}}
        roleOptions={adminRoleType}
        isItemDisabled={(item) => user_role === "PORTFOLIO_MANAGER"? item === 'MEEDL_ADMIN' &&  user_role === "PORTFOLIO_MANAGER" : item !== 'PORTFOLIO_MANAGER_ASSOCIATE' &&  user_role === "PORTFOLIO_MANAGER_ASSOCIATE" }
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
          id={""}
          setIsOpen={()=> {}}
          />
          </div>
        }
          
          </TableModal>
        }
      </div>
    
    </div>
  )
}

export default Team