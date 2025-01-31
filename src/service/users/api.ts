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
    })
})

export const { useLogoutMutation } = userApi;
