'use client'
import React, {useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import Table from '@/reuseable/table/Table';
import {
MdOutlineLibraryBooks,
} from "react-icons/md";
import {repaymentsData, months} from "@/utils/LoanProductMockData";
import { inter } from '@/app/fonts';
interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const Repayment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [hasNextPage] = useState(false)
    const [totalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)


    const filterTable = (value: string) => {
        setSelectedValue(value)
    }
    const tableHeader = [
        { title: 'Name', sortable: true, id: 'name', selector: (row: TableRowData) => row?.name },
        { title: 'Payment date', sortable: true, id: 'paymentDate', selector: (row: TableRowData) =>row?.paymentDate },
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: TableRowData) => row?.AmountPaid },
        { title: 'Payment mode', sortable: true, id: 'paymentMode', selector: (row: TableRowData) => <div>{row?.paymentMode === 'Bank transfer' ? <div className={` ${inter.className} bg-[#EEF5FF] text-[14px] text-[#142854] rounded-full w-fit h-fit py-1 px-2 `}>{row?.paymentMode}</div> : <div className={` ${inter.className} bg-[#FEF6E8] text-[14px] text-[#66440A] rounded-full w-fit h-fit py-1 px-2`}>{row?.paymentMode}</div>}</div> },
        { title: 'Total amount repaid', sortable: true, id: 'totalAmountRepaid', selector: (row: TableRowData) =>row?.totalAmountRepaid },
        { title: 'Amount outstanding', sortable: true, id: 'amountOutstanding', selector: (row: TableRowData) => row?.amountOutstanding },
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        console.log(ID)
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
                {repaymentsData && repaymentsData?.length > 0  ?<CustomSelect
                    id="filterMonth"
                    value={selectedValue}
                    onChange={(value) => filterTable(value)}
                    selectContent={months}
                    placeHolder="Month"
                    triggerId="marketplaceTrigger"
                    className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                />: null}
            </div>

            <div>
                <Table
                    tableData={repaymentsData}
                    tableHeader={tableHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={54}
                    sx='cursor-pointer'
                    tableCellStyle={'h-12'}
                    // optionalFilterName='endownment'
                    condition={true}
                    sideBarTabName='Repayment'
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