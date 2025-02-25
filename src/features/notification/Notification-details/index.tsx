
import React from 'react'
import {inter} from "@/app/fonts"
import { Button } from '@/components/ui/button'
// import { notificationMockData } from '@/utils/Notification_mock-data';
import { getInitials } from '@/utils/GlobalMethods';


interface NotificationProps{
    id: string,
    type: string,
    subtitle: string,
    message: string,
    read: boolean,
    senderName: string,
    senderEmail: string;
    timeSent?: string;
    receiverName?: string
    callToActionRequired?: boolean
}

interface NotificationDetailsPageProps{
    notification?: NotificationProps
}

function NotificationDetailPage({notification}: NotificationDetailsPageProps) {
  return (
    <div className={`w-full pr-9 md:pr-16 ${inter.className}`}>
      <p className="font-medium">
                    {notification?.type}
     </p>
      <div className='text-[14px]'>
                        <div className="flex items-center">
                         <div className='flex gap-3 mt-5 mb-6'>
                           <div className="w-8 h-8 bg-[#E7F5EC] text-[16px] text-[#085322] rounded-full flex items-center justify-center">
                             <span className="text-sm font-medium">
                               {getInitials(notification?.senderName || "")}
                             </span>
                           </div>
                            <div>
                              <p className='text-[14px]'>
                               {notification?.senderEmail}
                               </p>
                              <p className='text-[14px] text-[#475467]'>
                               {notification?.timeSent}
                               </p>
                            </div>
                           </div>
                         </div>
                         <div className='mb-4'>
                           Hello <span>
                             {notification?.receiverName}
                             </span>,
                         </div>
                        <div>
                        <p className="md">
                         {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.message} */}
                         {notification?.message}
                         </p>
                        </div>
                        <div className='mt-4 mb-4'>
                         {notification?.callToActionRequired === true? (<p className='mb-4'>Click on the button to view the full details of your loan</p>): ""}
                         <p>If you have any question or further assistance, our customer service team is here to help you</p>
                        </div>
                         <div>
                          {notification?.callToActionRequired === true?
                          <Button 
                           // className='bg-[#142854] hover:bg-[#142854] h-[45px] text-[14px]'
                            className='bg-[#F9F9F9] hover:bg-[#F9F9F9] text-grey100 h-[45px] text-[14px] cursor-none shadow-none'
                           >
                             View loan offer
                             
                           </Button>
                           : ""}
                         </div>
                        </div>
    </div>
  )
}

export default NotificationDetailPage;
