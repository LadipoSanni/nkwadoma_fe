import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from "@/service/customFetchBaseQuery";

export const loanRequestApi = createApi({
    reducerPath: 'loanRequestApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanRequests', 'loanRequest-details'],
    endpoints: (builder) => ({
        viewAllLoanRequest: builder.query({
            query: (data: {
                pageNumber?: number;
                pageSize?: number;
            }) => ({
                url: `/loan/loan-requests`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanRequests']
        }),
        respondToLoanRequest: builder.mutation({
            query: (data) => ({
                url: '/loan/loan-request/response',
                method: 'POST',
                body: data
            })
        }),
        viewLoanRequestDetails: builder.query({
            query: (id: string) => ({
                url: `/loan/loan-requests/${id}`,
                method: 'GET',
            }),
        })
    })
});

export const {
    useViewAllLoanRequestQuery,
    useViewLoanRequestDetailsQuery,
    useRespondToLoanRequestMutation
} = loanRequestApi;