"use client"
import React from "react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import {useAppSelector} from "@/redux/store";
import { useViewAllLoanOfferQuery } from "@/service/admin/loan/loan-offer-api";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const Index = () => {
    const router = useRouter();
    const request ={
        pageSize: 100,
        pageNumber: 0
    }
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const { data, isLoading} = useViewAllLoanOfferQuery(request)
    const requestBody = {
        pageNumber: 0,
        pageSize: 100,
        organizationId: clickedOrganization?.id
    }
    const {data: viewAllLoanRequestsInAnOrganizationData, isLoading:isLoadingOrganizationLoanRequest } = useViewAllLoanOfferQuery(requestBody)

    // console.log('view all loan requests:: ', data,'viewAllLoanRequestsInAnOrganizationData:: ', viewAllLoanRequestsInAnOrganizationData, 'isLoadingOrganizationLoanRequest:: ', isLoadingOrganizationLoanRequest)
    const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div>  },
        { title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) =>row.programName },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohortName },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row: TableRowData) => <div>{dayjs(row.cohortStartDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: TableRowData) =><div>{dayjs(row.requestDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row: TableRowData) => <div className=''>{formatAmount(row.initialDeposit)}</div>},
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => <div className=''>{formatAmount(row.loanAmountRequested)}</div>}
    ];

    // console.log('sjd: ', di)
    // console.log('')

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        router.push(`/loan-offer-details?id=${ID}`);
    };


    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
             className={`grid md:px-3 md:overflow-hidden  md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {isLoading || isLoadingOrganizationLoanRequest ? (
                <div className={`w-full h-fit md:w-full md:h-fit`}>
                    <SkeletonForTable />
                </div>
            ) :viewAllLoanRequestsInAnOrganizationData?.data?.body?.length === 0 || data?.data?.body?.length === 0 ?
                (
                    <LoanEmptyState
                        id={'LoanRequestEmptyState'}
                        icon={<Icon icon="material-symbols:money-bag-outline"
                                    height={"2rem"}
                                    width={"2em"}
                                    color={'#142854'}
                        ></Icon >} iconBg={'#D9EAFF'} title={'Loan request will show here'} description={clickedOrganization?.id ? 'There are no loan requests in this organization yet': `There are no loan requests available yet` } />
                ) :
                (
                    <div className={`md:w-full  w-full h-full md:h-full `}>
                        <Tables
                            tableData={clickedOrganization?.id  ? viewAllLoanRequestsInAnOrganizationData?.data?.body : data?.data?.body.slice().reverse()}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanRequestHeader}
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

export default Index;
