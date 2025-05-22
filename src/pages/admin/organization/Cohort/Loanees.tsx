'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {cabinetGroteskBold, cabinetGroteskMediumBold} from "@/app/fonts";
import SearchInput from "@/reuseable/Input/SearchInput";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {formatAmount} from "@/utils/Format";
import {useSearchForLoaneeInACohortQuery, useViewAllLoaneeQuery} from "@/service/admin/cohort_query";
import Table from "@/reuseable/table/LoanProductTable"
import dynamic from "next/dynamic";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {store, useAppSelector} from "@/redux/store";
import {setOrganizationDetail} from "@/redux/slice/organization/organization";
import { useRouter } from 'next/navigation'

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

const Loanees = dynamic(
    () => Promise.resolve(LoaneesInACohort),
    {ssr: false}
)

const LoaneesInACohort = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const cohortDetails = useAppSelector((state) => state.cohort.selectedCohortInOrganization)
    const cohortName = cohortDetails?.name
    const router = useRouter()

    const handleBackButtonClick = () => {
        store.dispatch(setOrganizationDetail('cohorts'))
        router.push('/organizations/details')
    }


    const size = 300;
    const [page] = useState(0);
    const cohortId = cohortDetails?.id;
    const {data, isLoading} = useViewAllLoaneeQuery({
        cohortId: cohortId,
        pageSize: size,
        pageNumber: page
    },{refetchOnMountOrArgChange: true})

    const {data: searchResults, isLoading: isLoadingSearch} = useSearchForLoaneeInACohortQuery({
            loaneeName: searchTerm,
            cohortId: cohortId
        },
        {skip: !searchTerm || !cohortId})

    console.log('data: ', data)

    const tableHeaderintegrated = [
        {title: "Trainee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => row?.userIdentity?.firstName + " " + row?.userIdentity?.lastName},
        {title: "Initial deposit", sortable: true, id: "initialDeposit", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.initialDeposit))},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountRequested))},
        {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountReceived))},
    ];


    const initial: string = `${cohortName?.at(0)}${cohortName?.at(1)}`


    return (
        <main
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
                    {initial?.toUpperCase()}
                </div>
                <span id={'cohortName'} className={`text-[#212221] ${cabinetGroteskMediumBold.className} text-[28px] mt-auto mb-auto `}>{cohortName}</span>
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
                {searchTerm && searchResults?.data?.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :

                    <Table
                    tableData={!data?.data?.body ? [] : searchTerm ? searchResults?.data : data?.data?.body}
                    tableHeader={tableHeaderintegrated}
                    handleRowClick={()=> {}}
                    staticHeader=""
                    staticColunm="firstName"
                    icon={MdOutlinePerson}
                    sideBarTabName="trainee"
                    optionalRowsPerPage={10}
                    tableCellStyle="h-12"
                    isLoading={isLoading || isLoadingSearch}
                    condition={true}
                    tableHeight={45}
                />
                }
            </div>
        </main>
    );
};

export default Loanees;