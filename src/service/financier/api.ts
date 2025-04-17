import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const financierOnboardingAndDashboardApi = createApi({
    reducerPath:'financierOnboardingAndDashboardApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: [],
    endpoints : (builder) =>  ({

        viewFinancierDashboard: builder.query({
            query:() => ({
                url : `/financier/view/dashboard`,
                method: 'GET',
            })
        }),
        viewMyInvestment: builder.query({
           query: () => ({
               url: `financier/view/investment-detail/id`,
               method: 'GET'
           })
        }),


    })
})

export const {useViewFinancierDashboardQuery, useViewMyInvestmentQuery } = financierOnboardingAndDashboardApi