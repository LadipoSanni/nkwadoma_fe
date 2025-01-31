import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from "@/service/customFetchBaseQuery";

export const loanRequestApi = createApi({
    reducerPath: 'loanRequestApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanRequests', 'loanRequest-details','create-loan-offer'],
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
            }), invalidatesTags: ['create-loan-offer']
        }),
        viewLoanRequestDetails: builder.query({
            query: (id: string) => ({
                url: `/loan/loan-requests/${id}`,
                method: 'GET',
            })
        }),
        viewLoanRequestsOfCurrentOrganization : builder.query({
            query: (data:{pageSize: number, pageNumber: number, organizationId: string | number | undefined})=> ({
                url: `loan/${data.organizationId}/loan-requests?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
                // url: `/loan/${data.organizationId}/loan-requests?pageSize=${data.pageSize}?pageNumber=${data.pageNumber}`,
                method: 'GET',
            }),
            providesTags: ['loanRequests']
        }),


    })
});

export const {
    useViewAllLoanRequestQuery,
    useViewLoanRequestDetailsQuery,
    useRespondToLoanRequestMutation,
    useViewLoanRequestsOfCurrentOrganizationQuery,
} = loanRequestApi;