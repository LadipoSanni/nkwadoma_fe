import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanDisbursalApi = createApi({
    tagTypes: ['loanDisbursal'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanDisbursalApi',
    endpoints: (builder) => ({
        viewAllLoanDisbursalByOrgId: builder.query({
            query: (data: {
                organizationId: string | number | undefined,
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: `/loan/loan-disbursals`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanDisbursal']
        }),
        viewDisbursedLoanDetails: builder.query({
            query: (disbursedLoanId: string) => ({
                url: `/loan/loan-disbursals/${disbursedLoanId}`,
                method: 'GET',
            }),
            providesTags: ['loanDisbursal']
        }),
        viewAllLoanDisbursal: builder.query({
            query: (data: {
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: `/loan/view-all-disbursal`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanDisbursal']
        }),

    })
})
export const {useViewAllLoanDisbursalByOrgIdQuery, useViewDisbursedLoanDetailsQuery} = loanDisbursalApi