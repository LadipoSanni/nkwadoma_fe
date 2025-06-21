import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";


export const unauthorizedApis = createApi({
    reducerPath: "unauthorizedApis",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-systest.meedl.africa/api/v1' }),
    endpoints: (builder) => ({
        viewPublicInvestmentDetails: builder.query({
            query: (investmentName: string| undefined)=> ({
                url: `/investment-vehicle/detail/link/${investmentName}`,
                method: 'GET',
            })
        }),
        refreshToken: builder.mutation({
            query: (data) => ({
                url: `/auth/refresh-token`,
                method: 'POST',
                body: data
            })

        }),


    })
})

export const  {useViewPublicInvestmentDetailsQuery, useRefreshTokenMutation} = unauthorizedApis;