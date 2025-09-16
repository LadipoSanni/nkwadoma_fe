"use client"
import React from 'react'
import NotificationDetailPage from '@/features/notification/Notification-details'
// import { notificationMockData } from '@/utils/Notification_mock-data'
import ResponsiveRedirect from '@/layout/responsive-redirect-layout.tsx'
import CustomAuthorization from '@/features/auth/authorization';


interface Props{
        params: Promise<{ id: string }>;
}

function Page({params}:Props) {
    const { id } = React.use(params);
    // const notification =notificationMockData.find((n)=> n.id === id)
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','LOANEE','FINANCIER','MEEDL_SUPER_ADMIN','ORGANIZATION_SUPER_ADMIN','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN','MEEDL_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE']}>
    <ResponsiveRedirect webPath={`/notifications/notification/${id}`} mobilePath={`/notifications/details/${id}`}>
      <NotificationDetailPage notificationId={id}/>
    </ResponsiveRedirect>
    </CustomAuthorization>
  )
}

export default Page