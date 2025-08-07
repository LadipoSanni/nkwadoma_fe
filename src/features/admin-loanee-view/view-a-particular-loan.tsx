'use client'
import React from 'react';
import {useAppSelector} from "@/redux/store";
import {useViewLoanDetailsQuery} from "@/service/users/Loanee_query";
import dynamic from "next/dynamic";
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import LoaneeLoanDetails from "@/components/loanee-my-profile/LoaneeLoanDetails";

const ViewAParticularLoan = dynamic(
    () => Promise.resolve(ViewAParticularLoanContent),
    {ssr: false}
)


const ViewAParticularLoanContent = () => {
    const selectedLoanId = useAppSelector(state => state.selectedLoan.clickedLoanId);
    const {data, isFetching, isLoading} = useViewLoanDetailsQuery(selectedLoanId)


    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
            <LoaneeProfileHeader isLoading={isLoading || isFetching} institutionName={data?.data?.organizationName} cohort={data?.data?.cohortName} program={data?.data?.programName}/>
            <div className={`flex w-full  max-h-[50vh]  `}>
                <LoaneeLoanDetails isLoading={isLoading || isFetching} data={data?.data}/>
                <LoaneeBasicDetails isLoading={isLoading || isFetching} data={data?.data}/>
            </div>
        </main>
    );
};

export default ViewAParticularLoan;