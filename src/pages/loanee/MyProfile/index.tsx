'use client'
import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import {useViewLoanDetailsQuery, useViewLoaneeInACohortDetailsQuery} from '@/service/users/Loanee_query';
import dynamic from "next/dynamic";
import {useAppSelector} from "@/redux/store";
import UnderlineTab from "@/components/UnderlineTab";
import ViewRepayment from "@/components/loanee-my-profile/ViewRepayment";
import {getItemSessionStorage} from "@/utils/storage";
import ViewRepaymentSchedule from "@/components/loanee-my-profile/ViewRepaymentSchedule";
import LoaneeLoanDetails from "@/components/loanee-my-profile/LoaneeLoanDetails";
import {inter} from "@/app/fonts";
import styles from '@/components/loanee-my-profile/index.module.css'
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";

const Index = dynamic(
    () => Promise.resolve(LoaneeDetails),
    {ssr: false}
)

interface IndexProps {
    isViewingOrganizationLoaneeLoansThrowCohortFlow?: boolean
}

const LoaneeDetails = ({isViewingOrganizationLoaneeLoansThrowCohortFlow}: IndexProps) => {

    const selectedLoanId = useAppSelector(state => state.selectedLoan.clickedLoanId);
    const {data: viewLoaneeDisbursedLoanDetails, isFetching:  isFetchingLoaneeLoanDetails, isLoading: isLoadingLoaneeLoanDetails} = useViewLoanDetailsQuery(selectedLoanId, {skip: isViewingOrganizationLoaneeLoansThrowCohortFlow})


    const id =  useAppSelector(state => state.organization.loaneeId)
    const cohortId = useAppSelector(state => state.cohort.setCohortId)
    const notificationCohortId = useAppSelector((state) => state.cohort?.notificationCohortId)
    const userRole  = getItemSessionStorage("user_role")

    const  props = {
        loaneeId: id,
        cohortId: notificationCohortId ||  cohortId,
    }
    const  {data, isLoading, isFetching} = useViewLoaneeInACohortDetailsQuery(props, {skip:!isViewingOrganizationLoaneeLoansThrowCohortFlow})

    const userName = isViewingOrganizationLoaneeLoansThrowCohortFlow ?   data?.data?.firstName + ' '+ data?.data?.lastName :  viewLoaneeDisbursedLoanDetails?.data?.firstName + ' '+ viewLoaneeDisbursedLoanDetails?.data?.lastName ;



    const nextOfFullName = isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.nextOfKinFirstName + '' + data?.data?.nextOfKinLatName : ''  + ' ' + viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.firstName ? viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.lastName : '';

    const basicDetails = [
        {label: 'Gender', value: `${ isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.gender ? data?.data?.gender : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.gender ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.gender : 'Not provided'}`},
        {label: 'Date of birth', value: `${ isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.dateOfBirth ?  dayjs(data?.data?.dateOfBirth?.toString()).format('MMM D, YYYY') : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.dateOfBirth ? dayjs(viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.dateOfBirth?.toString()).format("MMM D, YYYY") : 'Not provided'}`},
        {label: 'Marital status', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.maritalStatus ? data?.data?.maritalStatus : 'Not provided' :  viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.maritalStatus ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.maritalStatus : 'Not provided'}`},
        {label: 'Nationality', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.nationality ? data?.data?.nationality : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.nationality ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.nationality : 'Not provided' }`},
        {label: 'State of origin ', value: `${ isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.stateOfOrigin ? data?.data?.stateOfOrigin : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.stateOfOrigin ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.stateOfOrigin : 'Not provided'}`},
        {label: 'State of residence', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.stateOfResidence ? capitalizeFirstLetters(data?.data?.stateOfResidence) : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.stateOfResidence ? capitalizeFirstLetters(viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.stateOfResidence) : 'Not provided'}`},
        {label: 'Residential address', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.residentialAddress ? data?.data?.residentialAddress : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.residentialAddress ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.residentialAddress : 'Not provided' }`},
        {label: 'Phone number', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.phoneNumber ? data?.data?.phoneNumber : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.phoneNumber ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.phoneNumber : 'Not provided' }`},
        {label: 'Alternate residential address', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.residentialAddress ? data?.data?.residentialAddress : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.alternateContactAddress ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.alternateContactAddress : 'Not provided' }`},
        {label: 'Alternate email address', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.alternateEmail? data?.data?.alternateEmail : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.gender ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.alternateEmail : 'Not provided' }`},
        {label: 'Next of kin full name', value: nextOfFullName},
        {label: 'Next of kin phone number', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.nextOfKinPhoneNumber ? data?.data?.nextOfKinPhoneNumber : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.phoneNumber ? viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.phoneNumber : 'Not provided'}`},
        {label: 'Next of kin residential address', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.nextOfKinResidentialAddress ? data?.data?.nextOfKinResidentialAddress : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.contactAddress ? viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.contactAddress : 'Not provided' }`},
        {label: 'Next of kin relationship ', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.nextOfKinRelationship ? data?.data?.nextOfKinRelationship : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.nextOfKinRelationship ? viewLoaneeDisbursedLoanDetails?.data?.nextOfKin?.nextOfKinRelationship : 'Not provided' }`},
        {label: 'Highest level of education ', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.highestLevelOfEducation ? data?.data?.highestLevelOfEducation : `Not provided` : viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.levelOfEduction ? viewLoaneeDisbursedLoanDetails?.data?.userIdentity?.levelOfEduction : 'Not provided' }`},
        {label: 'Institution name ', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.organizationName ? data?.data?.organizationName : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.organizationName ? viewLoaneeDisbursedLoanDetails?.data?.organizationName : 'Not provided' }`},
        {label: 'Program of study ', value: `${isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.programName ? data?.data?.programName : 'Not provided' : viewLoaneeDisbursedLoanDetails?.data?.programName ? viewLoaneeDisbursedLoanDetails?.data?.programName : 'Not provided' }`},

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
        {name: 'Details',  displayValue: <LoaneeLoanDetails isViewingOrganizationLoaneeLoans={isViewingOrganizationLoaneeLoansThrowCohortFlow}  data={isViewingOrganizationLoaneeLoansThrowCohortFlow ?  data?.data : viewLoaneeDisbursedLoanDetails?.data } isLoading={false} />},
        {name: 'Repayment',  displayValue:<ViewRepayment loanId={isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.loanId :viewLoaneeDisbursedLoanDetails?.data?.id } />},
        {name: 'Repayment schedule',  displayValue:<ViewRepaymentSchedule loanId={isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.loanId : viewLoaneeDisbursedLoanDetails?.data?.id }/>},
        ...(userRole !== "LOANEE" ? [loaneeBioDataTab] : []),


    ]

    return (
        <main
            id={'loaneeProfileHeader'}
            className={`w-full  h-full`}
            data-testid={'loaneeProfileHeader'}
        >
          <LoaneeProfileHeader
              userName={ userRole !== 'LOANEE' ? userName : '' }
              institutionName={userRole === 'LOANEE' ?   viewLoaneeDisbursedLoanDetails?.data?.organizationName :''}
              isLoading={isViewingOrganizationLoaneeLoansThrowCohortFlow ?  isLoading || isFetching : isFetchingLoaneeLoanDetails || isLoadingLoaneeLoanDetails }
              cohort={isViewingOrganizationLoaneeLoansThrowCohortFlow ?  data?.data?.programName : viewLoaneeDisbursedLoanDetails?.data?.cohortName }
              program={isViewingOrganizationLoaneeLoansThrowCohortFlow ? data?.data?.programName : viewLoaneeDisbursedLoanDetails?.data?.programName }
          />
            <div id={'underline'} data-testid={'underline'} className={`px-4 `}>
                <UnderlineTab defaultTab={'Details'} tabTriggers={tabTriggers} tabValue={tab}/>
            </div>
        </main>
    );
};

export default Index;