import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"


export const loanProductApi = createApi({
    reducerPath: 'loanProductApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanProduct'],
    endpoints: (builder) => ({
        viewAllLoanProduct: builder.query({
            query: (param: {
                pageSize : number;
                pageNumber : number;
            })=> ({
                url: `/loan/loan-product/all`,
                method: "GET",
                param: param,
            }),
            providesTags: [`loanProduct`]
        }),

        cohortBreakdown: builder.query({
            query: ( cohortId ) => ({
                url: `/cohort/loanbreakdown`,
                method: "GET",
                params: cohortId
            }),
            providesTags: [`loanProduct`]
        }),

        searchLoanProduct: builder.query({
            query: (param:{
                loanProductName: string,
            }) => ({
                url: '/loan/loan-product/search',
                method: 'GET',
                params: param,
            })
        }),

        createLoanProduct: builder.mutation({
            query: (formData: {
                productName: string,
                productSponsor: string,
                FundProduct: string,
                costOfFunds: number,
                tenor: number,
                tenorDuration: string,
                loanProductSize: number,
                minimumRepaymentAmount: number,
                moratorium: number,
                interest: number,
                obligorLimit: number,
                loanProductMandate: string,
                loanProductTermsAndCondition: string,
                bankPartner: string,
                loanInsuranceProvider: string,
                loanDisbursementTerms: string,
            }) => ({
                url: 'loan/loan-product/create',
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['loanProduct'],
        }),
    })
})
export const {useViewAllLoanProductQuery, useCohortBreakdownQuery, useSearchLoanProductQuery, useCreateLoanProductMutation} = loanProductApi;

