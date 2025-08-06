'use client'
import React, {useState} from 'react';
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";
import {MdOutlinePersonOutline} from "react-icons/md";
import Table from '@/reuseable/table/Table';
// import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount, formateDigits} from "@/utils/Format";
import {loaneeMockData} from "@/utils/LoanProductMockData";
import {useRouter} from "next/navigation";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const ViewAllLoaneeOverview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasNextPage] = useState(false)
    const [totalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    // const [pageSize ] = useState(10)

    const router = useRouter()
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('searchTerm', searchTerm);
        setSearchTerm(event.target.value);
    };

    const tableHeader = [
        { title: 'Name', sortable: true, id: 'name', selector: (row: TableRowData) => row.firstName?.toString()  },
        { title: 'Email address', sortable: true, id: 'emailAddress', selector: (row: TableRowData) =><div>{row?.emailAddress}</div>},
        { title: 'No. of loans', sortable: true, id: 'noOfLoans', selector: (row: TableRowData) => <div className=''>{formateDigits(Number(row.noOfLoans))}</div> },
        { title: 'Historical dept', sortable: true, id: 'historicalDept', selector: (row: TableRowData) => <div className={`  `}>{row.historicalDept}</div>},
        { title: 'Total outstanding', sortable: true, id: 'totalOutstanding', selector: (row: TableRowData) =><div className=''>{formatAmount(row.totalOutstanding)}</div> },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        console.log(ID)
        router.push('/loanees/loans')
    };
    return (
        <div
            id={'viewAllLoaneeOverviewContainer'}
            data-testid={'viewAllLoaneeOverviewContainer'}
            className={`w-full h-full grid gap-10 px-4 py-6   `}
        >
            <div
                id={'viewAllLoaneeTotalOverviewContainer'}
                data-testid={'viewAllLoaneeTotalOverviewContainer'}
                className={` w-full h-full flex gap-4   ${styles.overviewCard}   `}
            >
                <Details isLoading={false} sx={`  w-[20em] md:w-[100%]  `} name={'No. of loanees'} valueType={'digit'}  id={'totalNumberOfLoanees'} showAsWholeNumber={false}  value={'0'}/>
                <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'historicalDept'} showAsWholeNumber={false}    name={'Historical debt'} value={''} valueType={'currency'}  />
                <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'totalOutstanding'} showAsWholeNumber={false}    name={'Total outstanding'} value={''} valueType={'currency'}  />
            </div>
            <div
                id={'tableAndSearchContainer'}
                data-testid={'tableAndSearchContainer'}
                className={`grid gap-4 `}

            >
                <SearchInput
                    id={'searchField'}
                    data-testid={'searchField'}
                    value={'Search by name'}
                    onChange={handleSearchChange}
                />

                <Table
                    tableData={loaneeMockData}
                    tableHeader={tableHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={40}
                    tableCellStyle={'h-12'}
                    condition={true}
                    searchEmptyState={false}
                    // searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchData?.data?.body?.length < 1 }
                    sideBarTabName={'loanees'}
                    icon={MdOutlinePersonOutline}
                    staticHeader={"Name"}
                    staticColunm={'name'}
                    hasNextPage={hasNextPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalPages={totalPage}
                    isLoading={false}
                    // isLoading={isLoading|| isFetching|| isLoadinFetchedData || isFetchingSearchedData}
                />
            </div>
        </div>
    );
};

export default ViewAllLoaneeOverview;