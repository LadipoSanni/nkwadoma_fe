'use client'
import React, {useEffect} from 'react';
import DetailItem from "@/reuseable/details/detail-Item/Index";
import {NumericFormat} from "react-number-format";
import {
    useViewLoanDetailsOnOnboardingQuery
    //  useRespondToLoanReferralMutation
     } from "@/service/users/Loanee_query";
import { useAppSelector } from '@/redux/store';
interface ResponseType {
    "id": string,
    "tuitionAmount": number,
    "initialDeposit": number,
    "amountRequested": number,
    "amountReceived": number,
    "amountRepaid": number,
    "amountOutstanding": number,
    "loanBreakdown": null,
    interestRate: number,
    interestIncurred: number,
}

const ReviewLoan = () => {
    const invitedLoaneeFromPmId = useAppSelector(state => state.selectedLoan.cohortLoaneeId)
     const { data,isLoading, isFetching
    } = useViewLoanDetailsOnOnboardingQuery(invitedLoaneeFromPmId);

    const [response, setResponse ] = React.useState<ResponseType>(data?.data)

    useEffect(() => {
        setResponse(data?.data)
    },[data])

    return (
        <div className={` w-full h-full ${isLoading || isFetching ? 'h-[3rem] w-full animate-pulse' : 'grid'}  grid gap-6  `}>
           <div className={` rounded-md ${isLoading || isFetching ? 'hidden' : 'grid'} grid gap-9 p-5 bg-grey105 `}>
                        <DetailItem id={'LoanAmount'} label="Loan amount" value={<NumericFormat value={response?.amountReceived ? response?.amountReceived : 0} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'amountOutstanding'} label="Amount outstanding" value={<NumericFormat value={response?.amountOutstanding ? response?.amountOutstanding : 0} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={"amountRepaid"} label="Amount repaid" value={<NumericFormat value={response?.amountRepaid ? response?.amountRepaid : 0} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'interest'} label="Interest" value={response?.interestRate ? `${response?.interestRate}%` : `0%`} />
                        <DetailItem id={`interestIncurred`} label="Interest incurred" value={response?.interestIncurred ? `${response?.interestIncurred}%` : `0%`} />
           </div>

        </div>
    );
};

export default ReviewLoan;