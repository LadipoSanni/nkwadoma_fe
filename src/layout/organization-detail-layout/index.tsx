'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";
import {cabinetGrotesk} from "@/app/fonts";
import {store, useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation'
import { organizationDetailTabData } from '@/types/tabDataTypes'


interface props {
    children: React.ReactNode;
}

function  OrganizationDetailLayout({children}:props) {
        const notificationId = useAppSelector(state => (state?.notification?.setNotificationId))
        const notification = useAppSelector(state => (state?.notification?.setNotification))
        const organizationName = useAppSelector(state => (state?.organization?.organizationName))
        const router = useRouter()

      const handleBackButtonClick = () => {
              if (notification === "notification"){
                     store.dispatch(setCurrentNavbarItem("Notification"))
                    router.push(`/notifications/notification/${notificationId}`);
                } else {

                 router.push('/organizations')
         }
             }

  return (
    <div>
        <div className='px-6 md:px-8 md:py-3  py-4'>
        <BackButton id={'backorganizations'} textColor={'meedlBlue'} text={notification === "notification"? "Back to notification" : 'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
        </div>
        <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
            {organizationName}
        </div>
        <div>
    <TabSwitch tabData={organizationDetailTabData} defaultTab='/organizations/detail'>
   {children}
    </TabSwitch>
  </div>
    </div>
  )
}

export default  OrganizationDetailLayout
