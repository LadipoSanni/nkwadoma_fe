'use client'
import React from 'react'
import {store, useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation'
// import {setOrganizationDetail} from "@/redux/slice/organization/organization";
import BackButton from "@/components/back-button";
import {cabinetGroteskBold, cabinetGroteskMediumBold} from "@/app/fonts";
import TabSwitch from '@/layout/tabLayout'
import { loaneeTabData,loaneeIncohortTab } from '@/types/tabDataTypes';
import {useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import SkeletonForDetail from '@/reuseable/Skeleton-loading-state/Skeleton-for-detail';
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";

interface props {
    children: React.ReactNode;
    tab?: string
}

function OrganizationLoaneeLayout({children,tab}:props) {
     const cohortDetails = useAppSelector((state) => state.cohort.selectedCohortInOrganization)
     const notificationCohortId = useAppSelector((state) => state.cohort?.notificationCohortId)
     const cohortName = cohortDetails?.name
      const notificationId = useAppSelector(state => (state?.notification?.setNotificationId))
       const notification = useAppSelector(state => (state?.notification?.setNotification))
     const router = useRouter()

     const {data,isLoading} = useViewCohortDetailsQuery({ cohortId:  notificationCohortId},{skip: ! notificationCohortId})
    
    const notificationCohortName = data?.data?.name

     const handleBackButtonClick = () => {
          if (notification === "notification"){
                 store.dispatch(setCurrentNavbarItem("Notification"))
                router.push(`/notifications/notification/${notificationId}`);
            } else {
            //  store.dispatch(setOrganizationDetail('cohorts'))
            if( tab === "loanBook"){
              router.push('/organizations/loanBook')
            } else {
              router.push('/organizations/cohort')
            }
     }
         }
    const initial: string = `${cohortName?.at(0)}${cohortName?.at(1)}` 
    const notificationCohortInitial =  `${notificationCohortName?.at(0)}${notificationCohortName?.at(1)}`

      
  return (
    <main
    id={'loaneesInACohort'}
    className={'w-full h-full '}
    >
   { isLoading? <div className='relative top-8 px-4'> <SkeletonForDetail/></div> : 
    <div>
       <div
      className='md:px-6 md:py-3 px-4 py-4'
     >
     <BackButton id={'backCohorts'} textColor={'meedlBlue'} text={notification === "notification"? "Back to notification" : tab === "loanBook"? 'Back to loan book' : 'Back to cohort'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
       <div
                      id={'cohortNameAndInitials'}
                      className={` mt-6 flex gap-4  w-full h-fit `}
                  >
                      <div
                          id={'cohortInitials'}
                          className={`w-fit py-3 px-4 h-fit rounded-full bg-[#FEF6F0] text-[#68442E] text-[28px] ${cabinetGroteskBold.className}  h-fit flex justify-center items-center`}
                          data-testid="cohortInitials"
                      >
                          {initial === "undefinedundefined"?  notificationCohortInitial?.toUpperCase()  :initial?.toUpperCase()}
                      </div>
                      <span id={'cohortName'}  data-testid="cohortName" className={`text-[#212221] ${cabinetGroteskMediumBold.className} text-[28px] mt-auto mb-auto `}>{cohortName || notificationCohortName}</span>
      </div> 
     </div>
        <div>
       { tab === "loanBook"?
       
       <TabSwitch tabData={loaneeTabData} defaultTab='/organizations/loanees/uploaded' >
         {children}
         </TabSwitch> : 
          <TabSwitch tabData={loaneeIncohortTab} defaultTab='/organizations/cohort/all' >
          {children}
          </TabSwitch> 
        }
        </div>
        </div>
        }
        
    </main>
  )
}

export default OrganizationLoaneeLayout
