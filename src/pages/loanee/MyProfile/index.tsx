'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import { useGetLoaneeDetailsQuery } from '@/service/users/Loanee_query';
import dynamic from "next/dynamic";

const Index = dynamic(
    () => Promise.resolve(LoaneeDetails),
    {ssr: false}
)

const LoaneeDetails = () => {
    const {data, isFetching, isLoading} = useGetLoaneeDetailsQuery('')




    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader isLoading={isLoading || isFetching} institutionName={data?.data?.institutionName} cohort={data?.data?.cohortName} program={data?.data?.programName}/>
           <div className={`flex w-full  max-h-[77vh]  `}>
               <LoaneeLoanDetails isLoading={isLoading || isFetching} data={data?.data}/>
               <LoaneeBasicDetails isLoading={isLoading || isFetching} data={data?.data}/>
           </div>
        </main>
    );
};

export default Index;