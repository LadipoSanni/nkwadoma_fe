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
       createInvestmentVehicle: builder.mutation({
        query: (data:{
        name:  string,
        investmentVehicleType: string | undefined,
        mandate: string,
       tenure: string,
       size: string,
       rate: string,
       trustee: string,
       custodian: string,
       bankPartner: string,
       fundManager: string,
       sponsor: string,
       minimumInvestmentAmount: string

        }) => ({
                url: `/investment-vehicle`,
                method: 'POST',
                body: data
        }),
        invalidatesTags: ['funds']
       })
    })
})

export const { useGetAllInvestmentmentVehicleQuery,useGetInvestmentVehicleDetailQuery,useCreateInvestmentVehicleMutation} = fundApi;