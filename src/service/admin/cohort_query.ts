import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

interface LoanBreakdown { itemName: string; itemAmount: string; currency: string; }


export const cohortApi = createApi({
    reducerPath: 'cohortApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['cohort'],
    endpoints: (builder) => ({
        createCohort: builder.mutation({
            query:(formData:{
                programId: string,
                name: string,
                startDate: string,
                cohortDescription: string,
                imageUrl: string | null,
                loanBreakdowns:LoanBreakdown[]

            }) => ({
              url: 'cohort/create',
              method: "POST",
              body: formData,
            }),
            invalidatesTags: ['cohort'],
        }),

        deleteCohort:  builder.mutation({
            query: ({id}) => ({
                url: `/delete/${id}`,
                method: "DELETE",
              }),
              invalidatesTags:  ({ id }) => [{ type: 'cohort', id }],
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

