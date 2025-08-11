'use client'
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { useDebounce } from '@/hooks/useDebounce';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import { MdSearch } from 'react-icons/md';
import {useViewAllAdminsInOrganizationQuery} from "@/service/admin/organization";
import {  useAppSelector } from "@/redux/store";  
import { useSearchOrganizationAsPortfolioManagerQuery } from "@/service/admin/organization";
import Table from "@/reuseable/table/Table";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { Book } from "lucide-react";

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
}

interface adminProps extends TableRowData {
    fullName: string,
    email: string,
    status: string
  }


function Admins() {
     const [searchTerm, setSearchTerm] = useState('');
    const [adminList, setAdminList] = useState<adminProps[]>([])
    const organizationId = useAppSelector(store => store.organization?.setOrganizationId)
    const [page,setPageNumber] = useState(0);
    const [totalPage,setTotalPage] = useState(0);
    const [nextPage,hasNextPage] = useState(false)

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const { data: adminData,isLoading: isloadingAdmin,isFetching } = useViewAllAdminsInOrganizationQuery(
            {
              organizationId: organizationId,
              pageNumber: page,
              pageSize: 300,
            }
          );
    
    const param = {
        organizationId: organizationId,
        name:debouncedSearchTerm,
        pageNumber: page,
        pageSize: 300,
      }
    
      const {data: searchResult,isLoading: isloadingSearch, isFetching:isSearchFetching} =  useSearchOrganizationAsPortfolioManagerQuery(param,{skip: !debouncedSearchTerm})

       useEffect(() => {
            if (debouncedSearchTerm && searchResult && searchResult.data) {
              const admins = searchResult?.data?.body
              setAdminList(admins);
              setPageNumber(searchResult?.data?.pageNumber)
              setTotalPage(searchResult?.data?.totalPages)
              hasNextPage(searchResult?.data?.hasNextPage)
            } else if (!debouncedSearchTerm&& adminData && adminData?.data) {
              const admins = adminData?.data?.body;
              setAdminList(admins);
              setPageNumber( adminData?.data?.pageNumber)
              setTotalPage(adminData?.data?.totalPages)
              hasNextPage(adminData?.data?.hasNextPage)
            }
          },[debouncedSearchTerm, searchResult,adminData]);
      
          const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        };

        const adminsHeader = [
            {
              title: "Full name",
              sortable: true,
              id: "fullName",
              selector: (row: TableRowData) => row.fullName,
            },
            {
              title: <div className="relative md:left-16 md:right-16">Email</div>,
              sortable: true,
              id: "email",
              selector: (row: TableRowData) => ( <div className="relative md:left-12 md:right-12">{row.email ? row.email : "nill"}</div>),
            },
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
                  className={`pt-1 pb-1 pr-3 pl-3 rounded-xl relative right-2 ${
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
          ];
      

  return (
    <div>
     <div
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
    </div>
    <div
            id="adminListView"
            className={"grid mt-7"}
          >
            {
               !isTyping && debouncedSearchTerm  && adminList.length === 0?  <div>
                 <SearchEmptyState icon={MdSearch} name={"Search"} />
               </div> :
            <Table
              tableData={adminList}
              tableHeader={adminsHeader}
              staticHeader={"Full name"}
              staticColunm={"fullName"}
              tableHeight={42}
              handleRowClick={() => {}}
              icon={<Book/>}
              sideBarTabName="Admin"
              // optionalRowsPerPage={10}
              tableCellStyle="h-12"
              searchEmptyState={true}
              hasNextPage={nextPage}
              pageNumber={page}
              setPageNumber={setPageNumber}
              totalPages={totalPage}
              isLoading={isloadingAdmin || isloadingSearch || isFetching || isSearchFetching}
            />
            }
          </div>
    </div>
    
  )
}

export default Admins
