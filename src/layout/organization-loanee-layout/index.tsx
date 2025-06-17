'use client'
import React from 'react'
import {store, useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation'
import {setOrganizationDetail} from "@/redux/slice/organization/organization";
import BackButton from "@/components/back-button";
import {cabinetGroteskBold, cabinetGroteskMediumBold} from "@/app/fonts";
import TabSwitch from '@/layout/tabLayout'
import { loaneeTabData } from '@/types/tabDataTypes';

interface props {
    children: React.ReactNode;
}

function OrganizationLoaneeLayout({children}:props) {
     const cohortDetails = useAppSelector((state) => state.cohort.selectedCohortInOrganization)
     const cohortName = cohortDetails?.name
     const router = useRouter()

     const handleBackButtonClick = () => {
             store.dispatch(setOrganizationDetail('cohorts'))
             router.push('/organizations/details')
         }
    const initial: string = `${cohortName?.at(0)}${cohortName?.at(1)}`
     
  return (
    <main
    id={'loaneesInACohort'}
    className={'w-full h-full '}
    >
     <div
      className='md:px-6 md:py-3 px-4 py-4'
     >
     <BackButton id={'backCohorts'} textColor={'meedlBlue'} text={'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
       <div
                      id={'cohortNameAndInitials'}
                      className={` mt-6 flex gap-4  w-full h-fit `}
                  >
                      <div
                          id={'cohortInitials'}
                          className={`w-fit py-3 px-4 h-fit rounded-full bg-[#FEF6F0] text-[#68442E] text-[28px] ${cabinetGroteskBold.className}  h-fit flex justify-center items-center`}
                          data-testid="cohortInitials"
                      >
                          {initial?.toUpperCase()}
                      </div>
                      <span id={'cohortName'}  data-testid="cohortName" className={`text-[#212221] ${cabinetGroteskMediumBold.className} text-[28px] mt-auto mb-auto `}>{cohortName}</span>
      </div> 
     </div>
        <div>
         <TabSwitch tabData={loaneeTabData} defaultTab='/organizations/loanees/uploaded'>
         {children}
         </TabSwitch>
        </div>

    </main>
  )
}

export default OrganizationLoaneeLayout
