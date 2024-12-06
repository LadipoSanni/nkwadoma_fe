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
        })
    })
})


export const {useViewAllLoanProductQuery,
    useCohortBreakdownQuery} = loanProductApi;

