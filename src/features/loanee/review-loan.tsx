'use client'
import React from 'react';
import {cabinetGrotesk, inter, cabinetGroteskMediumBold600} from "@/app/fonts";
import Connector from "@/components/common/Connector";
import {Button} from "@/components/ui/button";
import DetailItem from "@/reuseable/details/detail-Item/Index";
import {NumericFormat} from "react-number-format";
import { useViewLoanReferralDetailsQuery,
    //  useRespondToLoanReferralMutation
     } from "@/service/users/Loanee_query";
import { useAppSelector } from '@/redux/store';

const ReviewLoan = () => {

    const id = useAppSelector(state => state.selectedLoan.loanReferralId)
     const { data, 
        // isLoading: loanReferralDetailsIsLoading 
    } = useViewLoanReferralDetailsQuery(id);
    //  const [respondToLoanReferral, {isLoading}] = useRespondToLoanReferralMutation({});



    return (
        <div className={` w-full h-full   grid gap-6  `}>
           <div className={` rounded-md grid gap-9 p-5 bg-grey105 `}>
                        <DetailItem id={'LoanAmount'} label="Loan amount" value={<NumericFormat value={data?.data?.loanAmountRequested} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'amountOutstanding'} label="Amount outstanding" value={<NumericFormat value={'10000'} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={"amountRepaid"} label="Amount repaid" value={<NumericFormat value={'10000'} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'interest'} label="Interest" value={`10%`} />
                        <DetailItem id={`interestIncurred`} label="Interest incurred" value={`10%`} />
           </div>

        </div>
    );
};

export default ReviewLoan;