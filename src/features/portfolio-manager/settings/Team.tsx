'use client' 
import React,{useState,useEffect} from 'react'
import ButtonAndSearch from '@/reuseable/action-bars/Button-and-search'
import Table from "@/reuseable/table/Table";
// import { teamData } from '@/utils/cohort/trainee-details-mock-data/Index';
import { Book } from "lucide-react";
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
// import {  useGetDetailsOfOrganizationQuery } from '@/service/admin/organization';
import InviteAdmin from '@/components/portfolio-manager/organization/Invite-admin';
import { useViewOrganizationAdminQuery } from '@/service/admin/organization';
// import SkeletonForDetailPage from '@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage';
import { useSearchOrganisationAdminByNameQuery } from "@/service/admin/organization";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
   }

interface adminProps extends TableRowData  {
    fullName: string,
     email: string,
     status: string
   }

function Team() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
     const [hasNextPage,setNextPage] = useState(false)
      const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
  const [adminList, setAdminList] = useState<adminProps[]>([])

    const dataElement = {
      pageNumber:pageNumber,
      pageSize: 10
  }
    const {data: adminData,isLoading} = useViewOrganizationAdminQuery(dataElement)
   
    const {data: searchResults} =  useSearchOrganisationAdminByNameQuery(searchTerm,{skip: !searchTerm})

    useEffect(()=> {
      if(searchTerm && searchResults && searchResults?.data){
          const adminEmployees = searchResults.data
          setAdminList(adminEmployees)
      }
     else if(!searchTerm && adminData && adminData?.data  ){
         const adminEmployees = adminData?.data?.body
          setAdminList(adminEmployees)
          setNextPage(adminData?.data?.hasNextPage)
          setTotalPage(adminData?.data?.totalPages)
          setPageNumber(adminData?.data?.pageNumber)
      }
    },[adminData,searchTerm,searchResults])

    const handleModalOpen =() => {
        setIsModalOpen(true);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  };

    // const teamHeader = [
    //     { title:  <div className='md:relative right-4 left-4'>Full name</div>, sortable: true, id: 'fullName', selector: (row:TableRowData ) => <div className='md:relative right-1 left-1 -z-40'>{row.fullName}</div> },
    //     { title: <div className='md:relative right-16 left-16'></div>,sortable: true, id: 'role', selector: (row: TableRowData) => <div className={`${row.role === "Admin"? "text-[#212221] bg-[#ECECEC] ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-20 h-6 flex items-center justify-center relative right-10 left-10 -z-40`}>{row.role}</div> },
    //     { title: <div className='md:relative right-24 left-24'>Status</div>, sortable: true, id: 'status', selector: (row:TableRowData) =>  <div className={`${row.status === "Active"? "text-success900 bg-[#E7F5EC]":   row.status === "Invited" ? "text-[#142854] bg-blue-100" :  "bg-error50 text-error900 pr-14 pl-14"} rounded-xl w-20 h-6 flex items-center justify-center relative md:right-20 md:left-20 right-10 left-10 -z-40`}>{row.status}</div> },
    //     { title: <div className='md:relative right-40 left-40'>Role</div>, sortable: true, id: 'lastChangedDate', selector: (row:TableRowData ) => <div className='md:relative right-40 left-40 -z-40'>{row.role}</div> },
    
    //   ]
    const adminsHeader = [
      {
        title: <div className='md:relative right-4 left-4'>Full name</div>,
        sortable: true,
        id: "fullName",
        selector: (row: TableRowData) =>  <div className='md:relative right-1 left-1 -z-40'>{row.fullName}</div> ,
      },
      { title: <div className='md:relative md:right-2 md:left-2'>Role</div>,sortable: true, id: 'role', selector: (row: TableRowData) => <div className={`${row.role === "PORTFOLIO_MANAGER"? "text-[#212221] bg-[#ECECEC] ": "text-[#142854] bg-[#EEF5FF]"} rounded-xl w-36 h-6 flex items-center justify-center md:relative md:-right-2 md:-left-2  -z-40`}>{capitalizeFirstLetters(String(row.role).replace(/_/g, ' '))}</div> },
     
      {
        title: (
          <div id="adminStatusHeader" className="">
            Status
          </div>
        ),
        sortable: true,
        id: "adminStatus",
        selector: (row: TableRowData) => (
          <span
            id="adminStatus"
            className={`pt-1 pb-1 pr-3 pl-3 rounded-xl relative right-2 -z-50 ${
              row.status === "ACTIVE"
                ? "text-[#063F1A] bg-[#E7F5EC]"
                : row.status === "INVITED"
                ? "text-[#142854] bg-[#F3F8FF]"
                : "text-[#59100D] bg-[#FBE9E9]"
            }`}
          >
            {capitalizeFirstLetters(String(row.status))}
          </span>
        ),
      },
       {
        title:  <div className=''>Email</div>,
        sortable: true,
        id: "email",
        selector: (row: TableRowData) => ( <div className="">{row.email ? row.email : "null"}</div>),
      },
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
         {
         searchTerm && adminList.length === 0? <div><SearchEmptyState icon={MdSearch} name='Colleague'/></div> : 
          <Table
          tableData={adminList.slice().reverse()}
          tableHeader={adminsHeader}
          handleRowClick={()=>{}}
          tableHeight={48}
          icon={<Book/>}
          condition={true}
          sideBarTabName='colleague'
          staticHeader={"Full name"}
          staticColunm={"fullName"}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPage}
         />
}
        </div>
        <div>
        {
          <TableModal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           headerTitle='Invite Colleague'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
            width='36%'
          >
           <InviteAdmin 
           setIsOpen={setIsModalOpen}
           adminType="PORTFOLIO_MANAGER"
           />
          
          </TableModal>
        }
      </div>
    
    </div>
  )
}

export default Team