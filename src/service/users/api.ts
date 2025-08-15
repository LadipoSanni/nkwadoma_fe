import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const userApi = createApi({

    reducerPath: 'userApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
        logout: builder.mutation({
            query:() => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        changePassword: builder.mutation({
            query: (body:{password: string, newPassword: string}) => ({
                url: `/auth/password/change`,
                method: 'POST',
                body:body
            })
        })
    })
})

export const { useLogoutMutation , useChangePasswordMutation} = userApi;
