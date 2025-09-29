"use client"
import React,{useEffect,useState} from "react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {store} from "@/redux/store";
import {
    useViewAllLoanDisbursalQuery
} from "@/service/admin/loan/Loan-disbursal-api";
import {setClickedDisbursedLoanIdNumber} from "@/redux/slice/loan/selected-loan";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useSearchLoanDisbursalQuery } from '@/service/admin/loan/loan-request-api';
import { useLoanParams } from "./useLoanParams";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
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
   
    const {data, isLoading, isFetching } = useViewAllLoanDisbursalQuery( params,{refetchOnMountOrArgChange: true})


    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanDisbursalQuery( searchParams,{skip: !hasSearchTerm})

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (hasSearchTerm) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

     useEffect(() => {
            if (hasSearchTerm && searchResult && searchResult?.data) {
                setNextPage(searchResult?.data?.hasNextPage)
                setTotalPage(searchResult?.data?.totalPages)
                setPageSearchNumber(searchResult?.data?.pageNumber)
            }else if (!hasSearchTerm && data && data.data){
                setNextPage(data?.data?.hasNextPage)
                setTotalPage(data?.data?.totalPages)
                setPageNumber(data?.data?.pageNumber)
            }
        },[data,searchResult,hasSearchTerm,setPageSearchNumber,setPageNumber])
    


    const loanDisbursalHeader = [
        {
            title: 'Loanee',
            sortable: true,
            id: 'firstName',
            selector: (row: TableRowData) => capitalizeFirstLetters(row.firstName?.toString()) + " " +  capitalizeFirstLetters(row.lastName?.toString()) },
        {title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.programName},
        {title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohortName},
        {
            title: 'Offer date',
            sortable: true,
            id: 'startDate',
            selector: (row: TableRowData) =>dayjs(row.offerDate?.toString()).format('MMMM D, YYYY')
        },
        {
            title: 'Loan start date',
            sortable: true,
            id: 'requestDate',
            selector: (row: TableRowData) =>dayjs(row.startDate?.toString()).format('MMMM D, YYYY')
        },
        {
            title: 'Deposit',
            sortable: true,
            id: 'initialDeposit',
            selector: (row: TableRowData) => formatAmount(row.initialDeposit)
        },
        {
            title: 'Amount requested',
            sortable: true,
            id: 'amountRequested',
            selector: (row: TableRowData) =>formatAmount(row.loanAmountRequested)
        }
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        if (typeof ID === "object"){
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            store.dispatch(setClickedDisbursedLoanIdNumber(ID?.id))
        }
        router.push(`/disbursed-loan-details`);
    };

    return (
        <div data-testid={'LoanDisbursalMainDivContainer'} id={`LoanDisbursalMainDivContainer`}
        >
                    <div className={``}>
                        <Table
                            tableData={getTableData()}
                            isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanDisbursalHeader}
                            tableHeight={data?.data?.body?.length < 10 ? 60:hasSearchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Disbursed loans'
                            condition={true}
                            totalPages={totalPage}
                            hasNextPage={hasNextPage}
                            pageNumber={hasSearchTerm ? searchParams.pageNumber : params.pageNumber}
                            setPageNumber={hasSearchTerm ? setPageSearchNumber : setPageNumber}
                            tableCellStyle="h-12"
                            searchEmptyState={hasSearchTerm && searchResult?.data?.body?.length < 1}
                        />
                    </div>
               
        </div>
    );
}

export default Index;