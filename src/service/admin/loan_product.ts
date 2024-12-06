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

        searchLoanProduct: builder.query({
            query: (param:{
                loanProductName: string,
            }) => ({
                url: '/loan/loan-product/search',
                method: 'GET',
                params: param,
            })
        })
    })
})


export const {useViewAllLoanProductQuery, useSearchLoanProductQuery} = loanProductApi;

