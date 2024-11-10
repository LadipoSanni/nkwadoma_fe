import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const programApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['program'],
    endpoints: (builder) => ({
        getAllPrograms: builder.query({
            query: (body: {
                organizationId: string;
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/program/all',
                method: "GET",
                body,
            }),
        }),
    }),
})


export const { useGetAllProgramsQuery } = programApi;