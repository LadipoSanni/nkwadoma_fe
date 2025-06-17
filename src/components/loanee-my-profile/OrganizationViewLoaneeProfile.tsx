'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import PmLoaneeLoanDetails from "@/components/loanee-my-profile/PmLoaneeLoanDetails";
import {useRouter} from "next/navigation";
import { useAppSelector } from '@/redux/store';
import {useGetLoaneeDetailsQuery} from "@/service/users/Loanee_query";

const OrganizationViewLoaneeProfile = () => {
    const id =  useAppSelector(state => state.organization.loaneeId)
    const router = useRouter()
    const loaneeId = id
    const  {data, isLoading, isFetching} = useGetLoaneeDetailsQuery(loaneeId)
    const  handleBack = () => {
        router.push('/organizations/loanees/invited')
    }

    const userName = data?.data?.userIdentity?.firstName + ' '+ data?.data?.userIdentity?.lastName
    return (
        <div
            className={` w-full h-full px-4 py-2`}
        >
            <BackButton sx={'pl-5 pt-2 pb-4'} id={'backToViewLoanee'} handleClick={handleBack} iconBeforeLetters={true} textColor={'meedlBlue'} text={'Back'} />
            <LoaneeProfileHeader isLoading={isFetching || isLoading} userName={userName } program={data?.data?.programName} cohort={data?.data?.cohortName}/>
            <div className={`flex w-full  max-h-[65vh]  `}>
                <PmLoaneeLoanDetails isLoading={isFetching || isLoading} loaneeId={loaneeId} data={data?.data} />
                <LoaneeBasicDetails isLoading={isFetching || isLoading} data={data?.data} />
            </div>
        </div>
    );
};

export default OrganizationViewLoaneeProfile;