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
                url:   `/repayment/history/all?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}&month=${data.month}&year=${data.year}`,
                method: 'GET'
            })
         }),
        searchAllRepaymentHistory: builder.query({
            query: (data) => ({
                url:   `/repayment/history/search?name=${data.searchTerm}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}&month=${data.month}&year=${data.year}`,
                method: 'GET'
            })
        }),
        getRepaymentHistoryYearRange: builder.query({
            query: () => ({
                url: `/repayment/history/years`,
                method: 'GET'
            })
        })
    })

})
export const {useViewMeedlPortfolioQuery, useGetRepaymentHistoryYearRangeQuery, useSearchAllRepaymentHistoryQuery,useViewAllRepaymentHistoryQuery} = portfolioOverviewApi;