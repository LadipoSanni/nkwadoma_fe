"use client"
import React from "react";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import { useAppSelector} from "@/redux/store";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";

interface userIdentity {
    firstName?: string;
    lastName?: string;
};

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode  ;
}

interface viewAllLoanee {
    userIdentity: userIdentity
    programName: string
    cohortName: string
    cohortStartDate: string
    requestDate:string
    initialDeposit:number
    loanAmountRequested: number
}

type viewAllLoanees = viewAllLoanee & TableRowData;

const Index = () => {
     const [pageNumber, setPageNumber] = React.useState(0);
      
    const router = useRouter();
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);

    const request ={
        pageSize: 10,
        pageNumber:pageNumber,
        organizationId: clickedOrganization?.id || '',
    }


    const { data, isLoading,isFetching} = useViewAllLoanRequestQuery(request,{refetchOnMountOrArgChange: true})


    const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllLoanees) =>capitalizeFirstLetters(row.userIdentity?.firstName?.toString()) + " " + capitalizeFirstLetters(row.userIdentity?.lastName?.toString()) },
        { title: 'Program', sortable: true, id: 'program', selector: (row:  viewAllLoanees) =>row.programName },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:  viewAllLoanees) => row.cohortName },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row:  viewAllLoanees) => dayjs(row.cohortStartDate?.toString()).format('MMM D, YYYY')},
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: viewAllLoanees) => dayjs(row.requestDate?.toString()).format('MMM D, YYYY') },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllLoanees) => formatAmount(row.initialDeposit)},
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row: viewAllLoanees) =>formatAmount(row.loanAmountRequested)}
    ];



    const handleRowClick = (ID: string | object | React.ReactNode) => {
        router.push(`/loan-request-details?id=${ID}`);
    };


    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
            //  className={`grid md:px-3 md:overflow-hidden   place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {isLoading  ? (
                    <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                        <SkeletonForTable />
                    </div>
                ) : data?.data?.body?.length === 0 || !data ?
                    (
                        <TableEmptyState name={"loan request"}   icon={
                            <Icon
                                icon="material-symbols:money-bag-outline"
                                height="2.5rem"
                                width="2.5rem"
                            />
                        } condition={true} descriptionId={clickedOrganization?.id ? 'There are no loan requests in this organization yet': `There are no loan requests available yet`}/>
                     ) :
               (
                    <div className={` pr-2 md:pr-0`}>
                        <Table
                            tableData={ data?.data?.body}
                            isLoading={isLoading || isFetching}
                            handleRowClick={handleRowClick}
                            tableHeader={loanRequestHeader}
                            tableHeight={54}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Cohort'
                            totalPages={data?.data?.totalPages}
                            hasNextPage={data?.data?.hasNextPage}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            condition={true}
                        />
                    </div>
               )
            }
        </div>
    );
}

export default Index;
