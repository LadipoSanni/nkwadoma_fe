'use client'
import React, {useState} from 'react';
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible";
import {cabinetGrotesk, inter} from '@/app/fonts'
import Connector from "@/components/common/Connector";
import {Button} from "@/components/ui/button";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

const steps = [
    'Loan application details',
    'Verify your identity',
    'Additional information',
    'Confirm loan application'
]

const LoanApplicationDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div id="loanApplicationDetailsContainer"
             className={`md:overflow-visible overflow-y-auto h-[calc(100vh-8rem)] md:h-auto grid pr-1.5 md:gap-[58px] gap-6 ${inter.className}`}>
            <header id="loanReferralAcceptanceHeader"
                    className={'flex items-start border-b-lightBlue250 border-b border-solid w-full  py-5'}>
                <h1 id="loanReferralAcceptanceTitle"
                    className={`${cabinetGrotesk.className} md:text-[28px] text-[16px] leading-[120%]`}>Loan referral
                    acceptance process</h1>
            </header>
            <div id="loanApplicationStepsContainer" className={'md:flex md:justify-between grid gap-5 md:gap-0'}>
                <aside id="loanApplicationStepsAside" className={'inline-flex flex-col items-start gap-1'}>
                    {
                        steps.map((step, index) => (
                            <div key={index} id={`loanApplicationStep${index}`} className={'flex gap-2'}>
                                <Connector showLine={index < steps.length - 1}/>
                                <p id={`loanApplicationStepText${index}`}
                                   className={'text-meedlBlue text-[14px] leading-[150%]'}>{step}</p>
                            </div>
                        ))
                    }
                </aside>
                <section id="loanApplicationDetailsSection"
                         className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[43vw] w-full md:max-h-[calc(100vh-19rem)] md:overflow-y-auto rounded-md border border-lightBlue250 '}>
                    <h2 id="loanApplicationDetailsTitle"
                        className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%]`}>Loan
                        application details</h2>
                    <div id="loanApplicationDetailsContent" className={'rounded-md grid gap-9 p-5 bg-grey105'}>
                        <div id="tuitionAmountContainer" className={'md:flex md:justify-between grid gap-3'}>
                            <h3 id="tuitionAmountLabel"
                                className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Tuition amount</h3>
                            <p id="tuitionAmountValue"
                               className={`text-black500 text-[14px] leading-[150%]`}>₦3,500,000.00</p>
                        </div>
                        <div id="startDateContainer" className={'md:flex md:justify-between grid gap-3'}>
                            <h3 id="startDateLabel"
                                className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Start date</h3>
                            <p id="startDateValue" className={`text-black500 text-[14px] leading-[150%]`}>13 Dec,
                                2023</p>
                        </div>
                        <div id="loanAmountRequestedContainer" className={'md:flex md:justify-between grid gap-3'}>
                            <h3 id="loanAmountRequestedLabel"
                                className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Loan amount
                                requested</h3>
                            <p id="loanAmountRequestedValue"
                               className={`text-black500 text-[14px] leading-[150%]`}>₦3,000,000.00</p>
                        </div>
                        <div id="depositContainer" className={'md:flex md:justify-between grid gap-3'}>
                            <h3 id="depositLabel"
                                className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Deposit</h3>
                            <p id="depositValue" className={`text-black500 text-[14px] leading-[150%]`}>₦35,000</p>
                        </div>
                        <Collapsible className={'bg-meedlWhite rounded-md border border-lightBlue250'} open={isOpen}
                                     onOpenChange={setIsOpen}>
                            <CollapsibleTrigger asChild>
                                <div id="tuitionBreakdownTrigger"
                                     className={`flex justify-center items-center py-4 px-7 gap-1 w-full ${isOpen ? 'border-b-lightBlue250 border-b' : ''}  md:px-0 md:h-14 h-[4.625rem] cursor-pointer select-none`}>
                                    <p id="tuitionBreakdownTriggerText"
                                       className={'font-normal text-[14px] leading-[150%] text-black300'}>{isOpen ? 'Collapse to hide the tuition breakdown' : 'Expand to see the tuition breakdown'}</p>
                                    {isOpen ? <MdKeyboardArrowUp id="tuitionBreakdownArrowUp"
                                                                 className={'h-6 w-6 text-primary200'}/> :
                                        <MdKeyboardArrowDown id="tuitionBreakdownArrowDown"
                                                             className={'h-6 w-6 text-primary200'}/>}
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent id="tuitionBreakdownContent">
                                <div id="tuitionBreakdownDetails" className={'rounded-md grid gap-8 py-5 px-3'}>
                                    <div id="tuitionContainer" className={'flex justify-between'}>
                                        <h3 id="tuitionLabel"
                                            className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Tuition</h3>
                                        <p id="tuitionValue"
                                           className={`text-black500 text-[14px] leading-[150%]`}>₦2,000,000.00</p>
                                    </div>
                                    <div id="devicesContainer" className={'flex justify-between'}>
                                        <h3 id="devicesLabel"
                                            className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Devices</h3>
                                        <p id="devicesValue"
                                           className={`text-black500 text-[14px] leading-[150%]`}>₦600,000.00</p>
                                    </div>
                                    <div id="accommodationContainer" className={'flex justify-between'}>
                                        <h3 id="accommodationLabel"
                                            className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Accomodation</h3>
                                        <p id="accommodationValue"
                                           className={`text-black500 text-[14px] leading-[150%]`}>₦600,000.00</p>
                                    </div>
                                    <div id="feedingContainer" className={'flex justify-between'}>
                                        <h3 id="feedingLabel"
                                            className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Feeding</h3>
                                        <p id="feedingValue"
                                           className={`text-black500 text-[14px] leading-[150%]`}>₦300,000.00</p>
                                    </div>
                                </div>
                                <div id="tuitionBreakdownTotalContainer"
                                     className={'flex justify-between py-5 px-3 border-t border-t-lightBlue250'}>
                                    <h3 id="tuitionBreakdownTotalLabel"
                                        className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Total</h3>
                                    <p id="tuitionBreakdownTotalValue"
                                       className={`text-black500 text-[14px] font-semibold leading-[150%]`}>₦3,500,000.00</p>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <Button id="continueButton"
                            className={'bg-meedlBlue rounded-md  h-[2.8125rem] w-[6.375rem] self-end justify-self-end hover:bg-meedlBlue focus:bg-meedlBlue'}>Continue</Button>
                </section>
            </div>
        </div>
    )
}
export default LoanApplicationDetails