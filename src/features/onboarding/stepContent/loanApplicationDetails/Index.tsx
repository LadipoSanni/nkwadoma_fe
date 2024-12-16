'use client'
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LoaneeLoanDetail } from "@/features/onboarding/stepContent/Index";
import DetailItem from "@/reuseable/details/detail-Item/Index";

const LoanApplicationDetails: React.FC<LoaneeLoanDetail> = ({ initialDeposit, tuitionAmount, amountRequested }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="loanApplicationDetailsContent" className={'rounded-md grid gap-9 p-5 bg-grey105'}>
            <DetailItem label="Tuition amount" value={tuitionAmount} />
            <DetailItem label="Cohort start date" value="13 Dec, 2023" />
            <DetailItem label="Referred by" value="Semicolon Africa" />
            <DetailItem label="Loan amount requested" value={amountRequested} />
            <DetailItem label="Deposit" value={initialDeposit} />
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
                        <DetailItem label="Tuition" value="₦2,000,000.00" />
                        <DetailItem label="Devices" value="₦600,000.00" />
                        <DetailItem label="Accommodation" value="₦600,000.00" />
                        <DetailItem label="Feeding" value="₦300,000.00" />
                    </div>
                    <div id="tuitionBreakdownTotalContainer" className={'flex justify-between py-5 px-3 border-t border-t-lightBlue250'}>
                        <h3 id="tuitionBreakdownTotalLabel" className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Total</h3>
                        <p id="tuitionBreakdownTotalValue" className={`text-black500 text-[14px] font-semibold leading-[150%]`}>₦3,500,000.00</p>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default LoanApplicationDetails;