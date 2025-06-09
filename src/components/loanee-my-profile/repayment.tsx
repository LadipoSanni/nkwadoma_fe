import React from 'react';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import dayjs from "dayjs";
import {formatAmount} from "@/utils/Format";
import Tables from "@/reuseable/table";
import {MdOutlinePeople} from "react-icons/md";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const Repayment = () => {

    const loanRequestHeader = [
        { title: 'Repayment date', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex  gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div>  },
        { title: 'Amount paid', sortable: true, id: 'program', selector: (row: TableRowData) =>row.programName },
        { title: 'Payment mode', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohortName },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        // router.push(`/loan-request-details?id=${ID}`);
    };

    return (
        <div>
            <Tables
                tableData={[]}
                // tableData={clickedOrganization?.id  ? viewAllLoanRequestsInAnOrganizationData?.data?.body : data?.data?.body}
                // isLoading={isLoading || isLoadingOrganizationLoanRequest}
                isLoading={false}
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
    );
};

export default Repayment;