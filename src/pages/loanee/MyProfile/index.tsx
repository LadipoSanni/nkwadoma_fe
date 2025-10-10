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
import LoaneeLoanDetails from "@/components/loanee-my-profile/LoaneeLoanDetails";
import {inter} from "@/app/fonts";
import styles from '@/components/loanee-my-profile/index.module.css'

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


    // console.log('data: ', data)
    // console.log('viewLoaneeLoanDetails : ', viewLoaneeLoanDetails)

    const userName = data?.data?.firstName + ' '+ data?.data?.lastName

    // const dropD: ThreeDotTriggerDropDownItemsProps[] = [
    //     {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
    //     {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: ()=> {setOpenDeleteModal(true)}, sx: ``},
    //
    // ]
    // const documentData = [
    //     {label:"Mandate",value:'' },
    //     {label:"Loan terms and condition",value:''},
    //     {label:"Loan disbursement terms",value:'' }
    // ]

    const nextOfFullName = data?.data?.nextOfKinFirstName + ' ' + data?.data?.nextOfKinLastName

    const basicDetails = [
        {label: 'Gender', value: `${data?.data?.gender ? data?.data?.datagender : 'Not provided'}`},
        {label: 'Date of birth', value: `${data?.data?.dateOfBirth ? data?.data?.dateOfBirth : 'Not provided'}`},
        {label: 'Marital status', value: `${data?.data?.maritalStatus ? data?.data?.maritalStatus : 'Not provided'}`},
        {label: 'Nationality', value: `${data?.data?.nationality ? data?.data?.nationality : 'Not provided'}`},
        {label: 'State of origin ', value: `${data?.data?.stateOfOrigin ? data?.data?.stateOfOrigin : 'Not provided'}`},
        {label: 'State of residence', value: `${data?.data?.stateOfResidence ? data?.data?.stateOfResidence : 'Not provided'}`},
        {label: 'Residential address', value: `${data?.data?.residentialAddress ? data?.data?.residentialAddress : 'Not provided'}`},
        {label: 'Phone number', value: `${data?.data?.phoneNumber ? data?.data?.phoneNumber : 'Not provided'}`},
        {label: 'Alternate residential address', value: `${data?.data?.residentialAddress ? data?.data?.residentialAddress : 'Not provided'}`},
        {label: 'Alternate email address', value: `${data?.alternateEmail? data?.data?.alternateEmail : 'Not provided'}`},
        {label: 'Next of kin full name', value: nextOfFullName},
        {label: 'Next of kin phone number', value: `${data?.data?.nextOfKinPhoneNumber ? data?.data?.nextOfKinPhoneNumber : 'Not provided'}`},
        {label: 'Next of kin residential address', value: `${data?.data?.nextOfKinResidentialAddress ? data?.data?.nextOfKinResidentialAddress : 'Not provided'}`},
        {label: 'Next of kin relationship ', value: `${data?.data?.nextOfKinRelationship ? data?.data?.nextOfKinRelationship : 'Not provided'}`},
        {label: 'Highest level of education ', value: `${data?.highestLevelOfEducation ? data?.data?.highestLevelOfEducation : `Not provided`}`},
        {label: 'Institution name ', value: `${data?.data?.organizationName ? data?.data?.organizationName : 'Not provided'}`},
        {label: 'Program of study ', value: `${data?.data?.programName ? data?.data?.programName : 'Not provided'}`},

    ]

    const loaneeBioDa = ()  => {
        return(
            <div className={` bg-grey105 ${isLoading ? 'animate-pulse ' : ''}  w-full rounded-md  `}>
                {basicDetails?.map((item, index) => (
                    <li key={"key" + index} className={'p-4  grid gap-9 rounded-md'}>
                        <div
                            className={`md:flex md:justify-between ${isLoading ? 'animate-pulse hidden ' : ''}  md:items-center md:gap-0 grid gap-3 `}>
                            <div
                                id={'name:'+item.label}
                                className={` ${isLoading ? 'animate-pulse hidden ' : ''}  ${inter.className} break-all md:max-w-[40%] text-black300 text-[14px] `}>{item.label}</div>
                            <div
                                id={'name:'+item.value}
                                className={` ${isLoading ? 'animate-pulse hidden ' : ''}  ${inter.className} break-all md:max-w-[50%]   text-black500 text-[14px] `}> {item.value ? item.value : 'Not provided'}</div>
                        </div>
                    </li>
                ))
                }
            </div>
        )
    }

    const loaneeBioDataTabTrigger: {name: string; id: string} = {name: 'Bio details', id: 'bioDetails'};

    const tabTriggers: {name: string; id: string}[] = [
        {name: 'Details', id: 'details'},
        {name: 'Repayment', id: 'repayment'},
        {name: 'Repayment schedule', id: 'repaymentSchedule'},
        ...(userRole !== "LOANEE" ? [loaneeBioDataTabTrigger] : []),

    ]
    const loaneeBioDataTab :  {name: string; displayValue: React.ReactNode} = {name: 'Bio details', displayValue: <div className={` md:max-h-[60vh]  grid gap-4 w-full  ${styles.container}`}>{loaneeBioDa()}</div>}
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'Details',  displayValue: <LoaneeLoanDetails loaneeViewDetails={viewLoaneeLoanDetails?.data} data={data?.data} isLoading={false} />},
        {name: 'Repayment',  displayValue:<ViewRepayment loanId={userRole !== 'LOANEE'? data?.data?.loanId : viewLoaneeLoanDetails?.data?.loanId}/>},
        {name: 'Repayment schedule',  displayValue:<ViewRepaymentSchedule/>},
        ...(userRole !== "LOANEE" ? [loaneeBioDataTab] : []),


    ]

    return (
        <main
            id={'loaneeProfileHeader'}
            className={`w-full  h-full`}
            data-testid={'loaneeProfileHeader'}
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
            <div id={'underline'} data-testid={'underline'} className={`px-4 `}>
                <UnderlineTab defaultTab={'Details'} tabTriggers={tabTriggers} tabValue={tab}/>
            </div>
        </main>
    );
};

export default Index;