"use client"
import React from "react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {useRouter} from "next/navigation";
import {useViewAllLoanOfferQuery, useViewLoanInAnOrganizationQuery} from "@/service/admin/loan/loan-offer-api";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import {useAppSelector} from "@/redux/store";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function LoanOfferTable() {
    const router = useRouter();
    const request ={
        pageSize: 10,
        pageNumber: 0
    }

    const {data, isLoading} = useViewAllLoanOfferQuery(request)
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const requestBody = {
        pageSize: 10,
        pageNumber: 0,
        organizationId: clickedOrganization?.id
    }
    const {data: organizationLoanOffers, isLoading:isLoadingOrganizationLoanOffers} = useViewLoanInAnOrganizationQuery(requestBody)

    console.log('organizationLoanOffers:: ', organizationLoanOffers,'isLoadingOrganizationLoanOffers:: ', isLoadingOrganizationLoanOffers)

    const loanOfferHeader = [
        {
            title: 'Loanee',
            sortable: true,
            id: 'firstName',
            selector: (row: TableRowData) => <div
                className='flex gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())}
                <div className={``}></div>
                {row.lastName}</div>
        },
        {title: 'Loan Product', sortable: true, id: 'program', selector: (row: TableRowData) => row.loanProductName},
        {title: 'Offer date', sortable: true, id: 'startDate', selector: (row: TableRowData) => dayjs(row.dateOffered?.toString() ).format('MMM D, YYYY')},
        { title: 'Amount Requested', sortable: true, id: 'amountRequest', selector: (row: TableRowData) => formatAmount(row?.amountRequested) },
        { title: 'Amount Approved', sortable: true, id: 'requestDate', selector: (row: TableRowData) => formatAmount(row?.amountApproved) },

    ];

    const handleRowClick = (Object: string | object | React.ReactNode) => {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const loanProductId = Object?.id
        router.push(`/loan-offer-details?id=${loanProductId}`);
    };

    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
             className={`grid md:px-3 md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            { isLoading || isLoadingOrganizationLoanOffers ? (
                <div className={`w-full h-fit md:w-full md:h-fit`}>
                    <SkeletonForTable />
                </div>
            ) :organizationLoanOffers?.data?.body?.length === 0 || data?.data?.body?.length === 0 ?
                (
                    <LoanEmptyState
                        id={'LoanofferEmptyState'}
                        icon={<Icon icon="material-symbols:money-bag-outline"
                                    height={"2rem"}
                                    width={"2em"}
                                    color={'#142854'}
                        ></Icon >} iconBg={'#D9EAFF'} title={'Loan request will show here'} description={clickedOrganization?.id ? 'There are no loan offers in this organization yet': `There are no loan offers available yet` } />
                ) :
                (
                    <div className={`md:w-full  w-full h-full md:h-full `}>
                        <Tables
                            tableData={clickedOrganization?.id  ? organizationLoanOffers?.data?.body : data?.data?.body}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanOfferHeader}
                            tableHeight={52}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Cohort'
                            optionalFilterName='graduate'
                        />
                    </div>
                )
            }
        </div>
    );
}

export default LoanOfferTable;
