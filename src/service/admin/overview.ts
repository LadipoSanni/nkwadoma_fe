import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";

export const portfolioOverviewApi = createApi({
    reducerPath: 'portfolioOverviewApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['loanee','upload-repayment','loan'],
    endpoints: (builder)=> ({
        viewMeedlPortfolio: builder.query({
           query: () => ({
               url: `/meedl-portfolio/view`,
               method: 'GET'
           })
        }),
        viewAllRepaymentHistory: builder.query({
            query: (data) => ({
                url:   `/repayment/history/all?${data.loaneeId ?`loaneeId=${data.loaneeId}& ` : ''}pageSize=${data.pageSize}&pageNumber=${data.pageNumber} ${data.month ? `&month=${data.month}` : ''}${data.year ? `&year=${data.year}`: ''}`,
                method: 'GET'
            }),
            providesTags: ['loanee','upload-repayment']
         }),
        searchAllRepaymentHistory: builder.query({
            query: (data) => ({
                url:   `/repayment/history/search?name=${data.searchTerm}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}&month=${data.month}&year=${data.year}`,
                method: 'GET'
            }),
            providesTags: ['loanee','upload-repayment']
        }),
        getRepaymentHistoryYearRange: builder.query({
            query: () => ({
                url: `/repayment/history/years`,
                method: 'GET'
            }),
            providesTags: ['loanee','upload-repayment']
        }),
        setUpObligorLimit: builder.mutation({
            query: (param:{obligorLoanLimit: number}) => ({
                url: `/meedl/obligor/limit/set-up`,
                method: 'POST',
                params:param
            }),
            invalidatesTags: ['loan']
         }),
         viewObligorLimit: builder.query({
            query: () => ({
                url: `/meedl/obligor/limit`,
                method: 'GET',
            }),
            providesTags: ['loan']
         }),
    })

})
export const {useViewMeedlPortfolioQuery, 
    useGetRepaymentHistoryYearRangeQuery,
     useSearchAllRepaymentHistoryQuery,
     useViewAllRepaymentHistoryQuery,
     useViewObligorLimitQuery,
     useSetUpObligorLimitMutation
    } = portfolioOverviewApi;