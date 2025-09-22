'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import {useRouter} from "next/navigation";
import CircleThreeDot from "@/reuseable/Dropdown/CircleThreeDot";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";

const CohortDetails = () => {
    const router = useRouter();

    const editCohort = ( ) => {

    }

    const deleteCohort = ( ) => {

    }

    const dropD: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
        {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: deleteCohort, sx: ``},

    ]

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
                <CircleThreeDot
                    id={''}
                    dotDisplay={'vertical'}
                    isDisabled={false}
                    dropDownItems={dropD}
                />
            </div>
        </div>
    );
};

export default CohortDetails;