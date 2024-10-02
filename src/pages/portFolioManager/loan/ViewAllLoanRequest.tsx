"use client"
import { useRouter } from 'next/navigation'
import React from "react";
import {LoanRequestTable} from "@/utils/LoanRequestMockData"
import LoanEmptyState from "@/reuseable/emptyStates/LoanEmptyState";
import DynamicTable from "@/reuseable/table/LoanProductTable";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
  }

function ViewAllLoanRequest() {
    const router = useRouter();
    // const [counter] = useState(0);
    // const [data, setData] = useState({ pageNumber: counter, pageSize: 10 });

    // useEffect(() => {
    //     setData({ pageNumber: counter, pageSize: 10 });
    // }, [counter]);

    const columns = [
        { title: 'Trainee name', sortable: true, id: 'traineeName', selector: (row: TableRowData) => row.traineeName },
        { title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.program },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohort },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row: TableRowData) => row.startDate },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: TableRowData) => row.requestDate },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row: TableRowData) => row.initialDeposit },
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => row.amountRequested }
    ];

    const handleRowClick = () => {
        router.push(`/loan`);
    };

    return (
        <div data-testid={'mainDiv'} id={`mainDiv`} className={`flex flex-col h-full py-[20px] px-[40px]  w-screen md:w-auto `}>
            {
                LoanRequestTable.length < 1 ?
                    <div data-testid={`emptyStateDiv`}>
                        <LoanEmptyState title={'Loan REQUEST will show here'} />
                    </div>
                    :
                    <div data-testid={`tableDiv`}>
                        <DynamicTable
                            tableHeight={52}
                            tableHeader={columns}
                            tableData={LoanRequestTable}
                            handleRowClick={handleRowClick}
                            sx='cursor-pointer'
                            staticColunm='traineeName'
                        />
                        
                    </div>
            }
        </div>
    );
}

export default ViewAllLoanRequest;


