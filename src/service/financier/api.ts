import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const financierOnboardingAndDashboardApi = createApi({
    reducerPath:'financierOnboardingAndDashboardApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: [],
    endpoints : (builder) =>  ({

        viewFinancierDashboard: builder.query({
            query:() => ({
                url : `/financier/view`,
                method: 'GET',
            })
        }),
        viewMyInvestment: builder.query({
           query: () => ({
               url: `financier/view/investment-detail/d`,
               method: 'GET'
           })
        }),
        filterMyInvestment: builder.query({
           query : (data: {investmentVehicleType: string, pageSize:string, pageNumber: string}) => ({
               url: `investmentVehicle/all/financier/{investmentVehicleId}?investmentVehicleType=${data.investmentVehicleType}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
               method: 'GET'
           })
        }),
        searchMyInvestment: builder.query({
           query : (data:{name: string, investmentType: string, pageSize: string, pageNumber: string}) => ({
               url: `investmentVehicle/search/financier/${data.name}?investmentVehicleType=${data.investmentType}&pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`,
               method: 'GET'
           })
        }),


    })
})

export const {useViewFinancierDashboardQuery,useSearchMyInvestmentQuery,useFilterMyInvestmentQuery, useViewMyInvestmentQuery } = financierOnboardingAndDashboardApi