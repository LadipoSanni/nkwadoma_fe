"use client"
// import { useRouter } from 'next/navigation'
import React from "react";
import {loanOfferTable, LoanRequestTable} from "@/utils/LoanRequestMockData/Index"
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import { loanRequestData} from "@/utils/LoanRequestMockData/cohortProduct";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {useRouter} from "next/navigation";
import {useViewAllLoanRequestQuery} from "@/service/admin/loan/loan-request-api";
import {LoanRequestType} from "@//types/loan/loan-request.type";
// import DynamicTable from "@/reuseable/table/LoanProductTable";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function LoanOfferTable() {
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

    const loanOfferHeader = [
        { title: 'Loanee', sortable: true, id: 'loanee', selector: (row: TableRowData) => row.loanee  },
        { title: 'Loan Product', sortable: true, id: 'program', selector: (row: TableRowData) => row.loanProduct },
        { title: 'Offer date', sortable: true, id: 'startDate', selector: (row: TableRowData) => row.requestDate },
        { title: 'Amount Requested', sortable: true, id: 'amountRequest', selector: (row: TableRowData) => row.amountRequested },
        { title: 'Amount Approved', sortable: true, id: 'requestDate', selector: (row: TableRowData) => row.amountApproved },

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
                loanOfferTable?.length > 0 ?
                    <div className={`md:w-full w-full h-full md:h-full `}>
                        <Tables
                            tableData={loanOfferTable}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanOfferHeader}
                            tableHeight={52}
                            sx='cursor-pointer'
                            staticColunm='cohort'
                            staticHeader='Loanee'
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
                        ></Icon >} iconBg={'#D9EAFF'} title={'Loan offer will show here'} description={`There are no loan offers available yet`} />


            }
        </div>
    );
}

export default LoanOfferTable;
