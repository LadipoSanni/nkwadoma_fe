import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"


export const cohortApi = createApi({
    reducerPath: 'cohortApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['cohort'],
    endpoints: (builder) => ({
        createCohort: builder.mutation({
            query:({data}) => ({
              url: `cohort/create`,
              method: "POST",
              body: data,
            }),
            invalidatesTags: ['cohort'],
        }),

        viewAllLoanee: builder.query({
            query: (data: {
                cohortId?: string,
                pageNumber?: number;
                pageSize?: number;
            }) => ({
                url: '/cohort/all/loanee',
                method: "GET",
                params: data,
            }),
            providesTags: ['cohort'],
        }),
    })
})

export const { useCreateCohortMutation, useViewAllLoaneeQuery } = cohortApi;

