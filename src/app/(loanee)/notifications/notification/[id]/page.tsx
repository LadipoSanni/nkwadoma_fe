"use client"
import React from 'react'
import NotificationDetailPage from '@/features/notification/Notification-details'
import { notificationMockData } from '@/utils/Notification_mock-data'

interface Props{
        params: Promise<{ id: string }>;
}

function Page({params}:Props) {
    const { id } = React.use(params);;
    const notification =notificationMockData.find((n)=> n.id === id)

    if (!notification) {
        return <div>Notification not found</div>; 
    }
  return (
    <>
      <NotificationDetailPage notification={notification}/>
    </>
  )
}

export default Page
