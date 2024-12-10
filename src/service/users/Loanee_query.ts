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
        saveNextOfKinDetails: builder.mutation({
            query: (data)=> ({
                url: '/next-of-kin-details',
                method: 'POST',
                body: data
            }),
        }),
        viewLoanReferralDetails: builder.query ({
            query: () => ({
                url: `/loan/loan-referral`,
                method: "GET",
            }),
        }),

    })
})



export const {
    useIsIdentityVerifiedQuery,
    useViewLoanReferralDetailsQuery, useSaveNextOfKinDetailsMutation
} = loaneeApi;

