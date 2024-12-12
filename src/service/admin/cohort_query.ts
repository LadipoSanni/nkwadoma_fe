import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

interface LoanBreakdown {
    itemName: string;
    itemAmount: string;
    currency: string;
}

export const cohortApi = createApi({
    reducerPath: 'cohortApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['cohort'],
    endpoints: (builder) => ({
        createCohort: builder.mutation({
            query: (formData: {
                programId: string,
                name: string,
                startDate: string,
                cohortDescription: string,
                imageUrl: string | null,
                tuitionAmount: string,
                loanBreakdowns: LoanBreakdown[]

            }) => ({
                url: 'cohort/create',
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['cohort'],
        }),

        deleteCohort: builder.mutation({
            query: ({id}) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ({id}) => [{type: 'cohort', id}],
        }),

        referLoanee: builder.mutation({
            query: (formData: {
                cohortId: string
                loaneeIds: string[]
            }) => ({
                url: `/cohort/loanee/refer`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ({id}) => [{type: 'cohort', id}],
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

        viewCohortDetails: builder.query({
            query: ( cohortId ) => ({
                url: `/cohort-details`,
                method: "GET",
                params: cohortId
            }),
            providesTags: [`cohort`]
        }),

        getAllCohortsByOrganisation: builder.query({
            query: (param: {
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/organization-cohort/all',
                method: "GET",
                params: param,
            }),
            providesTags: ['cohort'],
        }),

        searchCohortByOrganisation: builder.query({
            query: (cohortName) => ({
                url: '/searchCohort',
                method: 'GET',
                params: {cohortName},
            }),

        }),

        editCohort: builder.mutation({
          query: ({data}) => ({
                 url: "cohort/edit" ,
                method: "POST",
                body: data,
         }),
          invalidatesTags: ['cohort'],
        }),
        getCohortDetails: builder.query({
            query: (cohortId:{cohortId: string}) => ({
                url: `/cohort-details`,
                method: "GET",
                params: cohortId
            }),
        }),
        getCohortLoanBreakDown : builder.query({
           query: (cohortId) => ({
               url:`/cohort/loanbreakdown?cohortId=${cohortId}`,
               method: "GET",
           })
        }),
        searchForLoaneeInACohort: builder.query({
            query: (param:{
                loaneeName: string,
                cohortId?: string,
            }) => ({
                url: '/cohort/searchForLoanee',
                method: 'GET',
                params: param,
            })
        }),
        referLoaneeToACohort: builder.mutation({
           query: (data) => ({
               url: `/cohort/loanee/refer`,
               method: 'POST',
               body: data
           }),
            invalidatesTags: ['cohort'],
        }),
        addLoaneeToCohort: builder.mutation({
            query: (data) => ({
                url: `/addLoaneeToCohort`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cohort'],
        }),
    })
})



export const {
    useAddLoaneeToCohortMutation,
    useGetCohortLoanBreakDownQuery,
    useReferLoaneeToACohortMutation,
    useCreateCohortMutation,
    useViewAllLoaneeQuery,
    useGetAllCohortsByOrganisationQuery,
    useSearchCohortByOrganisationQuery,
    useViewCohortDetailsQuery,
    useDeleteCohortMutation, useEditCohortMutation,
    useGetCohortDetailsQuery, useReferLoaneeMutation,
    useSearchForLoaneeInACohortQuery
} = cohortApi;

