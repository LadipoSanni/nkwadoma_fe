import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const publicInvestmentApi = createApi({
    reducerPath: "publicInvestmentApi",
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
        viewPublicInvestmentDetails: builder.query({
            query: (investmentName: string| undefined)=> ({
                url: `/investment-vehicle/detail/link/${investmentName}`,
                method: 'GET',
            })
        }),


    })
})

export const  {useViewPublicInvestmentDetailsQuery} = publicInvestmentApi;