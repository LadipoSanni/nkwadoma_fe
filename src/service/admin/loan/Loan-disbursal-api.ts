import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanDisbursalApi = createApi({
    tagTypes: ['loanDisbursal'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanDisbursalApi',
    endpoints: (builder) => ({
        viewAllLoanDisbursal: builder.query({
            query: (data: {
                organizationId: string,
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: `/loan/loan-disbursals`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanDisbursal']
        }),
    })
})
export const {useViewAllLoanDisbursalQuery} = loanDisbursalApi