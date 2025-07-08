"use client";
import React, {useEffect, useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {formatAmount} from "@/utils/Format";
import {useAppSelector} from "@/redux/store";
import CreateCohortInProgram from "@/components/program/create-cohort/Index";
import {useGetAllCohortByAParticularProgramQuery} from "@/service/admin/cohort_query";
import { store } from '@/redux/store'
import {setcohortId} from '@/redux/slice/create/cohortSlice'
import { useRouter } from 'next/navigation'
import { setcohortOrProgramRoute } from '@/redux/slice/program/programSlice';
import { useSearchCohortByOrganisationQuery } from '@/service/admin/cohort_query'
import Table from '@/reuseable/table/Table';
import { useDebounce } from '@/hooks/useDebounce';
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";

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
    const [searchTerm, setSearchTerm] = useState('');
    const [page,setPageNumber] = useState(0);
    const size = 10;
     const router = useRouter()
    const [totalPage,setTotalPage] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)

    const [pageNumber,setSearchPageNumber] = useState(0)
    const [searchHasasNextPage,setSearchNextPage] = useState(false)

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);
    
    const {data, isLoading} = useGetAllCohortByAParticularProgramQuery({
        programId: programId,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true,skip: !programId});

    const {data: searchResults, isLoading: isloading} = useSearchCohortByOrganisationQuery({
        cohortName: debouncedSearchTerm,
        programId: programId,
        pageSize: size,
        pageNumber: pageNumber
    }, {skip: !debouncedSearchTerm || !programId})


    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return data?.data?.body;
    }

    useEffect(() => {
        if (debouncedSearchTerm && searchResults && searchResults.data) {
            setSearchNextPage(searchResults?.data?.hasNextPage)
            setTotalPage(searchResults?.data?.totalPages)
            setSearchPageNumber(searchResults?.data?.pageNumber)
        } else if (!debouncedSearchTerm && data && data?.data) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }

    }, [debouncedSearchTerm, searchResults, data])


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (row: TableRowData) => {
      store.dispatch(setcohortId(String(row.id)))
      store.dispatch(setcohortOrProgramRoute("program"))
        store.dispatch(setCurrentNavbarItem('Cohort'))
      router.push('/cohort/cohort-details')
    }

    const ProgramHeader = [ 
        {title: "Cohort", sortable: true, id: "name"},
        {
            title: "No. of loanees", sortable: true, id: "noOfTrainees",
            selector: (row: ViewAllProgramProps) => row.numberOfLoanees
        },

        {
            title: "Tuition",
            sortable: true,
            id: "tuitionAmount",
            selector: (row: ViewAllProgramProps) => formatAmount(row.tuitionAmount)
        },
        {
            title: "Amount requested",
            sortable: true,
            id: "amountRequested",
            selector: (row: ViewAllProgramProps) => formatAmount(row.loanDetails?.totalAmountRequested)
        },
        {
            title: "Amount received",
            sortable: true,
            id: "amountReceived",
            selector: (row: ViewAllProgramProps) => formatAmount(row.loanDetails?.totalAmountRecieved)
        },
        {
            title: "Amount outstanding",
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
                        {!isTyping && debouncedSearchTerm && searchResults?.data?.body?.length === 0? <div><SearchEmptyState icon={MdSearch} name='Cohort'/></div> : <Table
                            tableData={getTableData()}
                            tableHeader={ProgramHeader}
                            staticHeader={'cohort'}
                            staticColunm={'name'}
                            tableHeight={45}
                            icon={MdOutlinePerson}
                            sideBarTabName={"cohort"}
                            handleRowClick={handleRowClick}
                            tableCellStyle={'h-12'}
                            condition={true}
                            sx='cursor-pointer'
                            isLoading={isLoading || isloading}
                            hasNextPage={searchTerm? searchHasasNextPage : hasNextPage}
                            pageNumber={searchTerm? pageNumber : page}
                            setPageNumber={searchTerm? setSearchPageNumber : setPageNumber}
                            totalPages={totalPage}
                        />}
                    </div>
                </div>
            </div>
        );
}

export default ProgramCohortDetails;