"use client"
import React from "react";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {store, useAppSelector} from "@/redux/store";
import {
    useViewAllLoanDisbursalQuery
} from "@/service/admin/loan/Loan-disbursal-api";
import {setClickedDisbursedLoanIdNumber} from "@/redux/slice/loan/selected-loan";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();

    const clickedOrganizationId = useAppSelector(state => state.selectedLoan?.clickedOrganization)

    const request = {
        pageSize: 400,
        pageNumber: 0,
        organizationId: clickedOrganizationId?.id ? clickedOrganizationId?.id?.toString() : '',
    }

    const {data, isLoading } = useViewAllLoanDisbursalQuery(request)





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
            selector: (row: TableRowData) => <div className=''>{formatAmount(row.initialDeposit)}</div>
        },
        {
            title: 'Amount requested',
            sortable: true,
            id: 'amountRequested',
            selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountRequested)}</div>
        }
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        store.dispatch(setClickedDisbursedLoanIdNumber(ID))
        router.push(`/disbursed-loan-details?id=${ID}`);
    };

    return (
        <div data-testid={'LoanDisbursalMainDivContainer'} id={`LoanDisbursalMainDivContainer`}
        >
            {isLoading  ? (
                <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                    <SkeletonForTable/>
                </div>
            ) : data?.data?.body?.length === 0 ?
                (
                    <TableEmptyState name={"loan disbursal"}   icon={
                        <Icon
                            icon="material-symbols:money-bag-outline"
                            height="2.5rem"
                            width="2.5rem"
                        />
                    } condition={true} descriptionId={clickedOrganizationId?.id ? 'There are no loan disbursal in this organization yet' : `There are no loan disbursal available yet`}/>
                ) :
                (
                    <div className={``}>
                        <Tables
                            tableData={data?.data?.body}
                            isLoading={isLoading }
                            handleRowClick={handleRowClick}
                            tableHeader={loanDisbursalHeader}
                            tableHeight={54}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Loans'
                            optionalFilterName='graduate'
                            condition={true}
                            optionalRowsPerPage={10}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Index;