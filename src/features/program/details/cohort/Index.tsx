"use client";
import React, {useEffect, useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {formatAmount} from "@/utils/Format";
import {
    useGetAllCohortByAParticularProgramQuery,
    useSearchCohortsInAParticularProgramQuery
} from "@/service/admin/program_query";
import {useAppSelector} from "@/redux/store";
import CreateCohortInProgram from "@/components/program/create-cohort/Index";



interface loanDetails {
    totalAmountRepaid?: number;
    totalAmountDisbursed?: number;
    totalAmountOutstanding?: number;
    totalAmountRecieved?: number;
    totalAmountRequested?: number;
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


type ViewAllProgramProps = viewAllProgramProps & TableRowData;
const ProgramCohortDetails= ()=> {
    const id = useAppSelector(state => (state.program.currentProgramId))
    const [programId] = useState(id);
    const [cohorts, setCohorts] = useState<ViewAllProgramProps[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [page] = useState(0);
    const size = 100;

    const {data: cohortsByProgram} = useGetAllCohortByAParticularProgramQuery({
        programId: programId,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true,skip: !programId});

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
    const ProgramHeader = [
        {title: "Cohort", sortable: true, id: "name"},
        {
            title: "No of loanees", sortable: true, id: "noOfTrainees",
            selector: (row: ViewAllProgramProps) => row.numberOfLoanees
        },

        {
            title: "Tuition",
            sortable: true,
            id: "tuitionAmount",
            selector: (row: ViewAllProgramProps) => formatAmount(row.tuitionAmount)
        },
        {
            title: "Amount Requested",
            sortable: true,
            id: "amountRequested",
            selector: (row: ViewAllProgramProps) => formatAmount(row.loanDetails?.totalAmountRequested)
        },
        {
            title: "Amount Received",
            sortable: true,
            id: "amountReceived",
            selector: (row: ViewAllProgramProps) => formatAmount(row.loanDetails?.totalAmountRecieved)
        },
        {
            title: "Amount Outstanding",
            sortable: true,
            id: "totalAmountOutstanding",
            selector: (row: ViewAllProgramProps) => formatAmount(row.loanDetails?.totalAmountOutstanding)
        },

    ];
        return (
            <div>
                <div id={`tab2`} className={'mt-4 grid gap-7'}>
                    <div className={`md:mt-0 mt-4 flex md:flex-row flex-col justify-between`}>
                        <div className={``}>
                            <SearchInput id={'programCohortSearch'} value={searchTerm} onChange={handleSearchChange}/>
                        </div>
                        <div className=''>
                            <CreateCohortInProgram  triggerButtonStyle={`w-full`}/>
                        </div>
                    </div>
                    <div>
                        {searchTerm && cohorts.length === 0? <div><SearchEmptyState icon={MdSearch} name='Cohort'/></div> : <Tables
                            tableData={cohorts}
                            tableHeader={ProgramHeader}
                            staticHeader={'Cohort'}
                            staticColunm={'name'}
                            tableHeight={45}
                            icon={MdOutlinePerson}
                            sideBarTabName={"Cohort"}
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

export default ProgramCohortDetails;