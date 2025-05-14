import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const financierOnboardingAndDashboardApi = createApi({
    reducerPath:'financierOnboardingAndDashboardApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['FinancierDashboard', 'marketplace'],
    endpoints : (builder) =>  ({

        viewFinancierDashboard: builder.query({
            query:() => ({
                url : `/financier/view`,
                method: 'GET',
            }),
            providesTags: ['FinancierDashboard','marketplace']
        }),
        viewMyInvestment: builder.query({
           query: () => ({
               url: `financier/view/investment-detail/d`,
               method: 'GET'
           })
        }),
        filterMyInvestment: builder.query({
           query : (data: {investmentVehicleType: string, pageSize:number, pageNumber: number}) => ({
               url: `investmentVehicle/all/financier?investmentVehicleType=${data.investmentVehicleType}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
               method: 'GET'
           }),
            providesTags: ['marketplace']
        }),
        searchMyInvestment: builder.query({
           query : (data:{name: string, investmentType: string, pageSize: number, pageNumber: number}) => ({
               url: `investmentVehicle/search/financier/${data.name}?investmentVehicleType=${data.investmentType}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
               method: 'GET'
           }),
            providesTags:['marketplace']
        }),
        completeKyc: builder.mutation({
          query: (data) => ({
            url: `financier/complete-kyc`,
            method: 'POST',
            body: data
          }),
          invalidatesTags: ['FinancierDashboard']
        }),

    })
})

export const {useViewFinancierDashboardQuery,useSearchMyInvestmentQuery,useFilterMyInvestmentQuery, useViewMyInvestmentQuery, useCompleteKycMutation} = financierOnboardingAndDashboardApi
