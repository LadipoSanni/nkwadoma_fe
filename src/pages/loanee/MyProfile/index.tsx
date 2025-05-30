'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import { useGetLoaneeDetailsQuery } from '@/service/users/Loanee_query';

const Index = () => {
    const {data} = useGetLoaneeDetailsQuery({})



    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader cohort={data?.data?.cohortName} program={data?.data?.programName}/>
           <div className={`flex w-full  max-h-[77vh]  `}>
               <LoaneeLoanDetails data={data?.data}/>
               <LoaneeBasicDetails data={data?.data}/>
           </div>
        </main>
    );
};

export default Index;