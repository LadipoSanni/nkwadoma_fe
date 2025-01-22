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
                url: `/loan/view-loan-offer/${loanOfferId}`,
                method: 'GET',
            }),
        }),
        disburseLoanOffer: builder.mutation({
            query: (body: {loaneeId: string, loanOfferId: string})=> ({
                url: '/loan/start',
                method: 'POST',
                params: body
            }),
            invalidatesTags: ['loanOffer']
        })
    })
})
export const {useViewAllLoanOfferQuery, useViewLoanOfferDetailsQuery, useDisburseLoanOfferMutation} = loanOfferApi