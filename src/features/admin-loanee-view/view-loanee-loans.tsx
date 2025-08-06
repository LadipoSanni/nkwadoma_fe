'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import { cabinetGroteskMediumBold, inter, inter500, inter600, inter700} from '@/app/fonts'
import styles from '@/features/Overview/index.module.css';

import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import { useRouter } from 'next/navigation';
import {Badge} from "@/components/ui/badge";
// import {LoanType} from "@/types/loan/loan-request.type";
const ViewLoaneeLoans = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const isLoading = false;
    const router = useRouter()
    const onBackButtonClick = () => {
        router.push('/loanees')
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('searchTerm', searchTerm);
        setSearchTerm(event.target.value);
    };

    const  loans = [
        {organizationName: 'Semicolon Africa',loanAmount: 2000,amountOutstanding: 2000,amountRepaid: 2000 ,id: 'loan1'},
        {organizationName: 'Semicolon Africa Implementation',loanAmount: 2000,amountOutstanding: 2000,amountRepaid: 2000 ,id: 'loan1'},
        {organizationName: 'Semicolon Africa Ginger',loanAmount: 2000,amountOutstanding: 2000,amountRepaid: 2000 ,id: 'loan1'},
        {organizationName: 'Semicolon Africa Scrum',loanAmount: 2000,amountOutstanding: 2000,amountRepaid: 2000 ,id: 'loan1'},
        {organizationName: 'Semicolon Africa Master',loanAmount: 2000,amountOutstanding: 2000,amountRepaid: 2000 ,id: 'loan1'},

    ]
    const onCardClick = (id: string) => {
        router.push(`/loanees/loans/details?id=${id}`);
    }
    return (
        <div
            id={'viewLoaneeLoans'}
            data-testid="viewLoaneeLoans"
            className={` w-full h-full grid gap-4  px-4 py-4 `}
        >
           <div className={` h-fit w-full grid gap-4 `}>
               <BackButton id={'backToAllLoanee'} textColor={'#142854'} iconBeforeLetters={true} text={'Back'} handleClick={onBackButtonClick}/>
               <span className={` text-[24px] text-black ${cabinetGroteskMediumBold.className}  `}>Magret Ekweze</span>
               <div className={`w-full h-fit flex gap-6   ${styles.overviewCard}`}>
                   <Details isLoading={false} sx={`  w-[20em] md:w-[100%]  `} name={'Total loan amount'} valueType={'currency'}  id={'totalLoanAmount'} showAsWholeNumber={false}  value={'1000'}/>
                   <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'TotalAmountOutstanding'} showAsWholeNumber={false}    name={'Total amount outstanding'} value={'20000'} valueType={'currency'}  />
                   <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={"totalAmountRepaid"} showAsWholeNumber={false}    name={'Total amount repaid'} value={'10000'} valueType={'currency'}  />

               </div>
           </div>
           <div className={` h-fit g2  `}>
               <SearchInput
                   id={'searchField'}
                   data-testid={'searchField'}
                   value={'Search by organization'}
                   onChange={handleSearchChange}
               />
               <div
                   className={`h-full md:h-[43vh] mt-4 pr-3  grid ${styles.verticalScrollbar} gap-4 md:grid md:grid-cols-3 bg-white py-4 w-full `}
               >
                   {loans?.map((loan) => (
                       <div  key={"key"+loan?.organizationName} className={` w-full h-fit pb-4 px-4  bg-[#F9F9F9] rounded-md `}>
                           <div className={` flex gap-2   py-4  `}>
                               <Badge className={`h-[40px] w-[40px] hover:bg-[#F6F6F6]    bg-[#F6F6F6] rounded-full `}>

                                   <p className={` w-fit h-fit mt-auto mb-auto mr-auto ml-auto ${inter600.className} text-[#4D4E4D] md:text-[#4D4E4D] text-[16px] `}>{getFirstLetterOfWord(loan?.organizationName) ? getFirstLetterOfWord(loan?.organizationName) : loan?.organizationName?.at(0)?.toUpperCase()}</p>
                               </Badge>
                               <p id={'loaneeProgram'} data-testid={'loaneeProgram'}
                                  className={`${inter600.className} mt-auto mb-auto text-black text-[16px] `}>{capitalizeFirstLetters(loan?.organizationName)}</p>
                           </div>
                           <div
                               className={`grid justify-items-start pl-3 py-3  rounded-md gap-4 ${isLoading ? `bg-white h-[10em] animate-pulse` : `bg-white `}    `}>
                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`}>
                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``} text-[#6A6B6A] text-[14px] `}>Loan amount</p>
                                   <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`} text-black text-[14px]`}>{formatAmount(Number(loan?.loanAmount),false)}</p>
                               </div>
                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`}>
                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``} text-[#6A6B6A] text-[14px] `}>Amount outstanding</p>
                                   <div className={`${inter500.className} ${isLoading ? `hidden` : `flex `} text-black text-[14px]`}>{formatAmount(Number(loan?.amountOutstanding),false)}</div>
                               </div>
                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`} >
                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``}  text-[#6A6B6A] text-[14px] `}>Amount repaid</p>
                                   <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`}  text-black text-[14px]`}>{formatAmount(Number(loan?.amountRepaid),false)}</p>
                               </div>
                           </div>
                           <div className={`flex w-full  pt-3 pb-1 justify-end`}>
                               <button
                                   onClick={() => {onCardClick(loan?.id)}}
                                   className={`text-[14px] hover:bg-[#E8EAEE] focus:bg-[#E8EAEE] ${inter700.className} border border-meedlBlue w-fit h-fit px-4 py-2 rounded-md text-meedlBlue `}>View details</button>
                           </div>
                       </div>
                   ))}

               </div>
           </div>

        </div>
    );
};

export default ViewLoaneeLoans;