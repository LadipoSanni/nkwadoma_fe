"use client"
import React from 'react'
import NotificationDetailPage from '@/features/notification/Notification-details'

interface Props{
        params: Promise<{ id: string }>;
}

function Page({params}:Props) {
    const { id } = React.use(params);

  return (
    <>
      <NotificationDetailPage notificationId={id}/>
    </>
  )
}

export default Page
