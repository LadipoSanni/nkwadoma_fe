import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const userApi = createApi({

    reducerPath: 'userApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['userDetail'],
    endpoints: (builder) => ({
        logout: builder.mutation({
            query:() => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        changePassword: builder.mutation({
            query: (body:{password?: string, newPassword?: string}) => ({
                url: `/auth/password/change`,
                method: 'POST',
                body:body
            })
        }),
        addUserImage: builder.mutation({
            query: (props:{imageUrl: string}) => ({
                url: `/user/upload/image`,
                method: 'POST',
                body: props,
            }),
            invalidatesTags: ['userDetail']

        }),
        getUserDetails : builder.query({
            query: () => ({
                url: `/auth/userDetail`,
                method: 'GET'
            }),
            providesTags: ['userDetail']

        }),
        enableTwoFA: builder.mutation({
            query: (data) => ({
                url : '/auth/manageMFA',
                method: 'POST',
                body: data
            })
        })

    })
})

export const { useLogoutMutation , useChangePasswordMutation,
    useAddUserImageMutation, useGetUserDetailsQuery,
    useEnableTwoFAMutation,

} = userApi;
