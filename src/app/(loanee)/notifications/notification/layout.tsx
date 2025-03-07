import React,{ReactNode} from 'react'
import NotificationLayout from '@/layout/notification-layout.tsx';

interface notificationProps{
   children: ReactNode; 
}

function NotificationLayouts({children}: notificationProps) {
  return (
    <NotificationLayout
    >{children}
    </NotificationLayout>
  )
}

export default NotificationLayouts