'use client'
import React from 'react';
import {useViewAllLoanDisbursalQuery} from "@/service/admin/loan/Loan-disbursal-api";
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
import {Circle} from "lucide-react";
import {inter, cabinetGroteskMediumBold, cabinetGroteskBold} from '@/app/fonts';
import {LoanType} from "@/types/loan/loan-request.type";
import {useRouter} from "next/navigation";
import { setClickedLoanId } from '@/redux/slice/loan/selected-loan';
import { store } from '@/redux/store';
import PerformanceCard from '@/reuseable/cards/perfomance-card/performanceCard';
import Details from "@/components/loanee-my-profile/Details";
import styles from '@/features/Overview/index.module.css';

const Myloans = () => {

    const request = {
        pageSize: 400,
        pageNumber: 0,
    }
    const router = useRouter()
    const {data: loaneeLoans  } = useViewAllLoanDisbursalQuery(request)
    console.log('loaneeLoans: ', loaneeLoans)
    const handleClick = (loanId:string) => {
        store.dispatch(setClickedLoanId(loanId))
        router.push('/my-loan-profile');
    }
    return (
        <div className={` w-full h-full grid gap-8 px-4 py-4  md:px-8 md:py-6`}>
            <div className={`w-full flex gap-4  md:gap-6 ${styles.overviewCard}   `}>
                <Details isLoading={false} sx={`  w-[20em] `} name={'Total loan amount'} valueType={"currency"}  id={'loaneeTotalLoan'} showAsWholeNumber={false}   maxWidth={'100%'}  value={'0'}/>
                <Details isLoading={false} sx={` w-[20em]  `} id={'loaneeTotalLoaneOutstanding'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount outstanding '} value={10000} valueType={'currency'}  />
                <Details isLoading={false} sx={` w-[20em]  `} id={'loaneeTotalAmountRepaid'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount repaid '} value={1000000000000000} valueType={'currency'}  />
            </div>

          <div className={`w-full h-full grid md:grid md:grid-cols-2 `}>
              {loaneeLoans?.data?.body?.map((loan:LoanType, index) => (
                  <button onClick={() => {handleClick(loan?.id)}} key={index} className={` w-full h-fit py-4 px-4  shadow-lg shadow-neutral-200/40  border border-neutral-200 rounded-md `}>
                      <div className={` flex gap-2  `}>
                          <p id={'loaneeCohort'} className={`${inter.className} text-meedlBlue text-[16px] `}>{capitalizeFirstLetters(loan?.programName)}</p>
                          {loan?.cohortName && loan?.programName ? <Circle color={'#ECECEC'}
                                                       className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary"/>: null}
                          <p id={'loaneeProgram'} data-testid={'loaneeProgram'} className={`${inter.className} text-meedlBlue text-[16px] `}>{capitalizeFirstLetters(loan?.cohortName)}</p>
                      </div>
                      <div className={`flex gap-2 `}>
                          <p className={` ${cabinetGroteskMediumBold.className} text-meedlBlue text-[29px] `}>Loan amount:</p>
                          <p className={`${cabinetGroteskBold.className} text-meedlBlue text-[29px]`}>₦{loan?.loanAmountApproved}</p>
                      </div>
                  </button>
              ))}
          </div>
        </div>
    );
};

export default Myloans;