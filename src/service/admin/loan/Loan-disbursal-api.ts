import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanDisbursalApi = createApi({
    tagTypes: ['loanDisbursal', 'disburse-loan-offer','loanOffer','upload-repayment'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanDisbursalApi',
    endpoints: (builder) => ({
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
                organizationId?: string;
            }) => ({
                url: `/loan/view-all-disbursal`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanDisbursal','loanOffer','upload-repayment']
        }),
        viewLoansTotalCalculation: builder.query({
            query: () => ({
                url: `/loan/total`,
                method: `GET`,
            }),
            providesTags: ['upload-repayment']
        }),

    })
})
export const { useViewDisbursedLoanDetailsQuery, useViewLoansTotalCalculationQuery, useViewAllLoanDisbursalQuery} = loanDisbursalApi