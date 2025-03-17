"use client"
import React from 'react'
import NotificationDetailPage from '@/features/notification/Notification-details'
// import { notificationMockData } from '@/utils/Notification_mock-data'
import ResponsiveRedirect from '@/layout/responsive-redirect-layout.tsx'

interface Props{
        params: Promise<{ id: string }>;
}

function Page({params}:Props) {
    const { id } = React.use(params);
    // const notification =notificationMockData.find((n)=> n.id === id)
  return (
    <ResponsiveRedirect webPath={`/notifications/notification/${id}`} mobilePath={`/notifications/details/${id}`}>
      <NotificationDetailPage notificationId={id}/>
    </ResponsiveRedirect>
  )
}

export default Page