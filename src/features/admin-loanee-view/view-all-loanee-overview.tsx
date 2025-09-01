'use client'
import React, {useEffect, useState} from 'react';
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";
import {MdOutlinePersonOutline} from "react-icons/md";
import Table from '@/reuseable/table/Table';
// import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount, formateDigits} from "@/utils/Format";
import {useRouter} from "next/navigation";
import {
    useSearchLoaneeByAdminsQuery,
    useViewAllLoaneeByAdminsQuery,
    useViewAllLoansTotalCountsByAdminsQuery
} from "@/service/users/Loanee_query";
import {store} from "@/redux/store";
import {setSelectedLoaneeId,setSelectedLoaneeFirstName ,setSelectedLoaneeLastName} from "@/redux/slice/loan/loanees";
interface TableRowType {
    "loaneeId": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "historicalDebt": number,
    "totalAmountOutstanding": number,
    "numberOfLoans": number
}
interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const ViewAllLoaneeOverview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasNextPage, setNextPage ] = useState(false)
    const [totalPage,setTotalPage] = useState<number>(0)
    const [pageSize] = useState<number>(10)
    const [pageNumber,setPageNumber] = useState<number>(0)

    const name = searchTerm ? searchTerm : undefined
    const {data, isLoading, isFetching } = useViewAllLoaneeByAdminsQuery({pageSize, pageNumber})
    const {data: searchData, isLoading:searchDataLoading, isFetching: searchDataIsFetching} = useSearchLoaneeByAdminsQuery({pageSize, name, pageNumber}, {skip: !searchTerm})
    const {data: loanCounts, isLoading: isLoadingLoanCounts, isFetching: isFetchingCounts} = useViewAllLoansTotalCountsByAdminsQuery(undefined)

    useEffect(() => {
        if(searchTerm) {
            setNextPage(searchData?.data?.hasNextPage)
            setTotalPage(searchData?.data?.totalPages)
            setPageNumber(searchData?.data?.pageNumber)
        }else{
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber ? data?.data?.pageNumber : 0)
        }

    },[data, data?.data, searchData])

    const router = useRouter()
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const tableHeader = [
        { title: 'Name', sortable: true, id: 'name', selector: (row: TableRowData) => <div>{row.firstName?.toString() } {row.lastName?.toString()}</div>  },
        { title: 'Email address', sortable: true, id: 'emailAddress', selector: (row: TableRowData) =><div>{row?.email}</div>},
        { title: 'No. of loans', sortable: true, id: 'noOfLoans', selector: (row: TableRowData) => <div className=''>{formateDigits(Number(row.numberOfLoans))}</div> },
        { title: 'Historical debt', sortable: true, id: 'historicalDebt', selector: (row: TableRowData) => <div className={`  `}>{formateDigits(Number(row.historicalDebt))}</div>},
        { title: 'Total outstanding', sortable: true, id: 'totalOutstanding', selector: (row: TableRowData) =><div className=''>{formatAmount(row.totalAmountOutstanding)}</div> },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        if (ID && typeof ID ===  "object" ){
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const row : TableRowType = ID;

            store.dispatch(setSelectedLoaneeId(String(row.loaneeId)))
            store.dispatch(setSelectedLoaneeLastName(String(row.lastName)))
            store.dispatch(setSelectedLoaneeFirstName(String(row.firstName)))
            // store.dispatch(setSelectedLoaneeFullName(`${String(row.firstName)}` + ' ' + `${String(row.lastName)}`))
            router.push('/loans')
        }

    };
    return (
        <div
            id={'viewAllLoaneeOverviewContainer'}
            data-testid={'viewAllLoaneeOverviewContainer'}
            className={`w-full h-full  grid content-between gap-8  `}
        >
            <div
                id={'viewAllLoaneeTotalOverviewContainer'}
                data-testid={'viewAllLoaneeTotalOverviewContainer'}
                className={` w-full h-full flex gap-8   ${styles.overviewCard}   `}
            >
                <Details isLoading={  isLoadingLoanCounts || isFetchingCounts} sx={`  w-[20em] md:w-[100%]  `} name={'No. of loanees'} valueType={'digit'}  id={'totalNumberOfLoanees'} showAsWholeNumber={false}  value={loanCounts?.data ?  loanCounts?.data?.numberOfLoanee :'0'}/>
                <Details isLoading={ isLoadingLoanCounts || isFetchingCounts} sx={` w-[20em] md:w-[100%] `} id={'historicalDept'} showAsWholeNumber={false}    name={'Historical debt'} value={loanCounts?.data ?  loanCounts?.data?.totalAmountReceived : ''} valueType={'currency'}  />
                <Details isLoading={ isLoadingLoanCounts || isFetchingCounts} sx={` w-[20em] md:w-[100%] `} id={'totalOutstanding'} showAsWholeNumber={false}    name={'Total outstanding'} value={loanCounts?.data ?  loanCounts?.data?.totalAmountOutstanding : ''} valueType={'currency'}  />
                <Details isLoading={isLoadingLoanCounts || isFetchingCounts} sx={` w-[20em] md:w-[100%] `} id={'totalAmountRepaid'} showAsWholeNumber={false}    name={'Total amount repaid'} value={loanCounts?.data ?  loanCounts?.data?.totalAmountRepaid :''} valueType={'currency'}  />

            </div>

            <SearchInput
                id={'searchField'}
                data-testid={'searchField'}
                value={searchTerm}
                placeholder={'Search by name'}
                onChange={handleSearchChange}
            />
            <div
                id={'tableAndSearchContainer'}
                data-testid={'tableAndSearchContainer'}
                className={`grid  max-h-[50vh] overflow-y-auto `}

            >


                <Table
                    tableData={searchTerm ? searchData?.data?.body : data?.data?.body }
                    tableHeader={tableHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={40}
                    tableCellStyle={'h-12'}
                    condition={true}
                    searchEmptyState={false}
                    sx={'cursor-pointer'}
                    // searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchData?.data?.body?.length < 1 }
                    sideBarTabName={'loanees'}
                    icon={MdOutlinePersonOutline}
                    staticHeader={"Name"}
                    staticColunm={'name'}
                    hasNextPage={hasNextPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalPages={totalPage}
                    isLoading={isLoading || isFetching || searchDataLoading || searchDataIsFetching}
                />
            </div>
        </div>
    );
};

export default ViewAllLoaneeOverview;