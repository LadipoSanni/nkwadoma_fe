'use client'
import React, {ReactNode, useEffect, useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import Table from '@/reuseable/table/Table';
import {
MdOutlineLibraryBooks,
} from "react-icons/md";
import {months} from "@/utils/LoanProductMockData";
import { inter } from '@/app/fonts';
import { useViewAllRepaymentHistoryQuery,useGetRepaymentHistoryYearRangeQuery, useSearchAllRepaymentHistoryQuery } from '@/service/admin/overview';
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import DropdownFilter from "@/reuseable/Dropdown/DropdownFilter";
import { IoMdClose } from "react-icons/io";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const Repayment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState<string | number>("");
    const [selectedMonth, setSelectedMonth] = useState<string | number>("");
    const [selectedIndex, setSelectedIndex] = useState<number| string>('');
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSize ] = useState(10)
    const [year, setYear] = useState<number | string>('');

    const props =  {
        pageSize: pageSize,
        pageNumber: pageNumber,
        month:  selectedIndex ,
        year:  year ,
    }
    const {data, isFetching , isLoading} = useViewAllRepaymentHistoryQuery(props)
    const searchProps = {
        pageSize: pageSize,
        pageNumber: pageNumber,
        month: selectedIndex,
        year: selectedYear,
        searchTerm: searchTerm,
    }
    const  {data:getRepaymentYearRange} = useGetRepaymentHistoryYearRangeQuery({})
    const {data:searchData, isLoading:isLoadinFetchedData, isFetching:isFetchingSearchedData } = useSearchAllRepaymentHistoryQuery(searchProps,{skip: !searchTerm})


    const setMonthItem = (value: string | number) => {
        if (value === selectedMonth){
            setSelectedMonth('')
        }else {
            setSelectedMonth(value)
        }
    }


    const setYearItem = (value: string| number) => {
        if (value === selectedYear){
            setSelectedYear('')
        }else{
            setSelectedYear(value)
        }
    }
    useEffect(() => {
        if(searchTerm && searchData && searchData?.data){
            setNextPage(searchData?.data?.hasNextPage)
            setTotalPage(searchData?.data?.totalPages)
            setPageNumber(searchData?.data?.pageNumber)
        }
        else if(!searchTerm && data?.data?.body) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
    },[searchTerm,data])

    const getModeOfPayment = (mode?: string |ReactNode) => {
        switch (mode) {
            case 'TRANSFER' :
                return <span className={` ${inter.className} bg-[#EEF5FF] text-[14px] text-[#142854] rounded-full w-fit h-fit py-1 px-2 `} >Bank transfer</span>
            case 'CASH':
                return <span className={` ${inter.className}  bg-[#FEF6E8] text-[14px] text-[#66440A]rounded-full w-fit h-fit py-1 px-2 `} >Cash</span>
            case 'USSD':
               return <span className={` ${inter.className} bg-[#EEF5FF] text-[14px] text-[#142854] rounded-full w-fit h-fit py-1 px-2`}>Ussd</span>
            case 'BANK_DRAFT':
                return <span className={`${inter.className}  bg-[#FEF6E8] text-[14px] text-[#66440A] rounded-full w-fit h-fit py-1 px-2  `}>Bank draft</span>

        }
    }


    const tableHeader = [
        { title: 'Name', sortable: true, id: 'name', selector: (row: TableRowData) => <div className='flex  gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div>  },
        { title: 'Payment date', sortable: true, id: 'paymentDate', selector: (row: TableRowData) =><div>{dayjs(row.paymentDateTime?.toString()).format('MMM D, YYYY')}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountPaid)}</div> },
        { title: 'Payment mode', sortable: true, id: 'modeOfPayment', selector: (row: TableRowData) => <div className={`  `}>{getModeOfPayment(row.modeOfPayment)}</div>},
        { title: 'Total amount repaid', sortable: true, id: 'totalAmountRepaid', selector: (row: TableRowData) =><div className=''>{formatAmount(row.totalAmountRepaid)}</div> },
        { title: 'Amount outstanding', sortable: true, id: 'amountOutstanding', selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountOustanding)}</div> },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        console.log(ID)
    };

    const  getYea = (earlyYear: number,currentYear: number) => {
        if (!currentYear) {
            const aa : number[] = [earlyYear]
            const today = new Date().getFullYear();
            for (const element of aa) {
                if (element < today){
                    aa.push(element + 1 )
                }
            }
            return aa;
        }else if (!earlyYear) {
            const currentYear = new Date().getFullYear();
            return [currentYear]
        }else {
            const aa : number[] = [earlyYear]
            for (const element of aa) {
                if (element < currentYear){
                    aa.push(element + 1 )
                }
            }
            return aa;
        }
    }

    const handleFilterYear = () => {
        setYear(selectedYear)
    }
    const clearMonthFilter = () => {
        setSelectedMonth('')
        setSelectedIndex(0)
    }
    const filterMonth = () => {
        for (let i = 0; i < months.length; i++) {
            if (months[i] === selectedMonth) {
                setSelectedIndex(i + 1)
            }
        }
    }
    const clearYearFilter = () => {
        setSelectedYear('')
        setYear('')
    }

    const getYears = getYea(getRepaymentYearRange?.data?.firstYear, getRepaymentYearRange?.data?.lastYear)


    return (
        <main
            id={'repaymentComponent'}
            data-testid={'repaymentComponent'}
            className={` w-full grid gap-4 h-full px-2 py-6 `}
        >
            <div id="searchDiv" className="px-2 flex md:flex-row flex-col gap-3">
                <SearchInput
                    id="searchRepayment"
                    data-testid={'searchRepayment'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
                />
                   <div className={` flex  bg-red-200 px-0   md:flex lg:flex gap-2 h-fit md:w-fit lg:w-fit w-full  `}>
                       <DropdownFilter
                           title={'Filter by month'}
                           selectedItem={selectedMonth}
                           handleFilter={filterMonth}
                           items={months}
                           setSelectItem={setMonthItem}
                           clearFilter={clearMonthFilter}
                           placeholder={'Month'}
                           sx={'grid grid-cols-3'}
                       />

                       <DropdownFilter
                           title={'Filter by year'}
                           selectedItem={selectedYear}
                           handleFilter={handleFilterYear}
                           items={getYears}
                           setSelectItem={setYearItem}
                           clearFilter={clearYearFilter}
                           placeholder={'Year'}
                           sx={'grid grid-cols-5'}
                       />
                   </div>
            </div>
            <div>
                { selectedMonth  && data?.data?.body?.length === 0 ?
                  <div>
                      <div className={` mb-2 flex gap-2 `}>
                          {selectedMonth &&<div
                              className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedMonth}
                              <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearMonthFilter} color={'#212221'}/></div>}
                          {selectedYear && <div
                              className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedYear}
                              <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearYearFilter} color={'#212221'}/></div>}
                      </div>
                      <TableEmptyState
                          icon={<MagnifyingGlassIcon/>}
                          name={'filtered dates repayment'}
                          className={''}
                          condition={true}
                          isSearch={true}
                      />
                  </div>
                     :  selectedYear && data?.data?.body?.length === 0 ?
                        <div>
                            <div className={` mb-2 flex gap-2 `}>
                                {selectedMonth &&<div
                                    className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedMonth}
                                    <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearMonthFilter} color={'#212221'}/></div>}
                                {selectedYear && <div
                                    className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedYear}
                                    <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearYearFilter} color={'#212221'}/></div>}
                            </div>
                            <TableEmptyState
                                icon={<MagnifyingGlassIcon/>}
                                name={'filtered dates repayment'}
                                className={''}
                                condition={true}
                                isSearch={true}
                            />
                        </div>
                    :

                  <div>
                      <div className={` mb-2 flex gap-2 `}>
                          {selectedMonth &&<div
                              className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedMonth}
                              <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearMonthFilter} color={'#212221'}/></div>}
                          {selectedYear && <div
                              className={` flex  w-fit h-fit rounded-full gap-1 text-[13px]  py-1 px-2 bg-[#F6F6F6] text-black `}>{selectedYear}
                              <IoMdClose className={'mt-auto mb-auto text-[13px]  '} onClick={clearYearFilter} color={'#212221'}/></div>}
                      </div>
                      <Table
                          tableData={searchTerm?.length > 0 ? searchData?.data?.body : data?.data?.body}
                          // tableData={repaymentsData}
                          tableHeader={tableHeader}
                          handleRowClick={handleRowClick}
                          tableHeight={54}
                          sx='cursor-pointer'
                          tableCellStyle={'h-12'}
                          // optionalFilterName='endownment'
                          condition={true}
                          searchEmptyState={searchTerm?.length > 0 && searchData?.data?.body?.length < 1 }
                          sideBarTabName={'repayment'}
                          icon={MdOutlineLibraryBooks}
                          staticHeader={"Name"}
                          staticColunm={'name'}
                          hasNextPage={hasNextPage}
                          pageNumber={pageNumber}
                          setPageNumber={setPageNumber}
                          totalPages={totalPage}
                          isLoading={isLoading|| isFetching|| isLoadinFetchedData || isFetchingSearchedData}
                      />
                  </div>
            }
            </div>
        </main>
    );
};

export default Repayment;