'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import { useGetLoaneeDetailsQuery } from '@/service/users/Loanee_query';

const Index = () => {
    const {data} = useGetLoaneeDetailsQuery({})

    console.log('data: ', data)

    const headerData = [
        data?.data?.cohortName,
        data?.data?.programName,
        data?.data?.institutionName
    ]
    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader cohort={data?.data?.cohortName} program={data?.data?.programName}/>
           <div className={`flex w-full  max-h-[77vh]  `}>
               <LoaneeLoanDetails/>
               <LoaneeBasicDetails/>
           </div>
        </main>
    );
};

export default Index;