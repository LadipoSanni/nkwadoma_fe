'use client'
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {setLoaneeId} from "@/redux/slice/organization/organization";
import { store,useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import {formatAmount} from '@/utils/Format';
import {useSearchForLoaneeInACohortQuery, useViewAllLoaneeQuery} from "@/service/admin/cohort_query";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import CheckBoxTable from '@/reuseable/table/Checkbox-table';
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface userIdentity {
  firstName: string;
  lastName: string;
}

interface loaneeLoanDetails {
  initialDeposit: number;
  amountRequested: number;
  amountReceived: number;
}

interface viewAllLoanee {
  userIdentity: userIdentity;
  loaneeLoanDetail: loaneeLoanDetails;
  activationStatus: string;
}
type viewAllLoanees = viewAllLoanee & TableRowData;

interface Props {
  status?: string;
  uploadedStatus?: string
}


function LoaneesInCohort({status,uploadedStatus}:Props) {
   const [searchTerm, setSearchTerm] = useState("");
   const cohortDetails = useAppSelector((state) => state.cohort.selectedCohortInOrganization)
   const cohortId = cohortDetails?.id;
   const [page,setPageNumber] = useState(0);
   const [totalPage,setTotalPage] = useState(0)
   const [hasNextPage,setNextPage] = useState(false)
   const size = 10
   const router = useRouter();

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

     const {data, isLoading,isFetching} = useViewAllLoaneeQuery({
                cohortId:  cohortId,
                pageSize: size,
                pageNumber: page,
                status: status,
                uploadedStatus: uploadedStatus
     })

      const {data: searchResults, isLoading: isLoadingSearch, isFetching: isfetching} = useSearchForLoaneeInACohortQuery({
                      loaneeName: debouncedSearchTerm,
                      cohortId: cohortId,
                      status: status,
                      pageSize: size,
                      pageNumber: page,
                  },
                  {skip: !debouncedSearchTerm  || !cohortId})


        useEffect(() => {
                 if(debouncedSearchTerm && searchResults && searchResults?.data){
                  setNextPage(searchResults?.data?.hasNextPage)
                  setTotalPage(searchResults?.data?.totalPages)
                  setPageNumber(searchResults?.data?.pageNumber)
                 }
                else if(!debouncedSearchTerm && data && data?.data) {
                  setNextPage(data?.data?.hasNextPage)
                  setTotalPage(data?.data?.totalPages)
                  setPageNumber(data?.data?.pageNumber)
                }
              },[debouncedSearchTerm,data,searchResults]) 


           const tableHeader = [
                      {title: "Loanee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => row?.userIdentity?.firstName + " " + row?.userIdentity?.lastName},
                      {title: "Initial deposit", sortable: true, id: "initialDeposit", selector: (row: viewAllLoanees) =>  formatAmount((row?.loaneeLoanDetail?.initialDeposit))},
                      {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountRequested))},
                      {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountReceived))},
                  ];

            const handleRowClick = (row: TableRowData) => {
                        store.dispatch(setLoaneeId(String(row?.id)))
                           router.push('/organizations/view-loanee-profile')
           }

           const getTableData = () => {
            if (!data?.data?.body) return [];
           else if (debouncedSearchTerm) return searchResults?.data?.body || [];
           else return data?.data?.body;
        }
                  

  return (
    <main>
       <div>
       <SearchInput
                    testId='search-input'
                    id="SearchLoanee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
         /> 
       </div>
       <div className='mt-4'>
       { !isTyping && debouncedSearchTerm  && searchResults?.data?.body?.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanees'/></div> :
        
        <CheckBoxTable
        tableData={getTableData()}
        tableHeader={tableHeader}
        handleRowClick={handleRowClick}
        staticHeader="Loanee"
        staticColunm="firstName"
        icon={MdOutlinePerson}
        sideBarTabName="loanees"
        tableCellStyle="h-12"
        isLoading={isLoading || isLoadingSearch || isFetching || isfetching}
        condition={true}
        tableHeight={40}
        hasNextPage={hasNextPage}
        pageNumber={page}
        setPageNumber={setPageNumber}
        totalPages={totalPage}
         sx='cursor-pointer'
        />}
      </div>
    </main>
  )
}

export default LoaneesInCohort
