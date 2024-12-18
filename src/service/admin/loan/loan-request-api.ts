import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const loanRequestApi = createApi({
    reducerPath : 'loanRequestApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanRequests', 'loanRequest-details'],
    endpoints: (builder) => ({
        viewAllLoanRequest: builder.query({
          query: (data: {
              pageNumber?: number;
              pageSize?: number;}) => ({
              url: `/loan/loan-requests`,
              method: 'GET',
              params: data
          }),
            providesTags: ['loanRequests']

        }),
        viewLoanRequestDetails: builder.query({
           query: (id) => ({
               url: `/loan/loan-requests`,
               method:'GET',
               query: id
           }) ,
            providesTags: ['loanRequest-details']
        }),
    })

})

export const {useViewAllLoanRequestQuery, useViewLoanRequestDetailsQuery} = loanRequestApi