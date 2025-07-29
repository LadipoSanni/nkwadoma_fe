'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import PmLoaneeLoanDetails from "@/components/loanee-my-profile/PmLoaneeLoanDetails";
import {useRouter} from "next/navigation";
import { useAppSelector } from '@/redux/store';
import { useViewLoaneeInACohortDetailsQuery} from "@/service/users/Loanee_query";

const OrganizationViewLoaneeProfile = () => {
    const id =  useAppSelector(state => state.organization.loaneeId)
    const cohortId = useAppSelector(state => state.cohort.setCohortId)
    const notificationCohortId = useAppSelector((state) => state.cohort?.notificationCohortId)
    const router = useRouter()
    const  props = {
        loaneeId: id,
        cohortId: notificationCohortId ||  cohortId,
    }
    const  {data, isLoading, isFetching} = useViewLoaneeInACohortDetailsQuery(props)
    const  handleBack = () => {
        router.push('/organizations/loanees/uploaded')
    }

    const userName = data?.data?.firstName + ' '+ data?.data?.lastName
    return (
        <div
            className={` w-full h-full px-4 py-2`}
        >
            <BackButton sx={'pl-5 pt-2 pb-4'} id={'backToViewLoanee'} handleClick={handleBack} iconBeforeLetters={true} textColor={'meedlBlue'} text={'Back'} />
            <LoaneeProfileHeader isLoading={isFetching || isLoading} userName={userName } program={data?.data?.programName} cohort={data?.data?.cohortName}/>
            <div className={`flex w-full  max-h-[60vh]  `}>
                <PmLoaneeLoanDetails isLoading={isFetching || isLoading} loaneeId={id} data={data?.data} />
                <LoaneeBasicDetails isLoading={isFetching || isLoading} data={data?.data} />
            </div>
        </div>
    );
};

export default OrganizationViewLoaneeProfile;