import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";

export const portfolioOverviewApi = createApi({
    reducerPath: 'portfolioOverviewApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: [''],
    endpoints: (builder)=> ({
        viewMeedlPortfolio: builder.query({
           query: () => ({
               url: `/meedl-portfolio/view`,
               method: 'GET'
           })
        }),
        viewAllRepaymentHistory: builder.query({
            query: (data) => ({
                url:   `/repayment/history/all?loaneeId=${data?.loaneeId}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
                method: 'GET'
            })
         })
    })

})
export const {useViewMeedlPortfolioQuery, useViewAllRepaymentHistoryQuery} = portfolioOverviewApi;