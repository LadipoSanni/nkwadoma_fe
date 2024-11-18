"use client"
// import { useRouter } from 'next/navigation'
import React from "react";
// import {LoanRequestTable} from "@/utils/LoanRequestMockData/Index"
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import { loanRequestData} from "@/utils/LoanRequestMockData/cohortProduct";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
// import DynamicTable from "@/reuseable/table/LoanProductTable";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
  }

function ViewAllLoanRequest() {
    // const router = useRouter();
    // const [counter] = useState(0);
    // const [data, setData] = useState({ pageNumber: counter, pageSize: 10 });

    // useEffect(() => {
    //     setData({ pageNumber: counter, pageSize: 10 });
    // }, [counter]);

    const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'loanee', selector: (row: TableRowData) => row.loanee },
        { title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.program },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohort },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row: TableRowData) => row.startDate },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: TableRowData) => row.requestDate },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row: TableRowData) => row.initialDeposit },
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => row.amountRequested }
    ];

    const handleRowClick = () => {
        // router.push(`/loan`);
    };

    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`} 
        className={`grid md:bg-pink-300 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {
                loanRequestData.length > 0 ?
                    <Tables
                        tableData={loanRequestData}
                handleRowClick={handleRowClick}
                tableHeader={loanRequestHeader}
                tableHeight={52}
                sx='cursor-pointer'
                staticColunm='cohort'
                staticHeader='Cohort'
                showKirkBabel={true}
                // kirkBabDropdownOption={dropDownOption}
                icon={MdOutlinePeople}
                sideBarTabName='Cohort'
                optionalFilterName='graduate'
                // handleDropDownClick={handleDropdownClick}
            />
                    :
                    <LoanEmptyState
                        id={'LoanRequestEmptyState'}
                        icon={<Icon icon="material-symbols:money-bag-outline"
                                        height={"2rem"}
                                        width={"2em"}
                                        color={'#142854'}
            ></Icon >} iconBg={'#D9EAFF'} title={'Loan request will show here'} description={`There are no loan requests available yet`} />


            }
        </div>
    );
}

export default ViewAllLoanRequest;


