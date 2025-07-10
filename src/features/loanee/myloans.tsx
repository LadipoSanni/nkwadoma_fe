'use client'
import React from 'react';
import {useViewAllLoanDisbursalQuery} from "@/service/admin/loan/Loan-disbursal-api";
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
import {Circle} from "lucide-react";
import {inter, cabinetGroteskMediumBold, cabinetGroteskBold} from '@/app/fonts';

const Myloans = () => {

    const request = {
        pageSize: 400,
        pageNumber: 0,
    }
    const {data: loaneeLoans  } = useViewAllLoanDisbursalQuery(request)
    console.log('loaneeLoans: ', loaneeLoans)
    return (
        <div className={` w-full h-full px-8 py-8`}>
          <div className={`w-full h-full grid md:flex md:flex-wrap `}>
              {loaneeLoans?.data?.body?.map((loan, index) => (
                  <div key={index} className={` w-full h-fit py-4 px-4  shadow-lg shadow-neutral-200/40  border border-neutral-200 rounded-md `}>
                      <div className={` flex gap-2`}>
                          <p id={'loaneeCohort'} className={`${inter.className} text-meedlBlue text-[16px] `}>{capitalizeFirstLetters(loan?.programName)}</p>
                          {loan?.cohortName && loan?.programName ? <Circle color={'#ECECEC'}
                                                       className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary"/>: null}
                          <p id={'loaneeProgram'} data-testid={'loaneeProgram'} className={`${inter.className} text-meedlBlue text-[16px] `}>{capitalizeFirstLetters(loan?.cohortName)}</p>
                      </div>
                      <div className={`flex gap-2`}>
                          <p className={` ${cabinetGroteskMediumBold.className} text-meedlBlue text-[29px] `}>Loan amount:</p>
                          <p className={`${cabinetGroteskBold.className} text-meedlBlue text-[29px]`}>₦{loan?.loanAmountApproved}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
    );
};

export default Myloans;