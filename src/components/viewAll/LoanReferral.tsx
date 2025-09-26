'use client'
import React,{useState,useEffect} from 'react';
import Table from '@/reuseable/table/Table';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
// import {loanReferralTable} from "@/utils/LoanRequestMockData/Index";
import {Icon} from "@iconify/react";
import { useViewAllLoanReferralQuery,useSearchLoanReferralQuery } from '@/service/admin/loan/loan-request-api';
import {useAppSelector} from "@/redux/store";
import { useDebounce } from '@/hooks/useDebounce';

interface viewAllType {
    [key: string]: string | number | null | React.ReactNode;
}

const LoanReferral = () => {

    const [pageNumber, setPageNumber] = React.useState(0);
     const [pageSearchNumber,setPageSearchNumber] = useState(0)
     const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageSize] = React.useState(10);
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan)

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);


    const viewAllProps = {
        pageSize:pageSize,
        pageNumber:pageNumber,
    }
    
    const viewAllPropswWithId = {
        pageSize:pageSize,
        pageNumber:pageNumber,
        organizationId: clickedOrganization?.id,
    }

    const searchParam = {
        name:debouncedSearchTerm,
        pageSize:pageSize,
        pageNumber:pageSearchNumber,
      
    }

    const searchParamWithOrg = {
        name:debouncedSearchTerm,
        pageSize:pageSize,
        pageNumber:pageSearchNumber,
        organizationId: clickedOrganization?.id,
    }


    const {data, isLoading, isFetching} =  useViewAllLoanReferralQuery(clickedOrganization?.id? viewAllPropswWithId : viewAllProps,{refetchOnMountOrArgChange: true})
    
    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanReferralQuery (clickedOrganization?.id? searchParamWithOrg : searchParam,{skip: !debouncedSearchTerm})

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
                staticHeader='firstName'
                staticColunm='firstName'
                icon={<Icon icon="material-symbols:money-bag-outline" height={"2rem"} width={"2rem"} color={ '#142854' }></Icon>}
                sideBarTabName='Loan referral'
                tableCellStyle="h-12"
                tableHeight={data?.data?.body?.length < 10 ? 60:searchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                hasNextPage={hasNextPage}
                pageNumber={searchTerm !== ""? pageSearchNumber : pageNumber}
                setPageNumber={searchTerm !== ""? setPageSearchNumber :  setPageNumber}
                totalPages={totalPage}
                condition={true}
                searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchResult?.data?.body?.length < 1 }
            />
        </div>
    );
};

export default LoanReferral;