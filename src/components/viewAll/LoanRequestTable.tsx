"use client"
// import { useRouter } from 'next/navigation'
import React from "react";
import {LoanRequestTable} from "@/utils/LoanRequestMockData/Index"
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
// import { loanRequestData} from "@/utils/LoanRequestMockData/cohortProduct";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
// import {LoanRequestType} from "@/types/loan/loan-request.type";
import {formatAmount} from "@/utils/Format";
// import DynamicTable from "@/reuseable/table/LoanProductTable";
// import {formatDate} from "date-fns";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();
    const request ={
        pageSize: 10,
        pageNumber: 10
    }
    const {data, error, isLoading} = useViewAllLoanRequestQuery(request)
    // const
    // const [counter] = useState(0);
    // const [data, setData] = useState({ pageNumber: counter, pageSize: 10 });

    // useEffect(() => {
    //     setData({ pageNumber: counter, pageSize: 10 });
    // }, [counter]);
    console.log("data:: ", data, "error: ", error, "isLoading:: ", isLoading)

    const loanRequestHeader = [
        // { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) => row.firstName },
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex gap-4 '>{row.firstName}{row.lastName}</div>  },
        { title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.programName },
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohort },
        { title: 'Start date', sortable: true, id: 'startDate', selector: (row: TableRowData) => row.cohortStartDate },
        { title: 'Request date', sortable: true, id: 'requestDate', selector: (row: TableRowData) => row.requestDate },
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.initialDeposit)}</div>},
        { title: 'Amount Requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.amountRequested)}</div>}
    ];

    const handleRowClick = () => {
        // router.push(`/loan-details?id=${row?.id}`);
        // LoanRequestType
        router.push(`/loan-request-details?id=5f0a7531-970a-4dec-8ee0-e4f1e42901c7`);

    };

    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
             className={`grid md:px-3 md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {
                // data?.data?.body?.length > 0 ?
                LoanRequestTable?.length > 0 ?
                    <div className={`md:w-full w-full h-full md:h-full `}>
                        <Tables
                            tableData={LoanRequestTable}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanRequestHeader}
                            tableHeight={52}
                            sx='cursor-pointer'
                            staticColunm='cohort'
                            staticHeader='Cohort'
                            showKirkBabel={false}
                            // kirkBabDropdownOption={dropDownOption}
                            icon={MdOutlinePeople}
                            sideBarTabName='Cohort'
                            optionalFilterName='graduate'
                            // handleDropDownClick={handleDropdownClick}
                        />
                    </div>


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

export default Index;
