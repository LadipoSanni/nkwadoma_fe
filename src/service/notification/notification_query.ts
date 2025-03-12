import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

  export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: customFetchBaseQuery,
    tagTypes:['notification'],
    endpoints: (builder) => ({
        viewAllNotification: builder.query({
            query:() => ({
                url:'/view-all-notification',
                method: 'GET'
            }),
            providesTags:['notification']
        }),
        numberOfUnredNotification: builder.query({
            query:() => ({
                url:'/unread-notification-count',
                method: 'GET'
            }),
            providesTags:['notification']  
        }),
        viewNotificationDetails: builder.query({
            query:(notificationId) => ({
                url:'/view-notification',
                method: 'GET',
                params: {notificationId},
            }),
            // providesTags:['notification']   
            providesTags: (notificationId) => [
                { type: 'notification', id: notificationId }, 
            ],
        })
    })
  })

  export const {useNumberOfUnredNotificationQuery,useViewAllNotificationQuery,useLazyViewNotificationDetailsQuery} = notificationApi