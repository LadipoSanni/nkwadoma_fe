"use client"
import React from "react";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
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
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();
     const [pageNumber, setPageNumber] = React.useState(0);
    const clickedOrganizationId = useAppSelector(state => state.selectedLoan?.clickedOrganization)

    const request = {
        pageSize: 10,
        pageNumber: pageNumber,
        organizationId: clickedOrganizationId?.id ? clickedOrganizationId?.id?.toString() : '',
    }

    const {data, isLoading, isFetching } = useViewAllLoanDisbursalQuery(request,{refetchOnMountOrArgChange: true})





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
            {isLoading  ? (
                <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                    <SkeletonForTable/>
                </div>
            ) : data?.data?.body?.length === 0 || !data ?
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
                        <Table
                            tableData={data?.data?.body}
                            isLoading={isLoading || isFetching }
                            handleRowClick={handleRowClick}
                            tableHeader={loanDisbursalHeader}
                            tableHeight={data?.data?.body?.length < 10 ? 58 : undefined}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Loans'
                            optionalFilterName='graduate'
                            condition={true}
                            totalPages={data?.data?.totalPages}
                            hasNextPage={data?.data?.hasNextPage}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Index;