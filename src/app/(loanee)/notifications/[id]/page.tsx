import React from 'react'
import NotificationDetailPage from '@/features/notification/Notification-details'
import { notificationMockData } from '@/utils/Notification_mock-data'

interface props{
    params: {
        id: string
    }
}

function page({params: {id}}:props) {
    const notification =notificationMockData.find((n)=> n.id === id)
  return (
    <>
      <NotificationDetailPage notification={notification}/>
    </>
  )
}

export default page
