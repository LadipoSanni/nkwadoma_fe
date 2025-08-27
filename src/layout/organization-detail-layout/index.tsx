'use client'
import React,{useState} from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";
import {cabinetGrotesk} from "@/app/fonts";
import {store, useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation'
import { organizationDetailTabData } from '@/types/tabDataTypes'
import Kebab from "@/reuseable/Kebab/Kebab";
import { FiMoreVertical } from 'react-icons/fi';
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from "@radix-ui/react-icons";
import ActivateOrganization from "@/components/portfolio-manager/organization/ActivateOrganization";
import DeactivateOrganization from "@/components/portfolio-manager/organization/DeactivateOrganization";

interface props {
    children: React.ReactNode;
}

function  OrganizationDetailLayout({children}:props) {
        const notificationId = useAppSelector(state => (state?.notification?.setNotificationId))
        const notification = useAppSelector(state => (state?.notification?.setNotification))
        const organizationName = useAppSelector(state => (state?.organization?.organizationName))
        const organizationId = useAppSelector(state => (state?.organization?.setOrganizationId))
        const organizationTabStatus = useAppSelector(state => (state?.organization?.organizationStatus))
        const user_role = getUserDetailsFromStorage('user_role')
        const [isOpen,setOpen] = useState(false)
        const router = useRouter()

      const handleBackButtonClick = () => {
              if (notification === "notification"){
                     store.dispatch(setCurrentNavbarItem("Notification"))
                    router.push(`/notifications/notification/${notificationId}`);
                } else {

                 router.push('/organizations')
         }
             }


        const dropdownOption = [
          organizationTabStatus === "ACTIVE"?  {
                name: "Deactivate",
                id: "3"
            } : 
            {
                 name: "Activate",
                 id: "1"
            }
        ]

        const handleDropdownClick = () => {
            setOpen(true)
        }

  return (
    <div>
        <div className='px-6 md:px-8 md:py-3  py-4'>
        <BackButton id={'backorganizations'} textColor={'meedlBlue'} text={notification === "notification"? "Back to notification" : 'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
        </div>
        <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
            {organizationName}
        </div>
        <div className={`relative  ${["MEEDL_SUPER_ADMIN"].includes(user_role || "") &&  organizationTabStatus !== "INVITED" ?  "bottom-10" : "bottom-0"}`}>
          {[ "MEEDL_SUPER_ADMIN"].includes(user_role || "") &&  organizationTabStatus !== "INVITED"  &&  <div className='flex justify-end px-6 relative '>
                <div className='bg-[#F6F6F6] rounded-full w-8 h-8 flex items-center justify-center'>
                <Kebab
                handleDropDownClick={handleDropdownClick}
                kebabOptions={dropdownOption}
                 icon={FiMoreVertical}
                 className='mt-0'
                />
                </div>
            </div>}
    <TabSwitch tabData={organizationDetailTabData} defaultTab='/organizations/detail'>
   {children}
    </TabSwitch>
  </div>
   <div>
     <Modal
       isOpen={isOpen}
       closeModal={() => {
        setOpen(false)
      }}
       icon={Cross2Icon}
       width='36%'
       closeOnOverlayClick={true}
       headerTitle={organizationTabStatus === "ACTIVE"?'Deactivate reason' : "Reactivate reason"}
      >
  {
    organizationTabStatus === "ACTIVE"? 
    <DeactivateOrganization 
    setIsOpen={setOpen}
    id={organizationId}
    /> : 
    <ActivateOrganization
    setIsOpen={setOpen}
    id={organizationId}
    />
  }
     </Modal>
   </div>
    </div>
  )
}

export default  OrganizationDetailLayout
