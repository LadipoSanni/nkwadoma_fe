import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from "@/service/customFetchBaseQuery";

interface Objdata  {
    name: string,
    pageSize:number, 
     pageNumber: number,
     organizationId?: string  | number | undefined,
     programId?: string
    }

export const loanRequestApi = createApi({
    reducerPath: 'loanRequestApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanRequests', 'loanRequest-details','create-loan-offer', 'accept-loan-offer'],
    endpoints: (builder) => ({
        viewAllLoanRequest: builder.query({
            query: (data: {
                organizationId?:  string | number;
                programId?: string;
                pageNumber?: number;
                pageSize?: number;
            }) => ({
                url: `/loan/loan-requests`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanRequests', 'accept-loan-offer', 'create-loan-offer']
        }),
        respondToLoanRequest: builder.mutation({
            query: (data) => ({
                url: '/loan/loan-request/response',
                method: 'POST',
                body: data
            }), invalidatesTags: ['create-loan-offer', 'loanRequests']
        }),
        viewLoanRequestDetails: builder.query({
            query: (id: string) => ({
                url: `/loan/loan-requests/${id}`,
                method: 'GET',
            })
        }),
        viewAllLoanReferral: builder.query({
            query: (data: {pageSize:number, pageNumber: number,organizationId?: string  | number,programId?: string}) => ({
                url: `/loan/view/loan-referrals`,
                method: 'GET',
                params: data
            }),
        }),
        withdrawLoanOffer: builder.mutation({
            query: (data: {loanOfferId : string,loanOfferStatus: string }) => ({
                url: `/loan/withdraw/loan-offer?loanOfferId=${data.loanOfferId}&loanOfferStatus=${data.loanOfferStatus}`,
                method: 'POST'
            })
        }),
        viewLoanSchedule: builder.query({
            query:(loanRequestId: string) => ({
                url:  `/repayment/history/generate/repayment/schedule?id=${loanRequestId}`,
                method: 'GET'
            })
        }),

       searchLoanReferral: builder.query({
            query: (param:Objdata
            ) => ({
                url: `/loan/search/loan-referrals`,
                method: 'GET',
                params: param
            }),
        }),
        searchLoanDisbursal: builder.query({
            query: (data:Objdata) => ({
                url: `/loan/search/loan-disbursal`,
                method: 'GET',
                params: data
            }),
        }),
        searchLoanOffer: builder.query({
            query: (data:Objdata) => ({
                url: `/loan/search/loanoffer`,
                method: 'GET',
                params: data
            }),
        }),
        searchLoanRequest: builder.query({
            query: (data:Objdata) => ({
                url: `/loan/search/loan-request`,
                method: 'GET',
                params: data
            }),
        }),
        generateLoanRepaymentSchedule: builder.query({
            query: (data:{ amountApproved: string, loanProductId: string})=> ({
                url: `/repayment/history/generate/repayment/schedule?amountApproved=${data.amountApproved}&loanProductId=${data.loanProductId}`,
                method: 'GET'
            }),
        }),
        viewGeneratedRepaymentSchedule: builder.query({
            query: (loanId)=> ({
                url: `/repayment/history/generate/repayment/schedule?loanOfferId=${loanId}`,
                method: 'GET'
            }),
        })
    })
});

export const {
    useViewAllLoanRequestQuery,
    useGenerateLoanRepaymentScheduleQuery,
    useViewLoanRequestDetailsQuery,
    useRespondToLoanRequestMutation,
    useViewAllLoanReferralQuery,
    useWithdrawLoanOfferMutation,
    useViewLoanScheduleQuery,
    useSearchLoanDisbursalQuery,
    useSearchLoanOfferQuery,
    useSearchLoanReferralQuery,
    useSearchLoanRequestQuery,
    useViewGeneratedRepaymentScheduleQuery,
} = loanRequestApi;