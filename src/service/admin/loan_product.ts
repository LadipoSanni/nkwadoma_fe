import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

interface sponsors {
    sponsor1: string;
    sponsor2: string;
}

export const loanProductApi = createApi({
    reducerPath: 'loanProductApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanProduct'],
    endpoints: (builder) => ({
        viewAllLoanProduct: builder.query({
            query: (param: {
                pageSize: number;
                pageNumber: number;
            }) => ({
                url: `/loan/loan-product/all`,
                method: "GET",
                param: param,
            }),
            providesTags: [`loanProduct`]
        }),

        cohortBreakdown: builder.query({
            query: (cohortId) => ({
                url: `/cohort/loanbreakdown`,
                method: "GET",
                params: cohortId
            }),
            providesTags: [`loanProduct`]
        }),

        searchLoanProduct: builder.query({
            query: (param: {
                loanProductName: string,
            }) => ({
                url: '/loan/loan-product/search',
                method: 'GET',
                params: param,
            })
        }),

        createLoanProduct: builder.mutation({
            query: (formData: {
                name: string,
                sponsors: sponsors[],
                FundProduct: string,
                costOfFund: string,
                tenor: string,
                tenorDuration: string,
                loanProductSize: string,
                minRepaymentAmount: string,
                moratorium: string,
                interestRate: string,
                obligorLoanLimit: string,
                mandate: string,
                termsAndCondition: string,
                bankPartner: string,
                loanInsuranceProvider: string,
                disbursementTerms: string,
                loanProductStatus: string
            }) => ({
                url: 'loan/loan-product/create',
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['loanProduct'],
        }),
    })
})
export const {
    useViewAllLoanProductQuery,
    useCohortBreakdownQuery,
    useSearchLoanProductQuery,
    useCreateLoanProductMutation
} = loanProductApi;

