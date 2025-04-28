import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";

export const PortfolioOverviewApi = createApi({
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
    })

})
export const {useViewMeedlPortfolioQuery} = PortfolioOverviewApi;