import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"


export const loaneeApi = createApi({
    reducerPath: 'loaneeApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanee', 'accept-loan-offer','loanOffer','upload-repayment'],
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
            }),
            providesTags:['upload-repayment']
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
            }),
            providesTags: ['loanOffer','upload-repayment']
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
        }),
        viewAllLoaneeByAdmins : builder.query({
            query: (data:{pageSize: number,  pageNumber: number}) => ({
                url: `/loanee/all?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
                method: 'GET'
            })
        }),
        searchLoaneeByAdmins : builder.query({
            query: (data:{pageSize: number, name?: string, pageNumber: number}) => ({
                url: `/loanee/all/search?name=${data.name}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
                method: 'GET'
            })
        }),
        viewAllLoansTotalCountsByAdmins : builder.query({
           query: (loaneeId?: string) => ({
               url: `/loan/total${loaneeId ? `?loaneeId=${loaneeId}` : ''}`,
               method: 'GET'
           })
        }),
        viewLoaneeLoansByAdmin : builder.query({
            query: (data:{loaneeId: string,pageNumber: number, pageSize: number }) => ({
                url: `/loan/view-all-disbursal?loaneeId=${data.loaneeId}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
                method: 'GET'
            })
        }),
        searchLoaneeLoansByAdmin : builder.query({
            query: (data:{loaneeId: string,pageNumber: number, pageSize: number, organizationName: string }) => ({
                url: `/loan/search/loanee?organizationName=${data?.organizationName}&loaneeId=${data?.loaneeId}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
                method: 'GET'
            })
        })
    })
})



export const {
    useSearchLoaneeLoansByAdminQuery,
    // useIsIdentityVerifiedQuery,
    useSearchLoaneeByAdminsQuery,
    useViewLoaneeLoansByAdminQuery,
    useViewAllLoansTotalCountsByAdminsQuery,
    useViewAllLoaneeByAdminsQuery,
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

