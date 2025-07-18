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
        }),
        checkLoaneeStatus: builder.query ({
            query : () => ({
                url:  `/auth/userDetail`,
                method: 'GET'
            }),
            providesTags: ['loanee', 'accept-loan-offer']

        }),
        viewLoanDetails: builder.query ({
            query: (loanId: string) =>({
                url: `/loan/loan-disbursals/${loanId}`,
                method: 'GET'
            })
        }),
        viewAllLoanRefferals: builder.query({
            query: () => ({
                url: "/loanee/loan-referrals",
                 method: 'GET'
            })
        }),
        viewLoanDetailsOnOnboarding : builder.query ({
            query: (cohortLoaneeId) => ({
                url: `loanee/loan/detail?cohortLoaneeId=${cohortLoaneeId}`,
                method: 'GET'
            })
        })
    })
})



export const {
    // useIsIdentityVerifiedQuery,
    useViewLoanDetailsOnOnboardingQuery,
    useCheckLoaneeStatusQuery,
     useSaveNextOfKinDetailsMutation,
    useViewLoanReferralDetailsQuery,
    useVerifyIdentityMutation,
    useRespondToLoanReferralMutation,
    useViewLoaneeInACohortDetailsQuery,
    // useLazyIsIdentityVerifiedQuery,
    useGetLoaneeDetailsQuery,
    useViewLoanDetailsQuery,
    useGetLoaneeIdentityVerificationDetailsQuery,
    useViewAllLoanRefferalsQuery
} = loaneeApi;

