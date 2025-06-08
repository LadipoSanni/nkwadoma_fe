'use client'
import React, {ReactNode, useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import Table from '@/reuseable/table/Table';
import {
MdOutlineLibraryBooks,
} from "react-icons/md";
import {
    repaymentsData,
    months, years} from "@/utils/LoanProductMockData";
import { inter } from '@/app/fonts';
import { useViewAllRepaymentHistoryQuery } from '@/service/admin/overview';
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
const Repayment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [hasNextPage] = useState(false)
    const [totalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSize] = useState(10)
    const [click, setClicked] = React.useState<object| ReactNode>('')

    const props =  {
        pageSize: pageSize,
            pageNumber: pageNumber,
    }
    const {data} = useViewAllRepaymentHistoryQuery(props)


    const filterTable = (value: string) => {
        console.log('click', click) // to fixed unuse variable
        setSelectedValue(value)
    }
    const getModeOfPayment = (mode?: string |ReactNode) => {
        switch (mode) {
            case 'TRANSFER' :
                return <span className={` ${inter.className} bg-[#EEF5FF] text-[14px] text-[#142854] rounded-full w-fit h-fit py-1 px-2 `} >Bank transfer</span>
                // break;
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
        setClicked(ID)
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
                {repaymentsData && repaymentsData?.length > 0  ?
                   <div className={` grid grid-cols-2 md:flex lg:flex gap-4 h-fit md:w-fit lg:w-fit w-full  `}>
                       <CustomSelect
                           id="filterMonth"
                           value={selectedValue}
                           onChange={(value) => filterTable(value)}
                           selectContent={months}
                           placeHolder="Month"
                           triggerId="monthFilterTrigger"
                           className="h-11  w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                       />
                       <CustomSelect
                           id="filterByYear"
                           value={selectedValue}
                           onChange={(value) => filterTable(value)}
                           selectContent={years}
                           placeHolder="year"
                           triggerId="yearFilterTrigger"
                           className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                       />
                   </div>
                    : null}
            </div>

            <div>
                    <Table
                    tableData={data?.data?.body}
                    // tableData={repaymentsData}
                    tableHeader={tableHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={54}
                    sx='cursor-pointer'
                    tableCellStyle={'h-12'}
                    // optionalFilterName='endownment'
                    condition={true}
                    sideBarTabName='repayment'
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