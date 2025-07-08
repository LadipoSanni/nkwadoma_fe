import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"


export const loaneeApi = createApi({
    reducerPath: 'loaneeApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanee', 'accept-loan-offer'],
    endpoints: (builder) => ({

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
            // invalidatesTags: ({id}) => [{type: 'loanee', id}],
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
            invalidatesTags:  [ 'loanee',  'accept-loan-offer'],
        }),
        saveNextOfKinDetails: builder.mutation({
            query: (data)=> ({
                url: '/additional-details',
                method: 'POST',
                body: data
            }),
        }),
        viewLoanReferralDetails: builder.query ({
            query: (loanReferralId?: string) => ({
                url: `/loan-referral?loanReferralId=${loanReferralId}`,
                method: "GET",
            }),
        }),
        getLoaneeIdentityVerificationDetails: builder.query ({
            query: () => ({
                url: `/auth/userDetail`,
                method: 'GET'
            })
        }),
        getLoaneeDetails: builder.query ({
            query: (loaneeId?: string) =>({
                url: `/loanee/${loaneeId ? loaneeId : 'details'}`,
                method: 'GET'
            }),

        }),
        viewLoaneeInACohortDetails: builder.query ({
            query: (data) => ({
                url: `/loanee/cohorts/loanee?cohortId=${data.cohortId}&loaneeId=${data.loaneeId}`,
                method:'GET'
            })
        })

    })
})



export const {
    // useIsIdentityVerifiedQuery,
     useSaveNextOfKinDetailsMutation,
    useViewLoanReferralDetailsQuery,
    useVerifyIdentityMutation,
    useRespondToLoanReferralMutation,
    useViewLoaneeInACohortDetailsQuery,
    // useLazyIsIdentityVerifiedQuery,
    useGetLoaneeDetailsQuery,
    useGetLoaneeIdentityVerificationDetailsQuery
} = loaneeApi;

