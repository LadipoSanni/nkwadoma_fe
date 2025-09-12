'use client'
import React from 'react';
import Table from '@/reuseable/table/Table';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
// import {loanReferralTable} from "@/utils/LoanRequestMockData/Index";
import {Icon} from "@iconify/react";
import { useViewAllLoanReferralQuery } from '@/service/admin/loan/loan-request-api';
import {useAppSelector} from "@/redux/store";

interface viewAllType {
    programName: string
    firstName: string
    dateReferred: string
    requestDate:string
    initialDeposit:number
    amountReferred: number
    lastName: string
}

const LoanReferral = () => {

    const [pageNumber, setPageNumber] = React.useState(0);
    const [pageSize] = React.useState(10);
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const viewAllProps = {
        pageSize:pageSize,
        pageNumber:pageNumber,
    }
    
    const viewAllPropswWithId = {
        pageSize:pageSize,
        pageNumber:pageNumber,
        organizationId: clickedOrganization?.id,
    }
    const {data, isLoading, isFetching} =  useViewAllLoanReferralQuery(clickedOrganization?.id? viewAllPropswWithId : viewAllProps,{refetchOnMountOrArgChange: true})
    const tableHeader =  [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllType) => capitalizeFirstLetters(row?.firstName?.toString()) +  " "  +  capitalizeFirstLetters(row?.lastName?.toString()) },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllType) => formatAmount(row.initialDeposit)},
        { title: 'Amount referred', sortable: true, id: 'amountReferred', selector: (row: viewAllType) => formatAmount(row.amountReferred)},
        { title: 'Date referred', sortable: true, id: 'dateReferred', selector: (row: viewAllType) => dayjs(row.dateReferred?.toString()).format('MMM D, YYYY')},

    ]

// 
    return (
        <div
            id={'viewAllLoanReferrals'}
            data-testid={'viewAllLoanReferrals'}
            className={` w-full h-full  `}
        >

            <Table
                tableData={data?.data?.body}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={ tableHeader}
                handleRowClick={()=> {} }
                staticHeader='firstName'
                staticColunm='firstName'
                icon={<Icon icon="material-symbols:money-bag-outline" height={"2rem"} width={"2rem"} color={ '#142854' }></Icon>}
                sideBarTabName='Loan referral'
                tableCellStyle="h-12"
                tableHeight={data?.data?.body?.length < 10 ? 58 : undefined}
                isLoading={isLoading || isFetching}
                hasNextPage={data?.data?.hasNextPage}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={data?.data?.totalPages}
                condition={true}
                searchEmptyState={false}
            />
        </div>
    );
};

export default LoanReferral;