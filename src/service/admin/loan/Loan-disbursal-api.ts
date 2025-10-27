import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanDisbursalApi = createApi({
    tagTypes: ['loanDisbursal', 'disburse-loan-offer','loanOffer','upload-repayment'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanDisbursalApi',
    endpoints: (builder) => ({
        viewDisbursedLoanDetails: builder.query({
            query: (disbursedLoanId: string) => ({
                url: `/loan/loan-disbursals/${disbursedLoanId}`,
                method: 'GET',
            }),
            providesTags: ['loanDisbursal']
        }),
        viewAllLoanDisbursal: builder.query({
            query: (data: {
                pageSize?: number;
                pageNumber?: number;
                organizationId?: string | number;
                programId?: string
            }) => ({
                url: `/loan/view-all-disbursal`,
                method: 'GET',
                params: data
            }),
            providesTags: ['loanDisbursal','loanOffer','upload-repayment']
        }),
        viewLoansTotalCalculation: builder.query({
            query: () => ({
                url: `/loan/total`,
                method: `GET`,
            }),
            providesTags: ['upload-repayment']
        }),
        viewLoaneeLoans: builder.query({
            query: (data:{pageNumber: number, pageSize: number}) => ({
                url : `/loan/track/all/progress`,
                method: 'GET',
                params: data
            })
        }),
        viewLoaneeLoanDetails: builder.query({
            query: (data:{loanProgressId: string}) => ({
                url: `/loan/view/progress`,
                method: 'GET',
                params: data
            })
        }),

    })
})
export const { useViewDisbursedLoanDetailsQuery,useViewLoaneeLoansQuery,
    useViewLoansTotalCalculationQuery, useViewAllLoanDisbursalQuery,
    useViewLoaneeLoanDetailsQuery,
} = loanDisbursalApi