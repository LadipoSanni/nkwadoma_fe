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
            query: (formData) => ({
                url: 'loan/loan-product/create',
                method: 'POST',
                body: formData,
            }), invalidatesTags: ['loanProduct'],
        }),

        getLoanProductDetailsById: builder.query({
            query: (loanProductId) => ({
                url: `/loan/loan-product/view-details-by-id`,
                method: "GET",
                params: loanProductId
            }),
            providesTags: [`loanProduct`]
        }),

        getAllLoaneeInALoanProduct: builder.query<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            any, {
            loanProductId: string;
            pageSize: number;
            pageNumber: number }>({
            query: ({ loanProductId, pageSize, pageNumber }) =>
                `/loanee/loanProduct/loanees/${loanProductId}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        }),

        searchLoaneesInALoanProduct: builder.query({
            query: ({ loanProductId, name, pageSize = 10, pageNumber = 0 }) =>
                `/loanee/loan-product/search/loanees/${loanProductId}?name=${name}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        }),
    }),
})
export const {
    useViewAllLoanProductQuery,
    useSearchLoanProductQuery,
    useCreateLoanProductMutation,
    useGetLoanProductDetailsByIdQuery,
    useGetAllLoaneeInALoanProductQuery,
    useSearchLoaneesInALoanProductQuery,
} = loanProductApi;

