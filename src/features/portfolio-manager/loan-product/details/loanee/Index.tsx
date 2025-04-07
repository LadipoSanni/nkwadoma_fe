"use client";
import React, {useEffect, useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {
    useSearchCohortsInAParticularProgramQuery
} from "@/service/admin/program_query";
import {useAppSelector} from "@/redux/store";
import {useGetAllLoaneeInALoanProductQuery} from "@/service/admin/loan_product";


interface loanDetails {
    name?: string;
    status?: number;
    institutes?: string;
}

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | loanDetails;
}

interface viewAllProgramProps {
    programId?: string;
    cohortDescription?: string;
    name?: string;
    tuitionAmount?: number;
    numberOfLoanees?: number;
    loanDetails?: loanDetails
}


type ViewAllLoaneeInLoanProductProps = viewAllProgramProps & TableRowData;

export function Loanees() {
    const loanProductId = useAppSelector(state => (state.selectedLoan.clickedLoanProductId))
    console.log(loanProductId, "this is the iduietyeiru")
    const [programId] = useState(loanProductId);
    const [cohorts, setCohorts] = useState<ViewAllLoaneeInLoanProductProps[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [page] = useState(0);
    const size = 100;

    const {data: cohortsByProgram} = useGetAllLoaneeInALoanProductQuery({
        loanProductId: loanProductId,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true, skip: !programId});

    const {data: searchResults} = useSearchCohortsInAParticularProgramQuery({
        cohortName: searchTerm,
        programId: programId
    }, {skip: !searchTerm || !programId})

    useEffect(() => {
        if (cohortsByProgram?.data) {
            setCohorts(cohortsByProgram.data.body)
        }
    }, [cohortsByProgram])

    useEffect(() => {
        if (searchTerm && searchResults && searchResults.data) {
            const cohorts = searchResults.data;
            setCohorts(cohorts);
        } else if (cohortsByProgram && cohortsByProgram?.data) {
            const cohorts = cohortsByProgram.data.body;
            setCohorts(cohorts);

        }

    }, [searchTerm, searchResults, cohortsByProgram])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const LoanProductLoaneeHeader = [
        {
            title: "Name", sortable: true, id: "name"
        },
        {
            title: "Status", sortable: true, id: "status",
            // selector: (row: ViewAllLoaneeInLoanProductProps) => row.numberOfLoanees
        },
        {
            title: "Institution",
            sortable: true,
            id: "institution",
            // selector: (row: ViewAllLoaneeInLoanProductProps) => formatAmount(row.loanDetails?.totalAmountOutstanding)
        },

    ];
    return (
        <div>
            <div id={`loanProductTab2`} className={'grid gap-4'}>
                <SearchInput id={'loanProductLoaneeSearch'} value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    {searchTerm && cohorts.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='Loanee'/></div> :
                        <Tables
                            tableData={cohorts}
                            tableHeader={LoanProductLoaneeHeader}
                            staticHeader={'Loan product'}
                            staticColunm={'name'}
                            tableHeight={45}
                            icon={MdOutlinePerson}
                            sideBarTabName={"Loan product"}
                            handleRowClick={() => {
                            }}
                            optionalRowsPerPage={10}
                            tableCellStyle={'h-12'}
                            condition={true}
                        />}
                </div>
            </div>
        </div>
    );
}
