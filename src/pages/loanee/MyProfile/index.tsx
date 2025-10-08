'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
// import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
// import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";
import {useViewLoanDetailsQuery, useViewLoaneeInACohortDetailsQuery} from '@/service/users/Loanee_query';
import dynamic from "next/dynamic";
import {useAppSelector} from "@/redux/store";
// import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
// import DetailsComponent from "@/features/cohort/details/DetailsComponent";
// import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView";
import UnderlineTab from "@/components/UnderlineTab";
import ViewRepayment from "@/components/loanee-my-profile/ViewRepayment";
import {getItemSessionStorage} from "@/utils/storage";
import ViewRepaymentSchedule from "@/components/loanee-my-profile/ViewRepaymentSchedule";

const Index = dynamic(
    () => Promise.resolve(LoaneeDetails),
    {ssr: false}
)

const LoaneeDetails = () => {

    const selectedLoanId = useAppSelector(state => state.selectedLoan.clickedLoanId);
    const {data: viewLoaneeLoanDetails, isFetching:  isFetchingLoaneeLoanDetails, isLoading: isLoadingLoaneeLoanDetails} = useViewLoanDetailsQuery(selectedLoanId)

    const id =  useAppSelector(state => state.organization.loaneeId)
    const cohortId = useAppSelector(state => state.cohort.setCohortId)
    const notificationCohortId = useAppSelector((state) => state.cohort?.notificationCohortId)
    const userRole  = getItemSessionStorage("user_role")

    const  props = {
        loaneeId: id,
        cohortId: notificationCohortId ||  cohortId,
    }
    const  {data, isLoading, isFetching} = useViewLoaneeInACohortDetailsQuery(props)



    const userName = data?.data?.firstName + ' '+ data?.data?.lastName

    // const dropD: ThreeDotTriggerDropDownItemsProps[] = [
    //     {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
    //     {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: ()=> {setOpenDeleteModal(true)}, sx: ``},
    //
    // ]

    const tabTriggers: {name: string; id: string}[] = [
        {name: 'Details', id: 'details'},
        {name: 'Repayment', id: 'repayment'},
        {name: 'Repayment schedule', id: 'repaymentSchedule'},

    ]
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'Details',  displayValue: <div></div>},
        {name: 'Repayment',  displayValue:<ViewRepayment/>},
        {name: 'Repayment schedule',  displayValue:<ViewRepaymentSchedule/>},

    ]

    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader
              userName={userRole !== 'LOANEE' ? userName : '' }
              institutionName={userRole === 'LOANEE' ?   viewLoaneeLoanDetails?.data?.organizationName :''}
              isLoading={userRole !== 'LOANEE' ?  isLoading || isFetching : isFetchingLoaneeLoanDetails || isLoadingLoaneeLoanDetails }
              cohort={userRole === 'LOANEE' ?  viewLoaneeLoanDetails?.data?.cohortName : data?.data?.programName}
              program={userRole === 'LOANEE' ? viewLoaneeLoanDetails?.data?.programName : data?.data?.programName}
          />
           {/*<div className={`flex w-full  max-h-[77vh]  `}>*/}
           {/*    <LoaneeLoanDetails isLoading={isLoading || isFetching} data={data?.data}/>*/}
           {/*    <LoaneeBasicDetails isLoading={isLoading || isFetching} data={data?.data}/>*/}
           {/*</div>*/}
            <div className={`px-4 `}>
                <UnderlineTab defaultTab={'Details'} tabTriggers={tabTriggers} tabValue={tab}/>
            </div>
        </main>
    );
};

export default Index;