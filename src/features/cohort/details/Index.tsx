'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import {useRouter} from "next/navigation";
import CircleThreeDot from "@/reuseable/Dropdown/CircleThreeDot";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import UnderlineTab from "@/components/UnderlineTab";
import DetailsComponent from "@/features/cohort/details/DetailsComponent";
import {useAppSelector} from "@/redux/store";
import {useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView/Index";

const CohortDetails = () => {
    const router = useRouter();
    const cohortId = useAppSelector(store => store?.cohort?.setCohortId)
    const selectedCohortInOrganization = useAppSelector(store => store?.cohort?.selectedCohortInOrganization)

    console.log('selectedCohortInOrganization: ', selectedCohortInOrganization)
    // const cohortsId = sessionStorage.getItem("cohortId") ?? undefined;
    const {data: cohortDetails} = useViewCohortDetailsQuery({
        cohortId: cohortId
    }, {refetchOnMountOrArgChange: true});
    // console.log('cohortDetails: ', cohortDetails)
    const editCohort = ( ) => {

    }

    const deleteCohort = ( ) => {

    }

    const dropD: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
        {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: deleteCohort, sx: ``},

    ]

    const tabTriggers: {name: string; id: string,value: string}[] = [
        {name: 'Details', id: 'details',value: 'details'},
        {name: 'Loanee', id: 'loanees',value: 'loanee'},

    ]
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'details',  displayValue: <DetailsComponent/>},
        {name: 'loanee',  displayValue: <LoaneeInCohortView cohortFee={cohortDetails?.data?.tuitionAmount}/>
        },

    ]

    return (
        <div
            id={'cohortDetails'}
            data-testid={'cohortDetails'}
            className={` px-4 py-4   `}
        >
            <BackButton id={'backToViewAllCohort'} handleClick={() => router.push('/cohort')} text={'Back'} textColor={'#142854'} iconBeforeLetters={true} />
            <div className={` mt-4 mb-4 flex justify-between w-full `}>
                <span id={'cohortName'}
                      data-testid={'cohortName'}
                      className={` text-[28px] text-black `}
                >{selectedCohortInOrganization?.name}</span>
                <CircleThreeDot
                    id={'editAndDeleteCohort'}
                    dotDisplay={'vertical'}
                    isDisabled={false}
                    dropDownItems={dropD}
                />
            </div>
            <UnderlineTab defaultTab={'details'} tabTriggers={tabTriggers} tabValue={tab}/>

        </div>
    );
};

export default CohortDetails;