'use client'
import React from 'react';
import Table from '@/reuseable/table/Table';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {loanReferralTable} from "@/utils/LoanRequestMockData/Index";
import {Icon} from "@iconify/react";

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
    const tableHeader =  [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllType) =><div className='flex  gap-2 '>{capitalizeFirstLetters(row?.firstName?.toString())} <div className={``}></div>{capitalizeFirstLetters(row?.lastName?.toString())}</div>  },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllType) => <div className=''>{formatAmount(row.initialDeposit)}</div>},
        { title: 'Amount referred', sortable: true, id: 'amountReferred', selector: (row: viewAllType) => <div className=''>{formatAmount(row.amountReferred)}</div>},
        { title: 'Date referred', sortable: true, id: 'dateReferred', selector: (row: viewAllType) =><div>{dayjs(row.dateReferred?.toString()).format('MMM D, YYYY')}</div> },

    ]
    const handleRowClick = (ID: string | object | React.ReactNode) => {
        // router.push(`/loan-request-details?id=${ID}`);
        console.log(pageNumber, ID)
    };

    return (
        <div
            id={'viewAllLoanReferrals'}
            data-testid={'viewAllLoanReferrals'}
            className={` w-full h-full  `}
        >

            <Table
                tableData={loanReferralTable}
                tableHeader={ tableHeader}
                handleRowClick={handleRowClick }
                staticHeader='Loanee'
                staticColunm='Loanee'
                icon={<Icon icon="material-symbols:money-bag-outline" height={"2rem"} width={"2rem"} color={ '#142854' }></Icon>}
                sideBarTabName='Loan offer'
                tableCellStyle="h-12"
                tableHeight={loanReferralTable?.length < 10 ? 58 : undefined}
                // tableHeight={adminData?.data?.body?.length < 10 ? 60 : undefined}
                // isLoading={isLoading || isFetching }
                isLoading={false}
                // hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
                // hasNextPage={currentTabState.hasNextPage}
                hasNextPage={false}
                // pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
                pageNumber={10}
                setPageNumber={setPageNumber}
                // totalPages={ totalPage}
                // totalPages={currentTabState.totalPages}
                totalPages={100}
                // sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
                condition={true}
                searchEmptyState={false}
                // searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
                optionalFilterName=''
            />
        </div>
    );
};

export default LoanReferral;