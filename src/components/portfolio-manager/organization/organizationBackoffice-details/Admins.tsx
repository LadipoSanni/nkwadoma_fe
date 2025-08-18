'use client'
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { useDebounce } from '@/hooks/useDebounce';
import {useViewOrganizationAdminQuery} from "@/service/admin/organization";
import Table from "@/reuseable/table/Table";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { Book } from "lucide-react";
import { formatMonthInDate} from '@/utils/Format'
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import { Button } from '@/components/ui/button';
import Modal from '@/reuseable/modals/TableModal';
import InviteAdmin from '@/components/super-admin/staff/Invite-staff';
import {Cross2Icon} from "@radix-ui/react-icons";

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
}


function Admins() {
     const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber,setPageNumber] = useState(0);
    const [totalPage,setTotalPage] = useState(0);
     const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)
    const [searchHasNextPage,setSearchHasNextPage]  = useState(false)
    const user_role = getUserDetailsFromStorage('user_role');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const adminRoleType = [  { value: "ORGANIZATION_ADMIN", label: "Admin" }, { value: "ORGANIZATION_ASSOCIATE", label: "Associate"} ];

    const dataElement = {
        name:debouncedSearchTerm,
        activationStatuses: ['INVITED',"APPROVED","PENDING_APPROVAL","DEACTIVATED"],
        identityRoles: ["ORGANIZATION_SUPER_ADMIN","ORGANIZATION_ADMIN"].includes(user_role || "")? ["ORGANIZATION_ADMIN","ORGANIZATION_ASSOCIATE"]  : ["ORGANIZATION_ASSOCIATE"],
        pageNumber:pageNumber,
        pageSize: 10
    }
    
    
      const {data: adminData,isLoading,isFetching} = useViewOrganizationAdminQuery(dataElement)
    
       useEffect(() => {
        if(debouncedSearchTerm && adminData && adminData?.data ){
            setSearchHasNextPage(adminData?.data?.hasNextPage)
            setTotalPage(adminData?.data?.totalPages)
            setPageSearchNumber(adminData?.data?.pageNumber)    
            
          } else if (!debouncedSearchTerm&& adminData && adminData?.data) {
              setPageNumber( adminData?.data?.pageNumber)
              setTotalPage(adminData?.data?.totalPages)
              setNextPage(adminData?.data?.hasNextPage)
            }
          },[debouncedSearchTerm,adminData]);
      
          const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        };

        const getTableData = () => {
            if (!adminData?.data?.body) return [];
            if (debouncedSearchTerm) return adminData?.data?.body || [];
            return adminData?.data?.body;
        }


      const handleInviteClick = () => {
        setIsModalOpen(true);
      };
    

        const adminsHeader = [
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
                            selector: (row: TableRowData) => row.role === "ORGANIZATION_ADMIN"? "Organization admin" : row.role === "ORGANIZATION_ASSOCIATE"? "Organization associate" : "Super admin"
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
    <div>
    <section
            id="adminActions"
            className={
              "md:flex md:justify-between grid  gap-5 items-center mt-10"
            }
          >
            <SearchInput
              id={"organizationSearch"}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              id="inviteAdminButton"
              className={
                "h-[2.8125rem] md:w-[10.375rem] w-full rounded-md bg-meedlBlue hover:bg-meedlBlue text-meedlWhite text-[0.875rem] font-semibold leading-[150%] "
              }
              onClick={handleInviteClick}
            >
              Invite admin
            </Button>
          </section>
    <div
            id="adminListView"
            className={"grid mt-7"}
          >
            <Table
            tableData={getTableData()}
              tableHeader={adminsHeader}
              staticHeader={"Full name"}
              staticColunm={"firstName"}
              tableHeight={42}
              handleRowClick={() => {}}
              icon={<Book/>}
              sideBarTabName="Admin"
              tableCellStyle="h-12"
              isLoading={isLoading || isFetching}
               hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPage}
               pageNumber={searchTerm !== ""? pageSearchNumber :pageNumber}
              setPageNumber={searchTerm !== ""? setPageSearchNumber : setPageNumber}
              totalPages={ totalPage}
              searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
            />
          </div>
          <div>
        {
          <Modal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           headerTitle='Invite colleague'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
            width='36%'
          >
           <InviteAdmin
            setIsOpen={setIsModalOpen}
            roleOptions={adminRoleType}
            isItemDisabled={(item) => user_role === "ORGANIZATION_ASSOCIATE" && item === 'ORGANIZATION_ADMIN' }
           />
          
          </Modal>
        }
      </div>
    </div>
    
  )
}

export default Admins

