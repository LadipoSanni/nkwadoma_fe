"use client"
import React from "react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {store, useAppSelector} from "@/redux/store";
import {useViewAllLoanDisbursalQuery} from "@/service/admin/loan/Loan-disbursal-api";
import {setClickedDisbursedLoanIdNumber} from "@/redux/slice/loan/selected-loan";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();
    // const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization)

    const clickedOrganizationId = useAppSelector(state => state.selectedLoan.clickedOrganization)
    const {id} = clickedOrganizationId || {};

    console.log("This is Organizationid", id)

    const size = 1;
    const page = 100;

    const {data, isLoading: isLoading} = useViewAllLoanDisbursalQuery(
        {
            organizationId: clickedOrganizationId?.id,
            pageSize: size,
            pageNumber: page,
        },
        {refetchOnMountOrArgChange: true}
    );


    const loanDisbursalHeader = [
        {
            title: 'Loanee',
            sortable: true,
            id: 'firstName',
            selector: (row: TableRowData) => <div className='flex gap-2 '>{row.firstName}
                <div className={``}></div>
                {row.lastName}</div>
        },
        {title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.programName},
        {title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohortName},
        {
            title: 'Offer date',
            sortable: true,
            id: 'startDate',
            selector: (row: TableRowData) => <div>{dayjs(row.offerDate?.toString()).format('MMMM D, YYYY')}</div>
        },
        {
            title: 'Loan start date',
            sortable: true,
            id: 'requestDate',
            selector: (row: TableRowData) => <div>{dayjs(row.startDate?.toString()).format('MMMM D, YYYY')}</div>
        },
        {
            title: 'Deposit',
            sortable: true,
            id: 'initialDeposit',
            selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.initialDeposit)}</div>
        },
        {
            title: 'Amount Requested',
            sortable: true,
            id: 'amountRequested',
            selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.amountRequested)}</div>
        }
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        store.dispatch(setClickedDisbursedLoanIdNumber(ID))
        router.push(`/disbursed-loan-details?id=${ID}`);
    };

    return (
        <div data-testid={'LoanDisbursalMainDivContainer'} id={`LoanDisbursalMainDivContainer`}
             className={`grid md:px-3 md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {
                isLoading? (
                        <div className={`w-full h-fit md:w-full md:h-full`}>
                            <SkeletonForTable/>
                        </div>
                    ) :
                    data?.data?.body?.length > 0 ?
                        <div className={`md:w-full w-full h-full md:h-full `}>
                            <Tables
                                tableData={data?.data?.body}
                                isLoading={isLoading}
                                handleRowClick={handleRowClick}
                                tableHeader={loanDisbursalHeader}
                                tableHeight={52}
                                sx='cursor-pointer'
                                staticColunm='cohort'
                                staticHeader='Cohort'
                                showKirkBabel={false}
                                icon={MdOutlinePeople}
                                sideBarTabName='Loans'
                                optionalFilterName='graduate'
                                condition={true}
                            />
                        </div> :
                        <LoanEmptyState
                            id={'LoanDisbursalEmptyState'}
                            data-testid={'LoanDisbursalEmptyState'}
                            icon={<Icon icon="material-symbols:money-bag-outline"
                                        height={"2rem"}
                                        width={"2em"}
                                        color={'#142854'}
                                        id={'loanDisbursalId'}
                            ></Icon>} iconBg={'#D9EAFF'} title={'Disbursed loan will show here'}
                            description={`There are no disbursed loans available yet`}/>


            }
        </div>
    );
}

export default Index;