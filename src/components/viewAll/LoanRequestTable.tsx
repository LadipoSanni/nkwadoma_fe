"use client"
import React from "react";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import {useAppSelector} from "@/redux/store";
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
    const router = useRouter();
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);

    const request ={
        pageSize: 100,
        pageNumber: 0,
        organizationId: clickedOrganization?.id || '',
    }


    const { data, isLoading} = useViewAllLoanRequestQuery(request)


    const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: viewAllLoanees) =><div className='flex  gap-2 '>{capitalizeFirstLetters(row.userIdentity?.firstName?.toString())} <div className={``}></div>{capitalizeFirstLetters(row.userIdentity?.lastName?.toString())}</div>  },
        { title: 'Program', sortable: true, id: 'program', selector: (row:  viewAllLoanees) =>row.programName },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:  viewAllLoanees) => row.cohortName },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row:  viewAllLoanees) => <div>{dayjs(row.cohortStartDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: viewAllLoanees) =><div>{dayjs(row.requestDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:  viewAllLoanees) => <div className=''>{formatAmount(row.initialDeposit)}</div>},
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row: viewAllLoanees) => <div className=''>{formatAmount(row.loanAmountRequested)}</div>}
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
                ) : data?.data?.body?.length === 0 ?
                    (
                        <TableEmptyState name={"loan request"}   icon={
                            <Icon
                                icon="material-symbols:money-bag-outline"
                                height="2.5rem"
                                width="2.5rem"
                            />
                        } condition={true} descriptionId={clickedOrganization?.id ? 'There are no loan requests in this organization yet': `There are no loan requests available yet`}/>
                        // <LoanEmptyState
                        //     id={'LoanRequestEmptyState'}
                        //     icon={<Icon icon="material-symbols:money-bag-outline"
                        //                 height={"2rem"}
                        //                 width={"2rem"}
                        //                 color={'#142854'}
                        //     ></Icon >} iconBg={'#D9EAFF'} title={'Loan request will show here'} description={clickedOrganization?.id ? 'There are no loan requests in this organization yet': `There are no loan requests available yet` } />
                    ) :
               (
                    <div className={` pr-2 md:pr-0`}>
                        <Tables
                            tableData={ data?.data?.body}
                            isLoading={isLoading }
                            handleRowClick={handleRowClick}
                            tableHeader={loanRequestHeader}
                            tableHeight={54}
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
