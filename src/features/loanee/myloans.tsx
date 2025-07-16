'use client'
import React from 'react';
import {useViewAllLoanDisbursalQuery, useViewLoansTotalCalculationQuery} from "@/service/admin/loan/Loan-disbursal-api";
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
// import {Circle} from "lucide-react";
import {inter, inter600,inter700, inter500} from '@/app/fonts';
import {LoanType} from "@/types/loan/loan-request.type";
import {useRouter} from "next/navigation";
import { setClickedLoanId } from '@/redux/slice/loan/selected-loan';
import { store } from '@/redux/store';
import Details from "@/components/loanee-my-profile/Details";
import styles from '@/features/Overview/index.module.css';
import {formatAmount} from "@/utils/Format";

const Myloans = () => {

    const request = {
        pageSize: 400,
        pageNumber: 0,
    }
    const router = useRouter()
    const {data: loaneeLoans, isLoading  } = useViewAllLoanDisbursalQuery(request)
    const {data:loansTotalCalculations,isLoading:loansTotalCalculationsLoading } = useViewLoansTotalCalculationQuery({})
    const handleClick = (loanId:string) => {
        store.dispatch(setClickedLoanId(loanId))
        router.push('/my-loan-profile');
    }
    return (
        <div className={` w-full h-full grid gap-8 px-4 py-4  md:px-8 md:py-6`}>
            <div className={`w-full flex gap-4  md:gap-6 ${styles.overviewCard}   `}>
                <Details isLoading={loansTotalCalculationsLoading} sx={`  w-[20em] md:w-full  `} name={'Total loan amount'} valueType={"currency"}  id={'loaneeTotalLoan'} showAsWholeNumber={false}   maxWidth={'100%'}  value={loansTotalCalculations?.data?.totalAmountReceived}/>
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalLoaneOutstanding'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount outstanding '} value={loansTotalCalculations?.data?.totalAmountOutstanding} valueType={'currency'}  />
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalAmountRepaid'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount repaid '} value={loansTotalCalculations?.data?.totalAmountRepaid} valueType={'currency'}  />
            </div>

          <div className={`w-full h-full grid md:grid md:grid-cols-3 `}>
              {loaneeLoans?.data?.body?.map((loan:LoanType) => (
                  <div  key={"key"+loan?.cohortName} className={` w-full h-fit pb-4 px-4  bg-[#F9F9F9] rounded-md `}>
                      <div className={` flex gap-2   py-4  `}>
                          <div className="rounded-full bg-[#ECECEC] flex py-1 px-2  ">
                                  {loan?.organizationName?.at(0)}
                          </div>
                          <p id={'loaneeProgram'} data-testid={'loaneeProgram'}
                             className={`${inter600.className} mt-auto mb-auto text-black text-[16px] `}>{capitalizeFirstLetters(loan?.organizationName)}</p>
                      </div>
                      <div
                          className={`grid justify-items-start pl-3 py-3  rounded-md gap-4 ${isLoading ? `bg-white h-[10em] animate-pulse` : `bg-white `}    `}>
                              <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`}>
                                  <p className={` ${inter.className} ${isLoading ? `hidden` : ``} text-[#6A6B6A] text-[14px] `}>Loan amount</p>
                                  <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`} text-black text-[14px]`}>{formatAmount(Number(loan?.loanAmountApproved),false)}</p>
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
                      <div className={`flex w-full pt-3 pb-1 justify-end`}>
                          <button onClick={() => {handleClick(loan?.id)}} className={`text-[14px] hover:bg-[#E8EAEE] focus:bg-[#E8EAEE] ${inter700.className} border border-meedlBlue w-fit h-fit px-4 py-2 rounded-md text-meedlBlue `}>View details</button>
                      </div>
                  </div>
              ))}
          </div>
        </div>
    );
};

export default Myloans;