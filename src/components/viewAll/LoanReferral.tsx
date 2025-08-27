import React from 'react';
import Table from '@/reuseable/table/Table';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {MdOutlineAssignmentTurnedIn} from "react-icons/md";
import {loanReferralTable} from "@/utils/LoanRequestMockData";

const LoanReferral = () => {

    const tableHeader =  [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllLoanees) =><div className='flex  gap-2 '>{capitalizeFirstLetters(row?.firstName?.toString())} <div className={``}></div>{capitalizeFirstLetters(row?.lastName?.toString())}</div>  },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllLoanees) => <div className=''>{formatAmount(row.initialDeposit)}</div>},
        { title: 'Amount referred', sortable: true, id: 'amountReferred', selector: (row: viewAllLoanees) => <div className=''>{formatAmount(row.amountReferred)}</div>},
        { title: 'Date referred', sortable: true, id: 'dateReferred', selector: (row: viewAllLoanees) =><div>{dayjs(row.dateReferred?.toString()).format('MMM D, YYYY')}</div> },

    ]
    const handleRowClick = (ID: string | object | React.ReactNode) => {
        // router.push(`/loan-request-details?id=${ID}`);
    };

    return (
        <div
            id={'viewAllLoanReferrals'}
            data-testid={'viewAllLoanReferrals'}
            className={` w-full h-full bg-red-200 `}
        >

            <Table
                tableData={loanReferralTable}
                tableHeader={ tableHeader}
                handleRowClick={userRole !== "MEEDL_ADMIN"? handleRowClick : () => {}}
                staticHeader='Name'
                staticColunm='firstName'
                icon={MdOutlineAssignmentTurnedIn}
                sideBarTabName='request'
                tableCellStyle="h-12"
                tableHeight={loanReferralTable?.length < 10 ? 60 : undefined}
                // tableHeight={adminData?.data?.body?.length < 10 ? 60 : undefined}
                // isLoading={isLoading || isFetching }
                isLoading={false}
                // hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPages}
                // hasNextPage={currentTabState.hasNextPage}
                hasNextPage={false}
                // pageNumber={searchTerm !== ""? currentTabState.pageSearchNumber ?? 0 :currentTabState.pageNumber ?? 0}
                pageNumber={10}
                setPageNumber={handlePageChange}
                // totalPages={ totalPage}
                // totalPages={currentTabState.totalPages}
                totalPages={100}
                // sx={userRole !== "MEEDL_ADMIN"?'cursor-pointer' : ""}
                condition={true}
                searchEmptyState={false}
                // searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && adminData?.data?.body?.length < 1 }
                optionalFilterName='Pending'
            />
        </div>
    );
};

export default LoanReferral;