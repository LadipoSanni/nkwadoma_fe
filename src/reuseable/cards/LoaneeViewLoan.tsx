import React from 'react';
import {LoanType} from "@/types/loanee";
import {inter, inter500, inter700} from '@/app/fonts';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { formatAmount } from '@/utils/Format';

interface Props {
    isLoading: boolean,
    handleClick: () => void,
    data: LoanType
}

const LoaneeViewLoan: React.FC<Props> = ({
    isLoading,
    handleClick,
    data
                                         }) => {


        // LOAN_OFFER,
        // LOAN_REQUEST,
        // LOAN_REFERRAL,
        // LOAN_DISBURSAL,
       //LOAN_WITHDRAWN
    //LOAN_DECLINED

    const loanCancelled = ['LOAN_DECLINED', 'LOAN_WITHDRAWN'];
    const loanInProgress = ['LOAN_REFERRAL', 'LOAN_REQUEST', 'LOAN_OFFER'];
    // const loanActive = ['LOAN_DISBURSAL'];


    const loanStatus = data?.loanType;
    const getLoanStatusColors = () => {
        if (loanCancelled?.includes(loanStatus)) {
            return {textBackgroundColor: '#FBE9E9', textColor: '#C1231D', bannerColor: '#882204'}
        }else if (loanInProgress?.includes(loanStatus)) {
            return {textBackgroundColor: '#FEF6E8', textColor: '#AD7311', bannerColor: '#B3B168'}
        }else {
            return {textBackgroundColor: '#E6F2EA', textColor: '#045620', bannerColor: '#045620'}

        }
    }
    // const getLoanStatus = () => {
    //     if (loanCancelled?.includes(loanStatus)) {
    //         return {textBackgroundColor: 'green50', textColor: 'green700', bannerColor: '#882204'}
    //     }else if (loanInProgress?.includes(loanStatus)) {
    //         return {textBackgroundColor: 'warning150', textColor: '#AD7311', bannerColor: '#882204'}
    //     }else {
    //         return {textBackgroundColor: 'error50', textColor: '#C1231D', bannerColor: '#045620'}
    //
    //     }
    // }
    function getWordAfterLoan(status: string): string {
        const word =status.split('_')[1] || ''
        return word?.replace('AL', 'ED');
    }
    const loanInfo = [
        {label: 'Loan amount', value: data?.loanAmount},
        {label: 'Amount outstanding', value: data?.amountOutstanding},
        {label: 'Amount repaid', value: data?.amountRepaid},

    ]
    const loanStatusColors = getLoanStatusColors()
    return (
        <main
            id={`loan` + data?.loanProgressId}
            data-testid={`loan` + data?.loanProgressId}
            className={` w-full h-fit px-2 py-2 border border-[#C9C9D4] rounded-md   `}
        >
            <header
                id={`cardHeader${data?.loanProgressId}`}
                data-testid={`cardHeader${data?.loanProgressId}`}
                style={{ borderColor: loanStatusColors?.bannerColor }}
                className={` w-full h-fit px-4 py-3 rounded-md bg-gradient-to-r from-[#F9F9F9] to-[#FDFDFD] border-l-2   `}
            >
                <section className={` flex gap-3  `}>
                    <div
                        id={'organizationImageOrInitial'+data?.loanProgressId}
                        data-testid={'organizationImageOrInitial'+data?.loanProgressId}
                        className={` w-[3em] h-[3em] grid place-content-center ${inter500.className}text-black  rounded-md aspect-square bg-[#ececec] `}>
                        {capitalizeFirstLetters(data?.organizationName?.at(0))}
                    </div>
                    <div className={` grid `}>
                        <span id={'organizationName'+data?.loanProgressId} data-testid={'organizationName'+data?.loanProgressId} className={` ${inter500.className} text-[#4D4E4D] text-lg  `}>{data?.organizationName}</span>
                        <span className={` text-sm ${inter.className} w-fit h-fit py-0 px-1 rounded-full bg-[${loanStatusColors?.textBackgroundColor}] text-[${loanStatusColors?.textColor}]  `}>{capitalizeFirstLetters(getWordAfterLoan(data?.loanType))}</span>
                    </div>
                </section>
            </header>
            <section
                className={` w-full h-fit grid gap-6 py-4 px-4  `}
            >
                {loanInfo?.map((loan, index) => (
                    <div key={`loanDetails` +index} className={` w-full  md:flex grid md:justify-between `}>
                        <span className={` ${inter.className} text-[#6A6B6A] text-sm  `}>{loan?.label}</span>
                        <span className={` ${inter500.className} text-black text-sm `}>{formatAmount(loan?.value)}</span>
                    </div>
                ))}
            </section>
            <button id={'viewLoanDetails' +data?.loanProgressId}
                    onClick={handleClick}
                    className={` hover:bg-[#E8EAEE]  mt-3 flex justify-center w-full h-fit py-2 text-sm ${inter700.className} rounded-md border border-meedlBlue text-meedlBlue  `}>View details</button>

        </main>
    );
};

export default LoaneeViewLoan;