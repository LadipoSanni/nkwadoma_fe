"use client"
import React from "react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {loanDisbursalTable} from "@/utils/LoanRequestMockData/Index";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();
    const request ={
        pageSize: 10,
        pageNumber: 10
    }
    const {  isLoading} = useViewAllLoanRequestQuery(request)




    const loanDisbursalHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex gap-2 '>{row.loanee} <div className={``}></div>{row.lastName}</div>  },
        { title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.program },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohort },
        { title: 'Offer date', sortable: true, id: 'startDate', selector: (row: TableRowData) => <div>{dayjs(row.offerDate?.toString()).format('MMMM D, YYYY')}</div> },
        { title: 'Loan start date', sortable: true, id: 'requestDate', selector: (row: TableRowData) =><div>{dayjs(row.loanStartDate?.toString()).format('MMMM D, YYYY')}</div> },
        { title: 'Deposit', sortable: true, id: 'initialDeposit', selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.deposit)}</div>},
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.AmountRequested)}</div>}
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        router.push(`/disbursed-loan-details?id=${ID}`);
    };

    return (
        <div data-testid={'LoanDisbursalMainDivContainer'} id={`LoanDisbursalMainDivContainer`}
             className={`grid md:px-3 md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {
                loanDisbursalTable?.length > 0 ?
                    // LoanRequestTable?.length > 0 ?
                    <div className={`md:w-full w-full h-full md:h-full `}>
                        <Tables
                            tableData={loanDisbursalTable}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanDisbursalHeader}
                            tableHeight={52}
                            sx='cursor-pointer'
                            staticColunm='cohort'
                            staticHeader='Cohort'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Cohort'
                            optionalFilterName='graduate'
                        />
                    </div>


                    :
                    <LoanEmptyState
                        id={'LoanDisbursalEmptyState'}
                        data-testid={'LoanDisbursalEmptyState'}
                        icon={<Icon icon="material-symbols:money-bag-outline"
                                    height={"2rem"}
                                    width={"2em"}
                                    color={'#142854'}
                                    id={'loanDisbursalId'}
                        ></Icon >} iconBg={'#D9EAFF'} title={'Disbursed loan will show here'} description={`There are no loan disbursed loan available yet`} />


            }
        </div>
    );
}

export default Index;