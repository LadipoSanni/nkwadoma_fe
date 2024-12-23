import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

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
                params: param,
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
            query: (formData) => ({
                url: 'loan/loan-product/create',
                method: 'POST',
                body: formData,
            }), invalidatesTags: ['loanProduct'],
        }),

        getLoanProductDetailsById: builder.query({
            query: (loanProductId) =>
                `loan/loan-product/view-details-by-id?loanProductId=${loanProductId}`,
        }),
    }),
})
export const {
    useViewAllLoanProductQuery,
    useSearchLoanProductQuery,
    useCreateLoanProductMutation
} = loanProductApi;

