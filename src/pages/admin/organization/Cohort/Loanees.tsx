'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {cabinetGroteskBold, cabinetGroteskMediumBold} from "@/app/fonts";
import SearchInput from "@/reuseable/Input/SearchInput";
import { MdOutlinePeople} from "react-icons/md";
import {formatAmount} from "@/utils/Format";
import Tables from "@/reuseable/table/index";
import {CohortTrainees} from "@/utils/LoanRequestMockData/cohortProduct";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const Loanees = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleBackButtonClick = () => {

    }



    const tableHeader = [
        { title: 'Trainee', sortable: true, id: 'trainee', selector: (row: TableRowData) => row.Trainee},
        {title: "Initial deposit", sortable: true, id: "InitialDeposit", selector: (row: TableRowData) => row.InitialDeposit},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: TableRowData) => formatAmount((row.AmountRequested))},
        {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: TableRowData) => formatAmount((row.AmountReceived))},
    ];

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

                <Tables
                    tableData={CohortTrainees}
                    isLoading={false}
                    handleRowClick={()=> {}}
                    tableHeader={tableHeader}
                    tableHeight={49}
                    sx='cursor-pointer'
                    staticColunm='Trainee'
                    staticHeader='Trainee'
                    showKirkBabel={false}
                    icon={MdOutlinePeople}
                    sideBarTabName='Cohort'
                    optionalFilterName='graduate'
                />
            </div>
        </div>
    );
};

export default Loanees;