'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {cabinetGroteskBold, cabinetGroteskMediumBold} from "@/app/fonts";
import SearchInput from "@/reuseable/Input/SearchInput";
import { MdOutlinePerson} from "react-icons/md";
import {formatAmount} from "@/utils/Format";
import {useViewAllLoaneeQuery} from "@/service/admin/cohort_query";
import Table from "@/reuseable/table/LoanProductTable"

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
interface userIdentity {
    firstName: string;
    lastName: string;
}

interface loaneeLoanDetail {
    initialDeposit: number;
    amountRequested: number;
    amountReceived: number;
}

interface viewAllLoanee {
    userIdentity: userIdentity;
    loaneeLoanDetails: loaneeLoanDetail;
    loaneeStatus: string;
}
type viewAllLoanees = viewAllLoanee & TableRowData;


const Loanees = () => {
    const [searchTerm, setSearchTerm] = useState("");


    const handleBackButtonClick = () => {

    }
    const size = 300;
    const [page] = useState(0);

    const {data, isLoading} = useViewAllLoaneeQuery({
        cohortId: 'a14a73bd-0ddb-4b58-8822-9ff1f7dff0e3',
        pageSize: size,
        pageNumber: page
    },{refetchOnMountOrArgChange: true})

    const tableHeaderintegrated = [
        {title: "Trainee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => row?.userIdentity?.firstName + " " + row?.userIdentity?.lastName},
        {title: "Initial deposit", sortable: true, id: "initialDeposit", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetails?.initialDeposit))},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetails?.amountRequested))},
        {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetails?.amountReceived))},
    ];

    // const tableHeader = [
    //     { title: 'Trainee', sortable: true, id: 'trainee', selector: (row: TableRowData) => row.Trainee},
    //     {title: "Initial deposit", sortable: true, id: "InitialDeposit", selector: (row: TableRowData) => row.InitialDeposit},
    //     {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: TableRowData) => formatAmount((row.AmountRequested))},
    //     {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: TableRowData) => formatAmount((row.AmountReceived))},
    // ];

    return (
        <div
            id={'loaneesInACohort'}
            className={'w-full h-full md:px-6 md:py-4 px-4 py-4 '}
        >
            <BackButton id={'backCohorts'} textColor={'meedlBlue'} text={'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/>
            <div
                id={'cohortNameAndInitials'}
                className={` mt-8 flex gap-4  w-full h-fit `}
            >
                <div
                    id={'cohortInitials'}
                    className={`w-fit py-3 px-4 h-fit rounded-full bg-[#FEF6F0] text-[#68442E] text-[28px] ${cabinetGroteskBold.className}  h-fit flex justify-center items-center`}
                >
                    AL
                </div>
                <span id={'cohortName'} className={`text-[#212221] ${cabinetGroteskMediumBold.className} text-[28px] mt-auto mb-auto `}>Alphas</span>
            </div>
            <div id="searchDiv" className="px-2 mt-4  flex md:flex-row flex-col gap-3">
                <SearchInput
                    id="SearchLoanee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
                />
            </div>
            <div
                id={'loaneeTable'}
                className={`mt-6`}
            >

                <Table
                    tableData={data?.data?.body}
                    tableHeader={tableHeaderintegrated}
                    handleRowClick={()=> {}}
                    staticHeader=""
                    staticColunm="firstName"
                    icon={MdOutlinePerson}
                    sideBarTabName="trainee"
                    optionalRowsPerPage={10}
                    tableCellStyle="h-12"
                    isLoading={isLoading}
                    condition={true}
                    tableHeight={45}
                />
            </div>
        </div>
    );
};

export default Loanees;