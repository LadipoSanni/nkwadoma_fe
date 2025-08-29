"use client";
import React, {useState,useEffect} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {useAppSelector} from "@/redux/store";
import {useGetAllLoaneeInALoanProductQuery, useSearchLoaneesInALoanProductQuery} from "@/service/admin/loan_product";
import { useDebounce } from '@/hooks/useDebounce';
import Table from '@/reuseable/table/Table';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode ;
}

// interface loanDetails extends TableRowData{
//     firstName: string;
//     lastName: string;
//     performance: string;
//     instituteName: string;
// }

export function Loanees() {
    const id = useAppSelector(state => (state?.loanProduct?.loanProductId))
    const [loanProductId] = useState(id);
    // const [loanees, setLoanees] = useState<loanDetails[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [page,setPageNumber] = useState(0);
    const [pageSearchNumber, setSearchPageNumber] = useState(0)
    const [totalPage,setTotalPage] = useState(0)
     const [hasNextPage,setNextPage] = useState(false)
     const [searchHasasNextPage,setSearchNextPage] = useState(false)
    const size = 10;

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const {data: allLoanee, isLoading:allLoaneeIsLoading,isFetching} = useGetAllLoaneeInALoanProductQuery({
        loanProductId: id,
        pageSize: size,
        pageNumber: page
    }, { skip: !loanProductId});

    const {data: searchResults, isLoading,isFetching: isfetching} = useSearchLoaneesInALoanProductQuery({
        loanProductId: id,
        name: debouncedSearchTerm,
        pageSize: size,
        pageNumber: pageSearchNumber
    }, {skip: !debouncedSearchTerm|| !loanProductId})

    useEffect(() => {
        if(!debouncedSearchTerm){
            setSearchPageNumber(0)
        }
    },[debouncedSearchTerm])

    useEffect(() => {
        if (debouncedSearchTerm && searchResults?.data?.body) {
            setSearchNextPage(searchResults?.data?.hasNextPage)
            setTotalPage(searchResults?.data?.totalPages)
            setSearchPageNumber(searchResults?.data?.pageNumber)
        } else if (!debouncedSearchTerm && allLoanee?.data?.body) {
            setNextPage( allLoanee?.data?.hasNextPage)
            setTotalPage( allLoanee?.data?.totalPages)
            setPageNumber( allLoanee?.data?.pageNumber)
        }
    }, [debouncedSearchTerm, searchResults?.data?.body, allLoanee?.data?.body]);

    const getTableData = () => {
        if (!allLoanee?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return allLoanee?.data?.body;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const LoanProductLoaneeHeader = [
        {title: "Name", sortable: true, id: "name",
            selector: (row: TableRowData) =>
                `${(row.firstName as string).charAt(0).toUpperCase()}${(row.firstName as string).slice(1).toLowerCase()} ${(row.lastName as string).charAt(0).toUpperCase()}${(row.lastName as string).slice(1).toLowerCase()}`
        },
        {title: <div className='md:relative left-3'>Status</div>, sortable: true, id: "performance", selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3   rounded-xl ${row.performance  === "PERFORMANCE" ? "text-success600 bg-success50" : "text-error600 bg-error50"} `}>
                {row.performance ?? "No record"}
            </span>
        },
        {title: "Organization", sortable: true, id: "instituteName", selector: (row: TableRowData) => row.instituteName},

    ];
    return (
        <div>
            <div id={`loanProductTab2`} className={'grid gap-4'}>
                <SearchInput id={'loanProductLoaneeSearch'} value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    {!isTyping && debouncedSearchTerm && searchResults?.data.body.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :
                        <Table
                            tableData={getTableData()}
                            tableHeader={LoanProductLoaneeHeader}
                            staticHeader={'loanee'}
                            staticColunm={'name'}
                            tableHeight={53}
                            icon={MdOutlinePerson}
                            sideBarTabName={"loanee"}
                            handleRowClick={() => {
                            }}
                            tableCellStyle={'h-12'}
                            condition={true}
                            isLoading={isLoading || allLoaneeIsLoading || isFetching || isfetching}
                            hasNextPage={searchTerm? searchHasasNextPage : hasNextPage}
                            pageNumber={searchTerm? pageSearchNumber : page}
                            setPageNumber={searchTerm? setSearchPageNumber : setPageNumber}
                            totalPages={totalPage}
                        />}
                </div>
            </div>
        </div>
    );
}
