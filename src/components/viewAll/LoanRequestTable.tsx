"use client"
import React,{useEffect,useState} from "react";
// import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery,useSearchLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useAppSelector} from "@/redux/store";
import { useDebounce } from '@/hooks/useDebounce';

interface userIdentity {
    firstName?: string;
    lastName?: string;
};

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode  ;
}

interface viewAllLoanee {
    userIdentity: userIdentity
    programName: string
    cohortName: string
    cohortStartDate: string
    requestDate:string
    initialDeposit:number
    loanAmountRequested: number
}

type viewAllLoanees = viewAllLoanee & TableRowData;

const Index = () => {
     const [pageNumber, setPageNumber] = React.useState(0);
      
    const router = useRouter();
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan)
    const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
     const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const request ={
        pageSize: 10,
        pageNumber:pageNumber,
        organizationId: clickedOrganization?.id || '',
    }

    const searchParam = {
        name:debouncedSearchTerm,
        pageSize:10,
        pageNumber:pageSearchNumber,
      
    }

    const searchParamWithOrg = {
        name:debouncedSearchTerm,
        pageSize:10,
        pageNumber:pageSearchNumber,
        organizationId: clickedOrganization?.id,
    }


    const { data, isLoading,isFetching} = useViewAllLoanRequestQuery(request,{refetchOnMountOrArgChange: true})

    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanRequestQuery(clickedOrganization?.id? searchParamWithOrg : searchParam,{skip: !debouncedSearchTerm})

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

     useEffect(() => {
            if (debouncedSearchTerm && searchResult && searchResult?.data) {
                setNextPage(searchResult?.data?.hasNextPage)
                setTotalPage(searchResult?.data?.totalPages)
                setPageSearchNumber(searchResult?.data?.pageNumber)
            }else if (!debouncedSearchTerm && data && data.data){
                setNextPage(data?.data?.hasNextPage)
                setTotalPage(data?.data?.totalPages)
                setPageSearchNumber(data?.data?.pageNumber)
            }
        },[data,searchResult,debouncedSearchTerm])

    const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllLoanees) =>capitalizeFirstLetters(row.userIdentity?.firstName?.toString()) + " " + capitalizeFirstLetters(row.userIdentity?.lastName?.toString()) },
        { title: 'Program', sortable: true, id: 'program', selector: (row:  viewAllLoanees) =>row.programName },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:  viewAllLoanees) => row.cohortName },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row:  viewAllLoanees) => dayjs(row.cohortStartDate?.toString()).format('MMM D, YYYY')},
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: viewAllLoanees) => dayjs(row.requestDate?.toString()).format('MMM D, YYYY') },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllLoanees) => formatAmount(row.initialDeposit)},
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row: viewAllLoanees) =>formatAmount(row.loanAmountRequested)}
    ];



    const handleRowClick = (ID: string | object | React.ReactNode) => {

        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.push(`/loan-request-details?id=${ID?.id}`);
    };


    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
            //  className={`grid md:px-3 md:overflow-hidden   place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
           
                    <div className={` pr-2 md:pr-0`}>
                        <Table
                            tableData={getTableData()}
                            isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanRequestHeader}
                            tableHeight={54}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Loan request'
                            totalPages={totalPage}
                            hasNextPage={hasNextPage}
                            pageNumber={searchTerm !== ""? pageSearchNumber : pageNumber}
                            setPageNumber={searchTerm !== ""? setPageSearchNumber :  setPageNumber}
                            condition={true}
                            searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchResult?.data?.body?.length < 1 }
                        />
                    </div>
        </div>
    );
}

export default Index;
