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
    tagTypes: ['cohort','loanee'],
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
            invalidatesTags: ({id}) => [{type: 'loanee', id}],
        }),
        viewAllLoanee: builder.query({
            query: (data: {
                cohortId?: string,
                pageNumber?: number;
                pageSize?: number;
                status?: string;
                uploadedStatus? : string
            }) => ({
                url: '/loanee/cohorts/loanees',
                method: "GET",
                params: data,
            }),
            providesTags: ['cohort','loanee'],
        }),

        viewCohortDetails: builder.query({
            query: (cohortId) => ({
                url: `/cohort-details`,
                method: "GET",
                params: cohortId
            }),
            providesTags: [`cohort`]
        }),

        getAllCohortsByOrganisation: builder.query({
            query: (param: {
                organizationId?: string;
                cohortStatus: string;
                cohortType?: string;
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/organization-cohort/all',
                method: "GET",
                params: param,
            }),
            providesTags: ['cohort','loanee'],
        }),

        searchCohortByOrganisation: builder.query({
            query: (param: { 
                cohortName: string;
                organizationId?: string;
                programId?: string;
                cohortStatus?: string;
                cohortType?: string;
                pageSize?: number;
                pageNumber?: number;
                 }) => ({
                url: `/searchCohort`,
                method: 'GET',
                params: param
            }),

        }),


        editCohort: builder.mutation({
            query: ({data}) => ({
                url: "cohort/edit",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['cohort'],
        }),

        getCohortDetails: builder.query({
            query: (cohortId: { cohortId: string }) => ({
                url: `/cohort-details`,
                method: "GET",
                params: cohortId
            }),
        }),

        getCohortDetailsBreakdown: builder.query({
            query: (cohortId) => ({
                url: `/cohort/loanbreakdown`,
                method: "GET",
                params: cohortId
            }),
            providesTags: [`cohort`]
        }),

        getCohortLoanBreakDown: builder.query({
            query: (cohortId) => ({
                url: `/cohort/loanbreakdown?cohortId=${cohortId}`,
                method: "GET",
            })
        }),
        searchForLoaneeInACohort: builder.query({
            query: (param: {
                loaneeName: string,
                cohortId?: string,
                status?: string,
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/loanee/cohorts/search/loanees',
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
            invalidatesTags: ['loanee'],
        }),
        addLoaneeToCohort: builder.mutation({
            query: (data) => ({
                url: `/loanee/cohort`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cohort'],
        }),
        getAllCohortByAParticularProgram: builder.query({
            query: (param: {
                programId?:string;
                cohortStatus?: string;
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/cohort/all',
                method: "GET",
                params: param,

            }),
            providesTags: ['cohort'],
        }),
          updateLoaneeStatus: builder.mutation({
            query: (data: {
                loaneeIds: string[]; 
                loaneeStatus: string;
                cohortId: string
            }
            ) => ({
                url: '/loanee/status', 
                method: 'POST',              
                body:data,  
              }), 
              invalidatesTags: ['loanee'],
          }),
          inviteLoanee: builder.mutation({
            query: (data: {
                loaneeIds: string[];
                cohortId?: string;
            }) => ({
                url: `/loanee/invite/${data.cohortId}`, 
                method: 'POST',              
                body: data.loaneeIds, 
              }), 
              invalidatesTags: ['loanee'],
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
    useSearchForLoaneeInACohortQuery,
    useGetCohortDetailsBreakdownQuery,
    useGetAllCohortByAParticularProgramQuery,
    useUpdateLoaneeStatusMutation,
    useInviteLoaneeMutation
} = cohortApi;

