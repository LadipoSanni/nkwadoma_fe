'use client'
import React,{useState,useEffect} from 'react';
import Table from '@/reuseable/table/Table';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {Icon} from "@iconify/react";
import { useViewAllLoanReferralQuery,useSearchLoanReferralQuery } from '@/service/admin/loan/loan-request-api';
import { useLoanParams } from "./useLoanParams";

interface viewAllType {
    [key: string]: string | number | null | React.ReactNode;
}

const LoanReferral = () => {
     const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)

     const { 
            params, 
            searchParams, 
            setPageNumber, 
            setPageSearchNumber, 
            hasSearchTerm 
        } = useLoanParams();

    const {data, isLoading, isFetching} =  useViewAllLoanReferralQuery(params,{refetchOnMountOrArgChange: true})
    
    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanReferralQuery (searchParams,{skip: !hasSearchTerm })

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (hasSearchTerm) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

    useEffect(() => {
        if (hasSearchTerm  && searchResult && searchResult?.data) {
            setNextPage(searchResult?.data?.hasNextPage)
            setTotalPage(searchResult?.data?.totalPages)
            setPageSearchNumber(searchResult?.data?.pageNumber)
        }else if (!hasSearchTerm  && data && data.data){
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
    },[data,searchResult,hasSearchTerm,setPageNumber,setPageSearchNumber ])

    const tableHeader =  [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllType) => capitalizeFirstLetters(row?.firstName?.toString()) +  " "  +  capitalizeFirstLetters(row?.lastName?.toString()) },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllType) => formatAmount(row.initialDeposit)},
        { title: 'Amount referred', sortable: true, id: 'amountReferred', selector: (row: viewAllType) => formatAmount(row.amountReferred)},
        { title: 'Date referred', sortable: true, id: 'dateReferred', selector: (row: viewAllType) => dayjs(row.dateReferred?.toString()).format('MMM D, YYYY')},

    ]

     
    return (
        <div
            id={'viewAllLoanReferrals'}
            data-testid={'viewAllLoanReferrals'}
            className={` w-full h-full  `}
        >

            <Table
                tableData={getTableData()}
                tableHeader={ tableHeader}
                handleRowClick={()=> {} }
                staticHeader='Loanee'
                staticColunm='firstName'
                icon={<Icon icon="material-symbols:money-bag-outline" height={"2rem"} width={"2rem"} color={ '#142854' }></Icon>}
                sideBarTabName='Loan referral'
                tableCellStyle="h-12"
                tableHeight={data?.data?.body?.length < 10 ? 60:hasSearchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                hasNextPage={hasNextPage}
                pageNumber={hasSearchTerm ? searchParams.pageNumber : params.pageNumber}
                setPageNumber={hasSearchTerm ? setPageSearchNumber : setPageNumber}
                totalPages={totalPage}
                condition={true}
                searchEmptyState={hasSearchTerm && searchResult?.data?.body?.length < 1}
            />
        </div>
    );
};

export default LoanReferral;