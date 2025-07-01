import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from "@/service/customFetchBaseQuery";

export const loanRequestApi = createApi({
    reducerPath: 'loanRequestApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanRequests', 'loanRequest-details','create-loan-offer', 'accept-loan-offer'],
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
            providesTags: ['loanRequests', 'accept-loan-offer', 'create-loan-offer']
        }),
        respondToLoanRequest: builder.mutation({
            query: (data) => ({
                url: '/loan/loan-request/response',
                method: 'POST',
                body: data
            }), invalidatesTags: ['create-loan-offer', 'loanRequests']
        }),
        viewLoanRequestDetails: builder.query({
            query: (id: string) => ({
                url: `/loan/loan-requests/${id}`,
                method: 'GET',
            })
        }),



    })
});

export const {
    useViewAllLoanRequestQuery,
    useViewLoanRequestDetailsQuery,
    useRespondToLoanRequestMutation,
} = loanRequestApi;