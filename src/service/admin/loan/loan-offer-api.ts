import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanOfferApi = createApi({
    tagTypes: ['loanOffer', 'create-loan-offer', 'create-loan-offer', 'disburse-loan-offer'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanOfferApi',
    endpoints : (builder) => ({
        viewAllLoanOffer : builder.query({
            query: (data:  {
                pageNumber?: number;
                pageSize?: number;
                organizationId?:string | number;
            }) => ({
                url: `/loan/loanOffer/all`,
                method: 'GET',
                params: data
            }),
            providesTags: ['create-loan-offer', 'loanOffer', 'create-loan-offer']
        }) ,
        viewLoanOfferDetails: builder.query({
            query: (loanOfferId: string) => ({
                url: `/loan/view-loan-offer/${loanOfferId}`,
                method: 'GET',
            }),
        }),
        disburseLoanOffer: builder.mutation({
            query: (body: {loaneeId: string, loanOfferId: string})=> ({
                url: `/loan/start?loaneeId=${body.loaneeId}&loanOfferId=${body.loanOfferId}`,
                method: 'POST',
            }),
            invalidatesTags: ['loanOffer']
        }),
        respondToLoanOffer: builder.mutation({
            query: (body: { loanOfferId: string, loaneeResponse: 'ACCEPTED' | 'DECLINED' }) => ({
                url: '/loan/accept/loan-offer',
                method: 'POST',
                body
            }),
            invalidatesTags: ['loanOffer', 'disburse-loan-offer']
        }),
        // viewLoanInAnOrganization: builder.query({
        //     query: (body: {organizationId: number| string| undefined, pageSize: number, pageNumber: number})=> ({
        //         url: `/loan/organization/view-all-loanOffers?organizationId=${body.organizationId}&pageSize=${body.pageSize}&pageNumber=${body.pageNumber}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['loanOffer']
        // }),

    })
})
export const {useViewAllLoanOfferQuery, useViewLoanOfferDetailsQuery, useDisburseLoanOfferMutation, useRespondToLoanOfferMutation } = loanOfferApi