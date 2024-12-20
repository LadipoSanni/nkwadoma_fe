import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"


export const loaneeApi = createApi({
    reducerPath: 'loaneeApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanee'],
    endpoints: (builder) => ({
        isIdentityVerified: builder.query({
            query: (param: {
                loanReferralId: string|undefined
            }) => ({
                url: `/identity/verification/is-verified`,
                method: "POST",
                params: param
            }),
            providesTags: [`loanee`]
        }),
        verifyIdentity: builder.mutation({
            query: (formData: {
                bvn: string
                nin: string
                loanReferralId: string
            }) => ({
                url: `/identity/verification/verify`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ({id}) => [{type: 'loanee', id}],
        }),
        respondToLoanReferral: builder.mutation({
            query: (formData: {
                id: string
                loanReferralStatus: string
            }) => ({
                url: `/loan-referrals/respond`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ({id}) => [{type: 'loanee', id}],
        }),
        saveNextOfKinDetails: builder.mutation({
            query: (data)=> ({
                url: '/next-of-kin-details',
                method: 'POST',
                body: data
            }),
        }),
        viewLoanReferralDetails: builder.query ({
            query: () => ({
                url: `/loan-referral`,
                method: "GET",
            }),
        }),

    })
})



export const {
    useIsIdentityVerifiedQuery,
     useSaveNextOfKinDetailsMutation,
    useViewLoanReferralDetailsQuery,
    useVerifyIdentityMutation,
    useRespondToLoanReferralMutation,
    useLazyIsIdentityVerifiedQuery,
} = loaneeApi;

