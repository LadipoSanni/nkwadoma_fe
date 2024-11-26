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
        })
    })
})

export const { useCreateCohortMutation } = cohortApi;

