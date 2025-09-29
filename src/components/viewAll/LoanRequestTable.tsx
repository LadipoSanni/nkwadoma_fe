"use client"
import React,{useEffect,useState} from "react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery,useSearchLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useLoanParams } from "./useLoanParams";

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
    const router = useRouter();
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)


     const { 
             params, 
             searchParams, 
             setPageNumber, 
             setPageSearchNumber, 
             hasSearchTerm 
         } = useLoanParams();


    const { data, isLoading,isFetching} = useViewAllLoanRequestQuery(params,{refetchOnMountOrArgChange: true})

    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanRequestQuery( searchParams,{skip: !hasSearchTerm })

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if ( hasSearchTerm ) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

     useEffect(() => {
            if ( hasSearchTerm  && searchResult && searchResult?.data) {
                setNextPage(searchResult?.data?.hasNextPage)
                setTotalPage(searchResult?.data?.totalPages)
                setPageSearchNumber(searchResult?.data?.pageNumber)
            }else if (! hasSearchTerm  && data && data.data){
                setNextPage(data?.data?.hasNextPage)
                setTotalPage(data?.data?.totalPages)
                setPageNumber(data?.data?.pageNumber)
            }
        },[data,searchResult,setPageNumber,setPageSearchNumber,hasSearchTerm])

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
                            tableHeight={data?.data?.body?.length < 10 ? 60:hasSearchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Loan request'
                            totalPages={totalPage}
                            hasNextPage={hasNextPage}
                            pageNumber={hasSearchTerm ? searchParams.pageNumber : params.pageNumber}
                            setPageNumber={hasSearchTerm ? setPageSearchNumber : setPageNumber}
                            condition={true}
                            searchEmptyState={hasSearchTerm && searchResult?.data?.body?.length < 1}
                        />
                    </div>
        </div>
    );
}

export default Index;
