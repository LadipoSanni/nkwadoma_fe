import React, {useState} from 'react';
import {MdOutlineBusinessCenter, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import { loanRequestDatas} from "@/utils/LoanRequestMockData/cohortProduct";
import Table from '@/reuseable/table/Table';
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import DropDownWithActionButton from '@/reuseable/Dropdown/index';

interface viewAllLoanees {
    // userIdentity: userIdentity;
    // loaneeLoanDetails: loaneeLoanDetail;
    loaneeStatus: string;
    firstName: string;
    lastName: string;
    employmentStatus: string;
    amountRequested: string;
    amountRepaid: string;

}
interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const GraduatedLoanee = () => {
    const [loaneeName, setLoaneeName] = React.useState("");

    const [page,setPageNumber] = useState(0);
    const [totalPage] = useState(0)

    const changeLoaneeStatusToEmployed = () => {

    }

    const updateLoaneeEmploymentStatus: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'employed', name: 'Employed', handleClick: changeLoaneeStatusToEmployed},
        {id: 'unemployed', name: 'Unemployed', handleClick: changeLoaneeStatusToEmployed},

    ]

    const tableHeader = [
        {title: "Name", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => capitalizeFirstLetters(row?.firstName) + " " + capitalizeFirstLetters(row?.lastName)},
        {title: "Employment status", sortable: true, id: "employmentStatus", selector: (row: viewAllLoanees) => <DropDownWithActionButton id={``} trigger={row?.employmentStatus} dropDownItems={updateLoaneeEmploymentStatus} isDisabled={false} />},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount(row?.amountRequested)},
        {title: "Amount repaid", sortable: true, id: "AmountRepaid", selector:(row: viewAllLoanees) => formatAmount(row?.amountRepaid)},
    ]
    const handleRowClick = (row: TableRowData) => {
        console.log('roe: ', row)
        // store.dispatch(setActiveAndInvitedFinancierId(String(row?.id)))
        // store.dispatch(setFinancierMode("platform"))
        // router.push('/financier/details')
    };

    return (
        <div className={`  grid  `}>
            <div className="relative mb-6 max-w-md flex-1 ">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grey200 pointer-events-none" />
                <Input
                    type="search"
                    value={loaneeName}
                    placeholder="Search"
                    onChange={(e) => setLoaneeName(e.target.value)}
                    className="w-full lg:w-80 h-12 pl-10 border border-neutral650 text-grey450 shadow-none focus-visible:outline-none focus-visible:ring-0"
                />
            </div>
            <Table
                tableData={loanRequestDatas}

                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={tableHeader}
                handleRowClick={handleRowClick}
                tableHeight={45}
                icon={MdOutlineBusinessCenter }
                sideBarTabName='financier'
                condition={true}
                staticHeader={"Financier"}
                staticColunm={"name"}
                sx='cursor-pointer'
                hasNextPage={false}
                pageNumber={page}
                setPageNumber={setPageNumber}
                totalPages={totalPage}
                isLoading={false}
                // isLoading={isLoading || searchIsLoading || isFetching || isSearchFetching}
                tableCellStyle={'h-12'}
            />
        </div>
    );
};

export default GraduatedLoanee;