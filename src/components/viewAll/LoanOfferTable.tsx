"use client"
import React from "react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {useRouter} from "next/navigation";
import {useViewAllLoanOfferQuery} from "@/service/admin/loan/loan-offer-api";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function LoanOfferTable() {
    const router = useRouter();
    const request ={
        pageSize: 10,
        pageNumber: 0
    }

    const {data, isLoading} = useViewAllLoanOfferQuery(request)

    console.log('data: data', data)

    const loanOfferHeader = [
        {
            title: 'Loanee',
            sortable: true,
            id: 'loanee',
            selector: (row: TableRowData) => <div
                className='flex gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())}
                <div className={``}></div>
                {row.lastName}</div>
        },
        {title: 'Loan Product', sortable: true, id: 'program', selector: (row: TableRowData) => row.loanProductName},
        {title: 'Offer date', sortable: true, id: 'startDate', selector: (row: TableRowData) => row.dateOffered },
        { title: 'Amount Requested', sortable: true, id: 'amountRequest', selector: (row: TableRowData) => row.amountRequested },
        { title: 'Amount Approved', sortable: true, id: 'requestDate', selector: (row: TableRowData) => row.amountApproved },

    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        router.push(`/loan-offer-details?id=${ID}`);
    };

    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
             className={`grid md:px-3 md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {
                data?.data?.body?.length > 0 ?
                // loanOfferTable?.length > 0 ?
                    <div className={`md:w-full w-full h-full md:h-full `}>
                        <Tables
                            tableData={data?.data?.body}
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
