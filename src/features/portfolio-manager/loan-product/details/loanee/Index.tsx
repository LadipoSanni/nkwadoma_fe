"use client";
import React, {useState,useEffect} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {useAppSelector} from "@/redux/store";
import {useGetAllLoaneeInALoanProductQuery, useSearchLoaneesInALoanProductQuery} from "@/service/admin/loan_product";
import { useDebounce } from '@/hooks/useDebounce';
import Table from '@/reuseable/table/Table';
import { formatAmount,formatToTwoDecimals } from '@/utils/Format';
import styles from "@/components/super-admin/staff/index.module.css"

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode ;
}


export function Loanees() {
    const id = useAppSelector(state => (state?.loanProduct?.loanProductId))
    const [loanProductId] = useState(id);
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
    }, [debouncedSearchTerm, searchResults, allLoanee]);

    const getTableData = () => {
        if (!allLoanee?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return allLoanee?.data?.body;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const getLoanStatusDisplay = (row: string): string => {
        if (!row) return "Non performing";
        switch (row) {
          case "NON_PERFORMING":
            return "Non performing";
          case "PERFORMING":
            return "Performing";
          case "IN_MORATORIUM":
            return "In moratorium";
          default:
            return row; 
        }
      };


    const LoanProductLoaneeHeader = [
        {title: "Name", sortable: true, id: "name",
            selector: (row: TableRowData) =>
                `${(row.firstName as string).charAt(0).toUpperCase()}${(row.firstName as string).slice(1).toLowerCase()} ${(row.lastName as string).charAt(0).toUpperCase()}${(row.lastName as string).slice(1).toLowerCase()}`
        },
        {title: "Organization", sortable: true, id: "instituteName", selector: (row: TableRowData) => row.instituteName},
        {title: <div className=''>Loan status</div>, sortable: true, id: "performance", selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3 truncate  rounded-xl ${row.performance  === "PERFORMING" ? "text-[#063F1A] bg-[#D0D5DD]" : row.performance  === "IN_MORATORIUM" ?  "bg-[#FEF6E8] text-[#66440A]" : "text-[#C1231D] bg-[#FBE9E9]" } `}>
                {getLoanStatusDisplay(row.performance as string) }
            </span>
        },
        {title: <div className='md:relative left-6 z-50'>Interest earned(%)</div>, sortable: true, id: "interestEarned", selector: (row: TableRowData) => <div className='truncate md:relative left-6 z-10'>{formatToTwoDecimals(row?.interestEarned)}</div>},
        {title: "Amount disbursed", sortable: true, id: "amountDisbursed", selector: (row: TableRowData) => formatAmount(row?.amountDisbursed)},
        {title: "Loan outstanding", sortable: true, id: "loanOutstanding", selector: (row: TableRowData) => formatAmount(row?.loanOutstanding)},

    ];
    return (
        <div 
        className={` max-h-[63vh] ${styles.container}`}
        style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',  
              }}
        >
            <div id={`loanProductTab2`} className={'grid gap-4 mt-5'}>
                <SearchInput id={'loanProductLoaneeSearch'} value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    {!isTyping && debouncedSearchTerm && searchResults?.data.body.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :
                        <Table
                            tableData={getTableData()}
                            tableHeader={LoanProductLoaneeHeader}
                            staticHeader={'loanee'}
                            staticColunm={'name'}
                            tableHeight={44}
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
