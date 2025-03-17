
import React from 'react'
import {inter} from "@/app/fonts"
import { Button } from '@/components/ui/button'
import { getInitials } from '@/utils/GlobalMethods';
import SkeletonforNotificationDetails from '@/reuseable/Skeleton-loading-state/Skeleton-for-notification-details';
import BackButton from '@/components/back-button';
import { useRouter } from 'next/navigation';
import { useViewNotificationDetailsQuery } from '@/service/notification/notification_query';


// interface NotificationDetailsPageProps{
//     notification?: NotificationProps
// }

interface notificationIdProp {
  notificationId: string;
}

function NotificationDetailPage({notificationId}: notificationIdProp) {
  
  const router = useRouter();
  const handleBack = () => {
    router.back()
  }

  const {data:notification,isLoading} = useViewNotificationDetailsQuery(notificationId,{skip: !notificationId})


  return (
    <div className={`w-full pr-9 md:pr-16 ${inter.className}`}>
      { isLoading? <div><SkeletonforNotificationDetails/></div> :
      <div>
      <div className='md:hidden mt-3 mb-7'>
        <BackButton 
      id="notificationBackButton" 
      handleClick={handleBack} textColor='' 
      iconRight={true}
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
                         <div className='mb-4'>
                           Hello <span>
                             {notification?.data?.firstName}
                             </span>,
                         </div>
                        <div>
                        <p className="md">
                         {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.message} */}
                         {notification?.data?.contentDetail}
                         </p>
                        </div>
                        <div className='mt-4 mb-4'>
                         {notification?.data?.callToAction === true? (<p className='mb-4'>Click on the button to view the full details of the <span className='lowercase'>{notification?.data?.title}</span></p>): ""}
                         <p>If you have any question or further assistance, our customer service team is here to help you</p>
                        </div>
                         <div>
                          {notification?.data?.callToAction === true?
                          <Button 
                           // className='bg-[#142854] hover:bg-[#142854] h-[45px] text-[14px]'
                            className='bg-[#F9F9F9] hover:bg-[#F9F9F9] text-grey100 h-[45px] text-[14px] cursor-none shadow-none'
                           >
                             View <span className='lowercase ml-1'> {notification?.data?.title}</span>
                             
                           </Button>
                           : ""}
                         </div>
                        </div>
    </div>
}
    </div>
  )
}

export default NotificationDetailPage;
