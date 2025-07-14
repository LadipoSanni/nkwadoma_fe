import React, { useState} from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LoaneeLoanDetail } from "@/features/onboarding/stepContent/Index";
import DetailItem from "@/reuseable/details/detail-Item/Index";
import { format, isValid } from 'date-fns';
import { NumericFormat } from 'react-number-format';

interface LoanApplicationDetailsProps {
    loaneeLoanDetail: LoaneeLoanDetail | undefined;
}

const LoanApplicationDetails: React.FC<LoanApplicationDetailsProps> = ({ loaneeLoanDetail }) => {
    const [isOpen, setIsOpen] = useState(false);


    if (!loaneeLoanDetail) {
        return <div>Loading...</div>;
    }

    const { initialDeposit, cohortStartDate, tuitionAmount, loanAmountRequested, referredBy, loaneeLoanBreakdowns = [] } = loaneeLoanDetail;

    let totalValue = 0;
    loaneeLoanDetail?.loaneeLoanBreakdowns?.forEach((loanAmount) => {
        totalValue = totalValue +  Number(loanAmount?.itemAmount)
    })
    const formattedCohortStartDate = isValid(new Date(cohortStartDate)) ? format(new Date(cohortStartDate), 'dd MMM, yyyy') : 'Date not available';

    const total = totalValue + Number(tuitionAmount)  -  Number(initialDeposit)

    return (
        <div id="loanApplicationDetailsContent" className={'rounded-md grid gap-9 p-5 bg-grey105'}>

            <DetailItem label="Tuition amount" value={<NumericFormat value={tuitionAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
            <DetailItem label="Cohort start date" value={formattedCohortStartDate}/>
            <DetailItem label="Referred by" value={referredBy ? referredBy : "Not provided"} />
            <DetailItem label="Loan amount requested" value={<NumericFormat value={loanAmountRequested} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
            <Collapsible className={'bg-meedlWhite rounded-md border border-lightBlue250'} open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div id="tuitionBreakdownTrigger" className={`flex justify-center items-center py-4 px-7 gap-1 w-full ${isOpen ? 'border-b-lightBlue250 border-b' : ''} md:px-0 md:h-14 h-[4.625rem] cursor-pointer select-none`}>
                        <p id="tuitionBreakdownTriggerText" className={'font-normal text-[14px] leading-[150%] text-black300'}>
                            {isOpen ? 'Collapse to hide the tuition breakdown' : 'Expand to see the tuition breakdown'}
                        </p>
                        {isOpen ? <MdKeyboardArrowUp id="tuitionBreakdownArrowUp" className={'h-6 w-6 text-primary200'} /> : <MdKeyboardArrowDown id="tuitionBreakdownArrowDown" className={'h-6 w-6 text-primary200'} />}
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent id="tuitionBreakdownContent">
                    <div id="tuitionBreakdownDetails" className={'rounded-md grid gap-8 py-5 px-3'}>
                        <DetailItem label="Tuition" value={<NumericFormat value={tuitionAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        {loaneeLoanBreakdowns.map((breakdown, index) => (
                            <DetailItem key={index} label={breakdown.itemName}
                                        value={<NumericFormat value={breakdown.itemAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        ))}
                        <DetailItem label="Initial deposit" value={<NumericFormat value={initialDeposit} displayType={'text'} allowNegative={false} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                    </div>
                    <div id="tuitionBreakdownTotalContainer"
                         className={'flex justify-between py-5 px-3 border-t border-t-lightBlue250'}>
                        <h3 id="tuitionBreakdownTotalLabel"
                            className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Total</h3>
                        <p id="tuitionBreakdownTotalValue"
                           className={`text-black500 text-[14px] font-semibold leading-[150%]`}><NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} /></p>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default LoanApplicationDetails;