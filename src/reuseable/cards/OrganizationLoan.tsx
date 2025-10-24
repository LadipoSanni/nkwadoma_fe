import React from 'react';
import {inter, inter500, inter600, inter700} from "@/app/fonts";
import {formatSentence} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import clsx from "clsx";

interface Props {
    organizationName: string,
    loanAmountApproved: string,
    loanAmountOutstanding: string,
    loanAmountRepaid: string,
    isLoading: boolean,
    id: string,
    handleClick: () => void,
}

const OrganizationLoan = ({organizationName, loanAmountRepaid,id, handleClick, loanAmountOutstanding, loanAmountApproved,isLoading}:Props) => {
    return (
        <div id={'LoanCard'+ id} className={` w-full h-fit pb-4 px-4  bg-[#F9F9F9] rounded-md `}>
            <div className={` flex gap-2   py-4  `}>
                <div className="rounded-full aspect-square flex items-center bg-[#ECECEC]  h-[2rem] w-[2rem]   ">
                    <p id={'organizationName'} data-testid={'organizationName'} className={` w-fit h-fit mr-auto ml-auto  `}> {organizationName?.at(0)}</p>
                </div>
                <p id={'loaneeProgram'} data-testid={'loaneeProgram'}
                   className={`${inter600.className} mt-auto mb-auto text-black text-[16px] `}>{formatSentence(organizationName)}</p>
            </div>
            <div
                className={clsx(` grid justify-items-start pl-3 py-3  rounded-md gap-4 bg-white `, {' h-[10em] animate-pulse': isLoading,})}>
                <div className={clsx("", {"h-6 w-[90%] rounded bg-gray-200 animate-pulse bg-[#F9F9F9]": isLoading,})}>
                    <p id={'loanAmountText'} data-test-id={'loanAmountText'} className={clsx(` text-[#6A6B6A] text-[14px] ${inter.className} `, {" hidden " : isLoading,})}>Loan amount</p>
                    <p id={'loanAmountValue'} data-test-id={'loanAmountValue'} className={clsx(`text-black text-[14px] ${inter500.className} `, {' hidden': isLoading,})}>{formatAmount(Number(loanAmountApproved),false)}</p>
                </div>
                <div className={clsx(``, {'h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]': isLoading,})}>
                    <p id={'loanAmountOutstandingText'} data-test-id={'loanAmountOutstandingText'} className={clsx(` ${inter.className} text-[#6A6B6A] text-[14px] `, {'hidden': isLoading})}>Amount outstanding</p>
                    <div id={'loanAmountOutstandingValue'} data-test-id={'loanAmountOutstandingValue'} className={clsx(`text-black text-[14px] ${inter500.className} `, {' hidden': isLoading,})}>{formatAmount(Number(loanAmountOutstanding),false)}</div>
                </div>
                <div className={clsx(``, {'h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]': isLoading,})} >
                    <p className={clsx(` ${inter.className} text-[#6A6B6A] text-[14px] `, {'hidden': isLoading})}>Amount repaid</p>
                    <p className={clsx(`text-black text-[14px] ${inter500.className} `, {' hidden': isLoading,})}>{formatAmount(Number(loanAmountRepaid),false)}</p>
                </div>
            </div>
            <div className={`flex w-full  pt-3 pb-1 justify-end`}>
                <button id={'viewLoanDetailsButton'} data-testid={'viewLoanDetailsButton'} onClick={handleClick} className={`text-[14px] hover:bg-[#E8EAEE] focus:bg-[#E8EAEE] ${inter700.className} border border-meedlBlue w-fit h-fit px-4 py-2 rounded-md text-meedlBlue `}>View details</button>
            </div>
        </div>

    );
};

export default OrganizationLoan;