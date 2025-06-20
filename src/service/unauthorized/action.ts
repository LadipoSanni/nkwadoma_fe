import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const unauthorizedApis = createApi({
    reducerPath: "unauthorizedApis",
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
        viewPublicInvestmentDetails: builder.query({
            query: (investmentName: string| undefined)=> ({
                url: `/investment-vehicle/detail/link/${investmentName}`,
                method: 'GET',
            })
        }),
        refreshToken: builder.mutation({
            query: (rrefreshToken:string| undefined) => ({
                url: ``,
                method: 'POST'
            })

        }),


    })
})

export const  {useViewPublicInvestmentDetailsQuery} = unauthorizedApis;