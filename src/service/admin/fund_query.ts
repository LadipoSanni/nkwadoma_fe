import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const fundApi = createApi({
    reducerPath: 'fundApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['vehicle'],
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
        providesTags: ['vehicle'],
      }),
      getInvestmentVehicleDetail: builder.query({
        query:({id}) => ({
          url: `/investment-vehicle-details/${id}`,
          method: "GET",
        }),
        // providesTags: (result, error, arg) => [{ type: 'vehicle', id: arg.id }],
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
       sponsors: string,
       minimumInvestmentAmount: string

        }) => ({
                url: `/investment-vehicle`,
                method: 'POST',
                body: data
        }),
        invalidatesTags: ['vehicle']
       }),
       searchInvestmentVehicleByName: builder.query({
        query: (investmentVehicleName) => ({
            url: `/investmentvehicle/search/${investmentVehicleName}`,
            method: 'GET'
        }),
    }),
    })
})

export const { useGetAllInvestmentmentVehicleQuery,useGetInvestmentVehicleDetailQuery,useCreateInvestmentVehicleMutation,useSearchInvestmentVehicleByNameQuery} = fundApi;