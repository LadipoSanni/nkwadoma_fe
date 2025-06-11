import React, {ReactNode, useEffect, useState} from 'react';
// import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import dayjs from "dayjs";
import {formatAmount} from "@/utils/Format";
import Table from '@/reuseable/table/Table';
import {MdOutlineLibraryBooks} from "react-icons/md";
import {inter} from "@/app/fonts";
// import {repaymentsData} from "@/utils/LoanProductMockData";
import {useViewAllRepaymentHistoryQuery} from "@/service/admin/overview";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
interface Props {
    loaneeId: string;
}

const LoaneeRepayment = ({loaneeId}:Props) => {
    const [hasNextPage, setNextPage] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const [pageSize] = useState(10)

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
    const props =  {
        pageSize: pageSize,
        pageNumber: pageNumber,
        loaneeId: loaneeId,

    }
    const {data, isFetching, isLoading} = useViewAllRepaymentHistoryQuery(props)

    useEffect(() => {
        if(data && data?.data) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }

    },[data])

    const tableHeader = [
        { title: 'Payment date', sortable: true, id: 'paymentDate', selector: (row: TableRowData) =><div>{dayjs(row.paymentDateTime?.toString()).format('MMM D, YYYY')}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountPaid)}</div> },
        { title: 'Payment mode', sortable: true, id: 'modeOfPayment', selector: (row: TableRowData) => <div className={`  `}>{getModeOfPayment(row.modeOfPayment)}</div>},
    ];


    const handleRowClick = (ID: string | object | React.ReactNode) => {
        // router.push(`/loan-request-details?id=${ID}`);
        console.log(ID)
    };

    return (
            <Table
                tableData={data?.data?.body}
                // tableData={repaymentsData}
                tableHeader={tableHeader}
                handleRowClick={handleRowClick}
                tableHeight={48}
                sx='cursor-pointer'
                tableCellStyle={'h-12'}
                // optionalFilterName='endownment'
                condition={true}
                sideBarTabName='repayment'
                icon={MdOutlineLibraryBooks}
                staticHeader={"Payment date"}
                staticColunm={'paymentDate'}
                hasNextPage={hasNextPage}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPage}
                isLoading={isLoading || isFetching}
            />
    )
};

export default LoaneeRepayment;