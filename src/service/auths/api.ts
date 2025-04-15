import { createApi  } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.APP_DEV_AUTH_URL;

export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ['authentication'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query:(data:{email: string, password?: string}) => ({
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
        sendEmailToResetPassword: builder.mutation({
           query: (email) => ({
               url: `/auth/password/forgotPassword?email=${email}`,
               method: 'POST',
           })
        }),
        resetPassword: builder.mutation({
            query:(data) => ({
                url: `/auth/password/reset`,
                method: 'POST',
                body:data
            })
        })

    })
})

export const {useResetPasswordMutation,useLoginMutation, useSendEmailToResetPasswordMutation, useCreatePasswordMutation} = authApi;