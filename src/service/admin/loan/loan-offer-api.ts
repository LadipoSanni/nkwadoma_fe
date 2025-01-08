import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanOfferApi = createApi({
    tagTypes: ['loanOffer'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanOfferApi',
    endpoints : (builder) => ({
        viewAllLoanOffer : builder.query({
            query: (data:  {
                pageNumber?: number;
                pageSize?: number;}) => ({
                url: `/loan/loanOffer/all`,
                method: 'GET',
                params: data
            }),

        }) ,
        viewLoanOfferDetails: builder.query({
            query: (loanOfferId: string) => ({
                url: `/loan/view-loan-offer`,
                method: 'GET',
                query: loanOfferId
            }),
        })
    })
})
export const {useViewAllLoanOfferQuery, useViewLoanOfferDetailsQuery} = loanOfferApi