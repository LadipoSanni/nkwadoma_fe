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
import {
    useGenerateLoanRepaymentScheduleQuery,
    useRespondToLoanRequestMutation,
} from "@/service/admin/loan/loan-request-api";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {setCurrentTab, setcurrentTabRoute, setCurrentTabStatus} from "@/redux/slice/loan/selected-loan";
import {Loader2} from "lucide-react";
import BackButton from "@/components/back-button";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";

interface viewAllType {
    principalAmount: string
    repaymentDate: string
    expectedMonthlyAmount: string
    amountOutstanding:string
    totalAmountRepaid:number
    totalPayment: string
}

const GenerateRepaymentSchedule = () => {
    const selectedLoanProductId = useAppSelector(state => state.createLoanOffer.selectedLoanProductId);
    const unformatedAmount = useAppSelector(state => state.createLoanOffer.amount);
    const loanRequestId = useAppSelector(state => state.createLoanOffer.selectedLoanRequestId);

    const {data, isLoading, isFetching} = useGenerateLoanRepaymentScheduleQuery({amountApproved:unformatedAmount, loanProductId:selectedLoanProductId})
    const [respondToLoanRequest, { isLoading:isLoanOfferCreating }] = useRespondToLoanRequestMutation();

    const router = useRouter()
    const tableHeader =  [
        { title: 'Date', sortable: true, id: 'date', selector: (row: viewAllType) =><div>{dayjs(row.repaymentDate?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Principal amount', sortable: true, id: 'principalAmount', selector: (row:  viewAllType) => <div className=''>{formatAmount(row.principalAmount)}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: viewAllType) => <div className=''>{formatAmount(row.expectedMonthlyAmount)}</div>},
        { title: 'Outstanding', sortable: true, id: 'outstanding', selector: (row: viewAllType) =><div>{formatAmount(row.amountOutstanding?.toString())}</div> },
        { title: 'Total payment', sortable: true, id: 'totalPayment', selector: (row: viewAllType) =><div>{formatAmount(row.totalAmountRepaid?.toString())}</div> },

    ]

    const {toast} = useToast()

    const confirmSchedule = async () => {
        const data = {
            loanRequestId,
            loanProductId: selectedLoanProductId,
            amountApproved: unformatedAmount,
            status: "APPROVED",
            loanRequestDecision: 'ACCEPTED',
            declineReason: ""
        };
        const response=  await respondToLoanRequest(data);
        if (response?.error){
            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: response?.error?.data?.message,
                status: "error",
            })
        }else{
            store.dispatch(setCurrentTab('Loan requests'))
            store.dispatch(setCurrentTabStatus('LOAN_REQUEST'))
            store.dispatch(setcurrentTabRoute('loan-request'))
            router.push('/loan/loan-request')
            toast({
                description: "Loan offer has been created",
                status: "success",
            })
        }


    }
    const backToLoanRequest = () => {
        router.push("/create-loan-offer")
    }

    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  md:h-fit h-full pr-2 md:pr- md:pr-2 md:px-6 py-4 `}
        >
            <BackButton handleClick={backToLoanRequest} iconBeforeLetters={true} text={"Back"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>
            <div className={`w-full grid gap-3  md:gap-0 h-fit md:flex md:justify-between `}>
                <span className={` ${inter.className} text-[#101828] text-[24px] md:text-[28px] font-bold  `}>Generate repayment schedule</span>
                <button onClick={confirmSchedule} id={'confirmRepaymentButton'} data-tesid={'confirmRepaymentButton'} className={` rounded-md text-[12px] ${inter700.className} w-full  md:w-fit h-fit py-3  md:py-2 px-2 bg-meedlBlue text-white  `}>
                    {isLoanOfferCreating ? <Loader2 className="animate-spin"  />  : "Create loan offer"}
                </button>
            </div>
            <div className={` grid  md:flex gap-3  `}>
                <div className={` w-full md:w-[50%] `}>
                    <Details showIcon={false} isLoading={isLoading || isFetching } sx={` w-full md:w-[100%] `} id={'total'} showAsWholeNumber={false}    name={'Sum total'} value={data?.data?.sumTotal ? data?.data?.sumTotal :0} valueType={'currency'}  />
                </div>
                <div className={`w-full md:w-[50%] grid md:flex gap-3  `}>
                    <Details showIcon={false} isLoading={isLoading ||  isFetching } sx={` w-full md:w-[100%] `} id={'tenor'} showAsWholeNumber={false}    name={'Tenor'} value={data?.data?.tenor ? data?.data?.tenor : 0 } valueType={'tenor'}  />
                    <Details showIcon={false} isLoading={isLoading || isFetching } sx={` w-full md:w-[100%] `} id={'moratorium'} showAsWholeNumber={false}    name={'Moratorium'} value={data?.data?.moratorium ? data?.data?.moratorium : 0} valueType={'tenor'}  />
                </div>
            </div>
            { isLoading || isFetching  ?
                <SkeletonForTable />
                :
                <InfiniteScrollTable
                tableData={data?.data?.repaymentScheduleEntries}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={tableHeader}
                tableHeight={50}
                staticHeader={'Date'}
                staticColumn={'date'}
                />
            }

        </div>
    );
};

export default GenerateRepaymentSchedule;