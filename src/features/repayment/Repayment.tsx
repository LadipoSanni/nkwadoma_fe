'use client'
import React, {useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import {MdOutlinePayments} from "react-icons/md";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import dayjs from "dayjs";
import {formatAmount} from "@/utils/Format";
import Table from '@/reuseable/table/Table';
import {
MdOutlineLibraryBooks,
} from "react-icons/md";
import {repaymentsData} from "@/utils/LoanProductMockData";
interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const Repayment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)

    const filterTable = (type: string) => {
        // if (type === 'All'){
        //     setSelectedValue('')
        //     setIsFiltered(true)
        // }else {
        //     setSelectedValue(type)
        //     setIsFiltered(true)
        // }
    }
    const tableHeader = [
        // <div className='flex  gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div> <div>{dayjs(row.cohortStartDate?.toString()).format('MMM D, YYYY')}</div>
        { title: 'Name', sortable: true, id: 'name', selector: (row: TableRowData) => row?.name },
        { title: 'Payment date', sortable: true, id: 'paymentDate', selector: (row: TableRowData) =>row?.paymentDate },
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: TableRowData) => row?.AmountPaid },
        { title: 'Payment mode', sortable: true, id: 'paymentMode', selector: (row: TableRowData) => row?.paymentMode },
        { title: 'Total amount repaid', sortable: true, id: 'totalAmountRepaid', selector: (row: TableRowData) =>row?.totalAmountRepaid },
        { title: 'Amount outstanding', sortable: true, id: 'amountOutstanding', selector: (row: TableRowData) => row?.amountOutstanding },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        // router.push(`/loan-request-details?id=${ID}`);
    };

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
                <CustomSelect
                    id="filterMonth"
                    value={selectedValue}
                    onChange={(value) => filterTable(value)}
                    selectContent={["Commercial", "Endowment", 'All']}
                    placeHolder="Type"
                    triggerId="marketplaceTrigger"
                    className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                />
            </div>

            <div>
                <Table
                    tableData={repaymentsData}
                    tableHeader={tableHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={54}
                    sx='cursor-pointer'
                    tableCellStyle={'h-12'}
                    optionalFilterName='endownment'
                    condition={true}
                    sideBarTabName='fund'
                    icon={MdOutlineLibraryBooks}
                    staticHeader={"Name"}
                    staticColunm={'name'}
                    hasNextPage={hasNextPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalPages={totalPage}
                    isLoading={false}
                />
            </div>

            
        </main>
    );
};

export default Repayment;