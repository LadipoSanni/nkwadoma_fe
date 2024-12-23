import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const fundApi = createApi({
    reducerPath: 'fundApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['funds'],
    endpoints: (builder) => ({
      getAllInvestmentmentVehicle: builder.query({
        query: (param: {
            pageSize?: number;
            pageNumber?: number;
        }) => ({
          url: '/view-all-investment-vehicle',
          method: "GET",
          params: param,
        }),
        providesTags: ['funds'],
      }),
      getInvestmentVehicleDetail: builder.query({
        query:({id}) => ({
          url: `/investment-vehicle-details/${id}`,
          method: "GET",
        }),
        // providesTags: (result, error, arg) => [{ type: 'funds', id: arg.id }],
        providesTags: ['funds'],
      }),
       createIInvestmentVehicle: builder.mutation({
        query: (data: {}) => ({
                url: `auth/colleague/invite`,
                method: 'POST',
                body: data
        })
       })
    })
})

export const { useGetAllInvestmentmentVehicleQuery,useGetInvestmentVehicleDetailQuery } = fundApi;