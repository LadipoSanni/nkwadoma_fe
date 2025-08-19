import React,{ReactNode} from 'react'
import NotificationLayout from '@/layout/notification-layout.tsx';
import CustomAuthorization from '@/features/auth/authorization';

interface notificationProps{
   children: ReactNode; 
}

function NotificationLayouts({children}: notificationProps) {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','LOANEE','FINANCIER','MEEDL_SUPER_ADMIN','ORGANIZATION_SUPER_ADMIN','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
    <NotificationLayout
    >{children}
    </NotificationLayout>
    </CustomAuthorization>
  )
}

export default NotificationLayouts