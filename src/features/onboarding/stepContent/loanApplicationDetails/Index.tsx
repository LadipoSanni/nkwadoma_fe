'use client'
import React, {useEffect, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {useViewLoanReferralDetailsQuery} from "@/service/users/Loanee_query";

const LoanApplicationDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loaneeLoanDetail, setLoaneeLoanDetail] = useState({
        tuitionAmount: "0.00",
        amountRequested: "0.00",
        initialDeposit: "0.00"
    })
    const {data} = useViewLoanReferralDetailsQuery({})
    useEffect(() => {
        viewLoanReferralDetails()
    }, [data]);
    function viewLoanReferralDetails  (){
        if (data?.statusCode === "OK" &&  data?.data?.id){
            sessionStorage.setItem("loanReferralId", data?.data?.id);
        }
        if (data?.statusCode === "OK" && data?.data?.loanee?.loaneeLoanDetail) {
            const backendDetails = data.data.loanee.loaneeLoanDetail;

            setLoaneeLoanDetail(prevState => {
                const newDetails = {
                    tuitionAmount: backendDetails.tuitionAmount?.toString() || "0.00",
                    amountRequested: backendDetails.amountRequested?.toString() || "0.00",
                    initialDeposit: backendDetails.initialDeposit?.toString() || "0.00",
                };
                if (
                    prevState.tuitionAmount !== newDetails.tuitionAmount ||
                    prevState.amountRequested !== newDetails.amountRequested ||
                    prevState.initialDeposit !== newDetails.initialDeposit
                ) {
                    return newDetails;
                }
                return prevState;
            });
        }
    }

    return (
        <div id="loanApplicationDetailsContent" className={'rounded-md grid gap-9 p-5 bg-grey105'}>
            <div id="tuitionAmountContainer" className={'md:flex md:justify-between grid gap-3'}>
                <h3 id="tuitionAmountLabel"
                    className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Tuition amount</h3>
                <p id="tuitionAmountValue"
                   className={`text-black500 text-[14px] leading-[150%]`}>{loaneeLoanDetail.tuitionAmount}</p>
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
                   className={`text-black500 text-[14px] leading-[150%]`}>{loaneeLoanDetail.amountRequested}</p>
            </div>
            <div id="depositContainer" className={'md:flex md:justify-between grid gap-3'}>
                <h3 id="depositLabel"
                    className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Deposit</h3>
                <p id="depositValue" className={`text-black500 text-[14px] leading-[150%]`}>{loaneeLoanDetail.initialDeposit}</p>
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

    );
};

export default LoanApplicationDetails;
