
import React,{useEffect} from 'react'
import {inter} from "@/app/fonts"
import { Button } from '@/components/ui/button'
import { getInitials } from '@/utils/GlobalMethods';
import SkeletonforNotificationDetails from '@/reuseable/Skeleton-loading-state/Skeleton-for-notification-details';
import BackButton from '@/components/back-button';
import { useRouter } from 'next/navigation';
import { useViewNotificationDetailsQuery } from '@/service/notification/notification_query';
import {store} from "@/redux/store";
import { setCurrentFinancierId} from '@/redux/slice/financier/financier';
import { setNotification,resetNotification,setNotificationId,setNotificationFlag } from '@/redux/slice/notification/notification';
import { setMarketInvestmentVehicleId } from "@/redux/slice/investors/MarketPlaceSlice";
import { setOrganizationId} from '@/redux/slice/organization/organization';
import { setLoanOfferId } from '@/redux/slice/loan/loan-offer';
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";
import { setLoanReferralId } from '@/redux/slice/loan/selected-loan';
import {setCurrentStep} from "@/service/users/loanRerralSlice";
import { setNotificationCohortId,resetSelectedCohortInOrganization } from '@/redux/slice/create/cohortSlice';
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import { setRequestStatusTab,setIsRequestedStaffOpen,setRequestedStaffId,setIsRequestedOrganizationOpen,setrequestOrganizationStatusTab,setRequestedOrganizationId,setIsStaffOpen } from '@/redux/slice/staff-and-request/request';


interface notificationIdProp {
  notificationId: string;
}

function NotificationDetailPage({notificationId}: notificationIdProp) {
   const user_role = getUserDetailsFromStorage('user_role');
  const router = useRouter();
  const handleBack = () => {
    router.back()
  }

    useEffect(()=> {
        store.dispatch(resetNotification())
    })


  const {data:notification,isLoading} = useViewNotificationDetailsQuery(notificationId,{skip: !notificationId})

  const handleRoute = () => {
      store.dispatch(setNotification("notification"))
      store.dispatch(setNotificationId(notification?.data?.id))
     if(notification?.data?.notificationFlag === "INVITE_FINANCIER"){
        store.dispatch(setCurrentFinancierId(notification?.data?.contentId))
        store.dispatch(setCurrentNavbarItem("Financier"))
        router.push("/funds/financier-details")
     }else if (notification?.data?.notificationFlag === "INVESTMENT_VEHICLE") {
         store.dispatch(setMarketInvestmentVehicleId({marketInvestmentVehicleId:notification?.data?.contentId }))
         store.dispatch(setCurrentNavbarItem("Investment vehicle"))
         router.push("/marketplace/details");
     }else if (notification?.data?.notificationFlag === "INVITE_ORGANIZATION" || notification?.data?.notificationFlag === "ORGANIZATION_DEACTIVATED" || notification?.data?.notificationFlag === "ORGANIZATION_REACTIVATED") {
      store.dispatch(setOrganizationId(notification?.data?.contentId))
      // store.dispatch(setOrganizationDetail("details"))
      store.dispatch(setCurrentNavbarItem("Organizations"))
      router.push("/organizations/detail");
  } else if (notification?.data?.notificationFlag === "LOAN_OFFER"){
      store.dispatch(setLoanOfferId(notification?.data?.contentId))
      store.dispatch(setCurrentNavbarItem("Loan offer"))
      router.push("/accept-loan-offer");
  } else if(notification?.data?.notificationFlag === "LOAN_OFFER_DECISION"){
     store.dispatch(setCurrentNavbarItem("Loan"))
     router.push(`/loan-offer-details?id=${notification?.data?.contentId}`);
  } else if(notification?.data?.notificationFlag === "LOAN_REFERRAL"){
    store.dispatch(setCurrentNavbarItem("Loan refferral"))
    store.dispatch(setLoanReferralId(notification?.data?.contentId))
       router.push(`/onboarding`);
       store.dispatch(setCurrentStep(0))
  } else if( notification?.data?.notificationFlag === "LOANEE_DATA_UPLOAD_SUCCESS" || notification?.data?.notificationFlag === "LOANEE_DATA_UPLOAD_FAILURE"){
    store.dispatch(setNotificationCohortId(notification?.data?.contentId))
    store.dispatch(resetSelectedCohortInOrganization())
    store.dispatch(setCurrentNavbarItem("Organizations"))
    store.dispatch(setNotificationFlag(notification?.data?.notificationFlag))
    router.push(`/organizations/loanees/uploaded`);
   
  } else if(notification?.data?.notificationFlag === "REPAYMENT_UPLOAD_SUCCESS" ){
    store.dispatch(setCurrentNavbarItem("Repayment"))
    router.push(`/repayment`);
  }else if((user_role === "MEEDL_SUPER_ADMIN" || user_role === "MEEDL_ADMIN") && notification?.data?.notificationFlag === "INVITE_COLLEAGUE" ){
    store.dispatch(setRequestStatusTab("pending"))
    store.dispatch(setIsRequestedStaffOpen(true))
    store.dispatch(setRequestedStaffId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Requests"))
    router.push(`/requests/staff`);
  }else if(notification?.data?.notificationFlag === "APPROVE_INVITE_ORGANIZATION"){
    store.dispatch(setrequestOrganizationStatusTab("pending"))
    store.dispatch(setIsRequestedOrganizationOpen(true))
    store.dispatch(setRequestedOrganizationId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Requests"))
    router.push(`/requests/organization`);
  }else if(notification?.data?.notificationFlag === "ORGANIZATION_INVITATION_DECLINED"  || notification?.data?.notificationFlag ===  "ORGANIZATION_INVITATION_APPROVED"){
    store.dispatch(setOrganizationId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Organizations"))
    router.push("/organizations/detail");
  }else if(user_role === "ORGANIZATION_SUPER_ADMIN"  && notification?.data?.notificationFlag === "INVITE_COLLEAGUE" ){
    store.dispatch(setRequestStatusTab("pending"))
    store.dispatch(setIsRequestedStaffOpen(true))
    store.dispatch(setRequestedStaffId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Requests"))
    router.push(`/organizations/request`);
  }else if(user_role === "COOPERATE_FINANCIER_SUPER_ADMIN"  && notification?.data?.notificationFlag === "INVITE_COLLEAGUE" ){
    store.dispatch(setRequestStatusTab("pending"))
    store.dispatch(setIsRequestedStaffOpen(true))
    store.dispatch(setRequestedStaffId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Requests"))
    router.push(`/request`);
  }else if(user_role === "MEEDL_ADMIN"  && ["DECLINE_COLLEAGUE_INVITE","APPROVE_COLLEAGUE_INVITE_"].includes( notification?.data?.notificationFlag) ){
    store.dispatch(setIsStaffOpen(true))
    store.dispatch(setRequestedStaffId(notification?.data?.contentId))
    store.dispatch(setCurrentNavbarItem("Settings"))
    router.push(`/settings/team`);
  }
  }
   
  const user = ["COOPERATE_FINANCIER_SUPER_ADMIN", "MEEDL_ADMIN","MEEDL_SUPER_ADMIN"].includes(user_role || "")

   const buttonName = () => {
    if(notification?.data?.notificationFlag === "INVITE_FINANCIER"){
      return "financier"
   } else if (notification?.data?.notificationFlag === "INVESTMENT_VEHICLE"){
      return "investment vehicle"
   } else if (["INVITE_ORGANIZATION","ORGANIZATION_DEACTIVATED","ORGANIZATION_REACTIVATED","ORGANIZATION_INVITATION_DECLINED","ORGANIZATION_INVITATION_APPROVED"].includes(notification?.data?.notificationFlag)){
    return "organization"
 }else if (notification?.data?.notificationFlag === "LOAN_OFFER"){
   return "loan offer"
 }else if (notification?.data?.notificationFlag === "LOAN_OFFER_DECISION"){
  return "loan offer"
} else if(notification?.data?.notificationFlag === "LOAN_REFERRAL"){
  return "loan Referral"
} else if(user && notification?.data?.notificationFlag === "INVITE_COLLEAGUE" ){
  return "Request"
}else if((user_role === "MEEDL_SUPER_ADMIN" || user_role === "MEEDL_ADMIN") && notification?.data?.notificationFlag === "APPROVE_INVITE_ORGANIZATION" ){
  return "Request"
}else if(user_role === "ORGANIZATION_SUPER_ADMIN" && notification?.data?.notificationFlag === "INVITE_COLLEAGUE" ){
  return "Request"
}
    
   }


  return (
    <div className={`w-full pr-9 md:pr-2 py-4 px-4 md:px-0 ${inter.className}`}>

      {!notificationId ? <div className='flex justify-center items-center'>Not found</div> : isLoading? <div><SkeletonforNotificationDetails/></div> :
      <div>
      <div className='md:hidden mt-3 mb-7'>
        <BackButton 
      id="notificationBackButton" 
      handleClick={handleBack} textColor='' 
      iconBeforeLetters={true}
      text='Back'
      />
      </div>
      <p className="font-medium">
                    {notification?.data?.title}
     </p>
      <div className='text-[14px]'>
                        <div className="flex items-center">
                         <div className='flex gap-3 mt-5 mb-6'>
                           <div className="w-8 h-8 bg-[#E7F5EC] text-[16px] text-[#085322] rounded-full flex items-center justify-center">
                             <span className="text-sm font-medium">
                               {getInitials(notification?.data?.senderFullName || "")}
                             </span>
                           </div>
                            <div>
                              <p className='text-[14px]'>
                               {notification?.data?.senderMail}
                               </p>
                              <p className='text-[14px] text-[#475467]'>
                               {notification?.data?.duration}
                               </p>
                            </div>
                           </div>
                         </div>
                         <div 
                         className='max-h-[57vh] w-full  overflow-y-auto'
                         style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',

                      }}
                         >
                         <div className='mb-4'>
                           Hello <span>
                             {notification?.data?.firstName}
                             </span>,
                         </div>
                        <div>
                        <p className=" lowercase first-letter:uppercase">
                         {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.message} */}
                         {notification?.data?.contentDetail}.
                         </p>
                        </div>
                        <div className='mt-4 mb-4'>
                        {!(notification?.data?.notificationFlag === "REPAYMENT_UPLOAD_FAILURE" || 
   notification?.data?.notificationFlag === "LOANEE_DATA_UPLOAD_FAILURE") ? 
  <p className='mb-4'>Click on the button to view the full details of the <span className='lowercase'>{notification?.data?.title}</span></p>
  : ""
}
                         <p>If you have any questions or need further assistance, our customer service team is here to help</p>
                        </div>
                         <div>
                         {notification?.data?.notificationFlag !== "REPAYMENT_UPLOAD_FAILURE"? 
                          <Button 
                           type='button'
                           variant={'secondary'}
                           onClick={handleRoute}
                           className='h-[45px] text-[14px]'
                            // className='bg-[#F9F9F9] hover:bg-[#F9F9F9] text-grey100 h-[45px] text-[14px] cursor-none shadow-none'
                           >
                             View <span className='lowercase ml-1'> {buttonName()}</span>
                             
                           </Button>
                          :  "" } 
                         </div>
                         </div>
                        </div>
    </div>
}
    </div>
  )
}

export default NotificationDetailPage;
