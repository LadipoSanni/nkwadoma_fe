'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
// import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
// import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import { useViewLoanDetailsQuery} from '@/service/users/Loanee_query';
import dynamic from "next/dynamic";
import {useAppSelector} from "@/redux/store";
// import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
// import DetailsComponent from "@/features/cohort/details/DetailsComponent";
// import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView";
import UnderlineTab from "@/components/UnderlineTab";
import ViewRepayment from "@/components/loanee-my-profile/ViewRepayment";

const Index = dynamic(
    () => Promise.resolve(LoaneeDetails),
    {ssr: false}
)

const LoaneeDetails = () => {

    const selectedLoanId = useAppSelector(state => state.selectedLoan.clickedLoanId);
    const {data, isFetching, isLoading} = useViewLoanDetailsQuery(selectedLoanId)


    // const dropD: ThreeDotTriggerDropDownItemsProps[] = [
    //     {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
    //     {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: ()=> {setOpenDeleteModal(true)}, sx: ``},
    //
    // ]

    const tabTriggers: {name: string; id: string,value: string}[] = [
        {name: 'Details', id: 'details',value: 'details'},
        {name: 'Repayment', id: 'repayment',value: 'repayment'},
        {name: 'Repayment schedule', id: 'repaymentSchedule',value: 'repayment schedule'},

    ]
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'Details',  displayValue: <div></div>},
        {name: 'repayment',  displayValue:<ViewRepayment/>},
        {name: 'Repayment schedule',  displayValue:<div></div>},

    ]

    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader isLoading={isLoading || isFetching} institutionName={data?.data?.organizationName} cohort={data?.data?.cohortName} program={data?.data?.programName}/>
           {/*<div className={`flex w-full  max-h-[77vh]  `}>*/}
           {/*    <LoaneeLoanDetails isLoading={isLoading || isFetching} data={data?.data}/>*/}
           {/*    <LoaneeBasicDetails isLoading={isLoading || isFetching} data={data?.data}/>*/}
           {/*</div>*/}
            <div className={`px-4 `}>
                <UnderlineTab defaultTab={'details'} tabTriggers={tabTriggers} tabValue={tab}/>
            </div>
        </main>
    );
};

export default Index;