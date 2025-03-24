import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

  export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: customFetchBaseQuery,
    tagTypes:['notification'],
    endpoints: (builder) => ({
        viewAllNotification: builder.query({
            query:(param: {
                pageSize: number;
                pageNumber: number;
            }) => ({
                url:'/view-all-notification',
                method: 'GET',
                params: param,
            }),
            providesTags:['notification']
        }),
        numberOfNotification: builder.query({
            query:() => ({
                url:'/notification-count',
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
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                  await queryFulfilled;
                  dispatch(notificationApi.util.invalidateTags(['notification']));
                } catch (error) {
                  console.error('Error fetching notification details:', error);
                }
              },    
        }),
        deleteNotification: builder.mutation({
            query: (notificationIds: string[]) => ({
                url: '/notification/delete', 
                method: 'DELETE',              
                params: { notificationIds },  
              }),  
              invalidatesTags: ['notification'] 
        }),
        searchNotification: builder.query({
            query: ({param}:{param: { 
                title: string; 
                pageSize: number; 
                pageNumber: number; 
            }}) => ({
                url:"/search-notification",
                method:"GET",
                params: param
            })
        })
    })
  })

  export const {useNumberOfNotificationQuery,useViewAllNotificationQuery,useViewNotificationDetailsQuery,useDeleteNotificationMutation,useSearchNotificationQuery} = notificationApi