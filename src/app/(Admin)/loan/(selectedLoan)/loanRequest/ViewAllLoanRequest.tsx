"use client"
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from "react";
import {LoanRequestTable} from "@/app/(Admin)/loan/(selectedLoan)/loanRequest/LoanRequestMockData"
import EmptyState from "@/reuseable/emptyStates/EmptyState";
import DynamicTable from "@/reuseable/table/DynamicTable";

function ViewAllLoanRequest() {
    const router = useRouter();
    const [counter] = useState(0);
    const [data, setData] = useState({ pageNumber: counter, pageSize: 10 });

    useEffect(() => {
        setData({ pageNumber: counter, pageSize: 10 });
    }, [counter]);

    const columns = [
        { title: 'Trainee name', sortable: true, id: 'traineeName', selector: (row: any) => row.traineeName },
        { title: 'Program', sortable: true, id: 'program', selector: (row: any) => row.program },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: any) => row.cohort },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row: any) => row.startDate },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: any) => row.requestDate },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row: any) => row.initialDeposit },
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: any) => row.amountRequested }
    ];

    const handleRowClick = (row: any) => {
        router.push(`/loan`);
    };

    return (
        <div data-testid={'mainDiv'} className={`flex flex-col h-full py-[20px] px-[40px]  w-screen md:w-auto `}>
            {
                LoanRequestTable.length < 1 ?
                    <div data-testid={`emptyStateDiv`}>
                        <EmptyState title={'Loan REQUEST will show here'} />
                    </div>
                    :
                    <div data-testid={`tableDiv`}>
                        <DynamicTable
                            tableHeight={52}
                            tableHeader={columns}
                            tableData={LoanRequestTable}
                            handleRowClick={handleRowClick}
                        />
                    </div>
            }
        </div>
    );
}

export default ViewAllLoanRequest;


