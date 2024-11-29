import { createApi  } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.APP_DEV_AUTH_URL;

export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['authentication'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query:(data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            // invalidatesTags: ['authentication']
        }),
        createPassword: builder.mutation({
            query: (data)=> ({
                url: '/auth/password/create',
                method: 'POST',
                body: data
            }),
        }),
  //       curl -X 'POST' \
  // 'https://api-systest.learnspace.africa/api/v1/auth/password/forgotPassword?email=mariiam22222%40gmail.com' \
  // -H 'accept: */*' \
  // -d ''
        sendEmailToResetPassword: builder.mutation({
           query: (email) => ({
               url: `/auth/password/forgotPassword?email=${email}`,
               method: 'POST',
           })
        }),

    })
})

export const {useLoginMutation, useSendEmailToResetPasswordMutation, useCreatePasswordMutation} = authApi;