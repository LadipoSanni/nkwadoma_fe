'use client'
import React,{useEffect} from 'react';
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
import { Button } from '../ui/button';
import {resetAll} from "@/redux/slice/create/createLoanOfferSlice";
import { setLoaneeName,setLoaneeAmountRequested } from '@/redux/slice/loan/loan-offer';

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

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
    const loaneeName = useAppSelector(state => state?.loanOffer?.loaneeName)
    const loanRequestId = useAppSelector(state => state.createLoanOffer.selectedLoanRequestId);

    const {data, isLoading, isFetching} = useGenerateLoanRepaymentScheduleQuery({amountApproved:unformatedAmount, loanProductId:selectedLoanProductId})
    const [respondToLoanRequest, { isLoading:isLoanOfferCreating }] = useRespondToLoanRequestMutation();

    useEffect(() => {
        if(loanRequestId === ""){
            router.push('/loan/loan-request') 
        }
    },[loanRequestId])

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

         try {
            const response=  await respondToLoanRequest(data).unwrap();;
            if(response){
                toast({
                    description: response?.message,
                    status: "success",
                    duration: 2000
                });  
                store.dispatch(setCurrentTab('Loan requests'))
                store.dispatch(setCurrentTabStatus('LOAN_REQUEST'))
                store.dispatch(setcurrentTabRoute('loan-request'))
                store.dispatch(resetAll())
                store.dispatch(setLoaneeName(""))
                store.dispatch(setLoaneeAmountRequested(0))
                router.push('/loan/loan-request') 
            }
            
         } catch (err) {
            const error = err as ApiError;
            toast({
                description: error?.data?.message ,
                status: "error",
                duration: 2000
            })
         }
        // if (response?.error){
        //     toast({
        //         //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //         // @ts-expect-error
        //         description: response?.error?.data?.message,
        //         status: "error",
        //     })
        // }else{
        //     toast({
        //         description: "Loan offer has been created",
        //         status: "success",
        //     })
        //     store.dispatch(setCurrentTab('Loan requests'))
        //     store.dispatch(setCurrentTabStatus('LOAN_REQUEST'))
        //     store.dispatch(setcurrentTabRoute('loan-request'))
        //     router.push('/loan/loan-request')
        // }

    }

    const backToLoanRequest = () => {
        router.push("/create-loan-offer")
    }

    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  md:h-fit h-full px-3  md:px-6 py-4 `}
        >
            <BackButton handleClick={backToLoanRequest} iconBeforeLetters={true} text={"Back"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>
            <div className={`w-full grid gap-3  md:gap-0 h-fit md:flex md:justify-between `}>
                <span className={` ${inter.className} text-[#101828] text-[24px] md:text-[28px] font-bold  `}>Repayment schedule for <span className='font-semibold'>{loaneeName}</span> </span>
                <Button 
                onClick={confirmSchedule} 
                id={'confirmRepaymentButton'} 
                data-tesid={'confirmRepaymentButton'} 
                className={` rounded-md text-[12px] ${inter700.className} w-full  md:w-36 h-fit py-3  md:py-2 px-2 bg-meedlBlue text-white  `}
                variant={"secondary"}
                size={"lg"}
                >
                    {isLoanOfferCreating ? <Loader2 className="animate-spin"  />  : "Create loan offer"}
                </Button>
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
            {/*{ isLoading || isFetching  ?*/}
            {/*    <SkeletonForTable />*/}
            {/*    :*/}
                <InfiniteScrollTable
                tableData={data?.data?.repaymentScheduleEntries}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tableHeader={tableHeader}
                tableHeight={50}
                isLoading={isLoading || isFetching}
                dataName={'Repayment Schedule'}
                staticHeader={'Date'}
                staticColumn={'date'}
                />

        </div>
    );
};

export default GenerateRepaymentSchedule;