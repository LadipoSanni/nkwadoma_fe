import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.APP_DEV_AUTH_URL;

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
        })

    })
})

export const {useLoginMutation} = authApi;