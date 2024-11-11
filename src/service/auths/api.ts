import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"
export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: customFetchBaseQuery,
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
        createProgram: builder.mutation({
            query:(data) => ({
                url: '/program',
                method: 'POST',
                body: data
            }),
        })

    })
})

export const {useLoginMutation} = authApi;