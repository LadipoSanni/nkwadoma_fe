import React from 'react';
import dayjs from "dayjs";
import {formatAmount} from "@/utils/Format";
import InfiniteScrollTable from "@/reuseable/table/InfiniteScrollTable";
import Details from "@/components/loanee-my-profile/Details";
import { useViewGeneratedRepaymentScheduleQuery } from '@/service/admin/loan/loan-request-api';

interface viewAllType {
    principalAmount: string
    repaymentDate: string
    expectedMonthlyAmount: string
    amountOutstanding:string
    totalAmountRepaid:number
    totalPayment: string
}

interface Props{
    loanId:string
}
const ViewRepaymentSchedule = ({loanId}: Props) => {
    const  {data, isLoading, isFetching} = useViewGeneratedRepaymentScheduleQuery(loanId)
    const tableHeader =  [
        { title: 'Date', sortable: true, id: 'date', selector: (row: viewAllType) =><div>{dayjs(row.repaymentDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Principal amount', sortable: true, id: 'principalAmount', selector: (row:  viewAllType) => <div className=''>{formatAmount(row.principalAmount)}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: viewAllType) => <div className=''>{formatAmount(row.expectedMonthlyAmount)}</div>},
        { title: 'Outstanding', sortable: true, id: 'outstanding', selector: (row: viewAllType) =><div>{formatAmount(row.amountOutstanding?.toString())}</div> },
        { title: 'Total payment', sortable: true, id: 'totalPayment', selector: (row: viewAllType) =><div>{formatAmount(row.totalAmountRepaid?.toString())}</div> },

    ]

    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  md:h-fit h-full px-2 py-2 `}
        >
            <div className={` grid  md:flex gap-3  `}>
                <div className={` w-full md:w-[50%] `}>
                    <Details showIcon={false} isLoading={isLoading || isFetching} sx={` w-full md:w-[100%] `} id={'total'} showAsWholeNumber={false}    name={'Sum total'}
                             value={data?.data?.sumTotal ? data?.data?.sumTotal :0}
                             valueType={'currency'}  />
                </div>
                <div className={`w-full md:w-[50%] grid md:flex gap-3  `}>
                    <Details showIcon={false} isLoading={isLoading || isFetching} sx={` w-full md:w-[100%] `} id={'tenor'} showAsWholeNumber={false} name={'Tenor'}
                             value={data?.data?.tenor ? data?.data?.tenor : 0 }
                             valueType={'tenor'}  />
                    <Details showIcon={false} isLoading={isLoading || isFetching} sx={` w-full md:w-[100%] `} id={'moratorium'} showAsWholeNumber={false}    name={'Moratorium'}
                             value={data?.data?.moratorium ? data?.data?.moratorium : 0}
                             valueType={'tenor'}  />
                </div>
            </div>
            <InfiniteScrollTable
                // tableData={[]}
                tableData={data?.data?.repaymentScheduleEntries}
                dataName={'Repayment Schedule'}
                isLoading={isLoading || isFetching}

                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={tableHeader}
                tableHeight={40}
                staticHeader={'Date'}
                staticColumn={'date'}
            />

        </div>
    );
};

export default ViewRepaymentSchedule;