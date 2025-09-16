'use client'
import React from 'react';
import {
    inter,
    inter700
} from "@/app/fonts";
import Details from "@/components/loanee-my-profile/Details";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import InfiniteScrollTable from "@/reuseable/table/InfiniteScrollTable";
import {store, useAppSelector} from "@/redux/store";
import {useViewLoanScheduleQuery} from "@/service/admin/loan/loan-request-api";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {setCurrentTab, setcurrentTabRoute, setCurrentTabStatus} from "@/redux/slice/loan/selected-loan";

interface viewAllType {
    principalAmount: string
    repaymentDate: string
    expectedMonthlyAmount: string
    amountOutstanding:string
    totalAmountRepaid:number
    totalPayment: string
}

const GenerateRepaymentSchedule = () => {
    const loanRequestId = useAppSelector(state => state.createLoanOffer.selectedLoanRequestId);
    const {data} = useViewLoanScheduleQuery(loanRequestId);
    const router = useRouter()
    const tableHeader =  [
        { title: 'Date', sortable: true, id: 'date', selector: (row: viewAllType) =><div>{dayjs(row.repaymentDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Principal amount', sortable: true, id: 'principalAmount', selector: (row:  viewAllType) => <div className=''>{formatAmount(row.principalAmount)}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: viewAllType) => <div className=''>{formatAmount(row.expectedMonthlyAmount)}</div>},
        { title: 'Outstanding', sortable: true, id: 'outstanding', selector: (row: viewAllType) =><div>{formatAmount(row.amountOutstanding?.toString())}</div> },
        { title: 'Total payment', sortable: true, id: 'totalPayment', selector: (row: viewAllType) =><div>{formatAmount(row.totalAmountRepaid?.toString())}</div> },

    ]

    const {toast} = useToast()


    const confirmSchedule = () => {
        toast({
            description: "Loan offer has been created",
            status: "success",
        })

        store.dispatch(setCurrentTab('Loan requests'))
        store.dispatch(setCurrentTabStatus('LOAN_REQUEST'))
        store.dispatch(setcurrentTabRoute('loan-request'))
        router.push('/loan/loan-request')
    }
    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  md:h-fit h-full px-2 py-2 `}
        >
            <div className={`w-full grid gap-2  md:gap-0 h-fit md:flex md:justify-between `}>
                <span className={` ${inter.className} text-[#101828] text-[24px] md:text-[28px] font-bold  `}>Generate repayment schedule</span>
                <button onClick={confirmSchedule} id={'confirmRepaymentButton'} data-tesid={'confirmRepaymentButton'} className={` rounded-md text-[12px] ${inter700.className} w-full  md:w-fit h-fit py-3  md:py-2 px-2 bg-meedlBlue text-white  `}>Confirm repayment schedule</button>
            </div>
            <div className={` grid  md:flex gap-3  `}>
                <div className={` w-full md:w-[50%] `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'total'} showAsWholeNumber={false}    name={'Sum total'} value={data?.data?.sumTotal ? data?.data?.sumTotal :0} valueType={'currency'}  />
                </div>
                <div className={`w-full md:w-[50%] grid md:flex gap-3  `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'tenor'} showAsWholeNumber={false}    name={'Tenor'} value={data?.data?.tenor ? data?.data?.tenor : 0 } valueType={'years'}  />
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'moratorium'} showAsWholeNumber={false}    name={'Moratorium'} value={data?.data?.moratorium ? data?.data?.moratorium : 0} valueType={'years'}  />
                </div>
            </div>
            <InfiniteScrollTable
                tableData={data?.data?.repaymentScheduleEntries}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={tableHeader}
                tableHeight={50}
                staticHeader={'Date'}
                staticColumn={'date'}
            />

        </div>
    );
};

export default GenerateRepaymentSchedule;