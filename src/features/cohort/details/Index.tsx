'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import {useRouter} from "next/navigation";

const CohortDetails = () => {
    const router = useRouter();

    return (
        <div
            id={'cohortDetails'}
            data-testid={'cohortDetails'}
            className={` px-4 py-4   `}
        >
            <BackButton id={'backToViewAllCohort'} handleClick={() => router.push('/cohort')} text={'Back'} textColor={'#142854'} iconBeforeLetters={true} />
            <div className={` flex justify-between w-full `}>
                <span id={'cohortName'}
                      data-testid={'cohortName'}
                      className={` text-[28px] text-black `}
                >Luminary</span>
            </div>
        </div>
    );
};

export default CohortDetails;