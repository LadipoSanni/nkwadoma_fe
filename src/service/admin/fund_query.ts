import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

interface InvestmentVehicle {
    id: string;
    name: string;
    investmentVehicleType: 'COMMERCIAL' | 'ENDOWMENT';
    mandate: string;
    sponsors: string;
    tenure: number;
    size: number;
    rate: number;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    minimumInvestmentAmount: number;
    status: string;
    startDate: string;
    totalAmountInInvestmentVehicle:number;
}
interface InvestmentVehicleResponse {
    data: InvestmentVehicle[];
    total: number;
    pageSize: number;
    pageNumber: number;
}
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
        providesTags: ['vehicle'],
      }),
       createInvestmentVehicle: builder.mutation({
        query: (data:{
        name:  string,
        investmentVehicleType: string | undefined,
        mandate: string,
       tenure: string | number,
       size: string | number,
       rate: string | number,
       trustee: string,
       custodian: string,
       bankPartner: string,
       fundManager: string,
       sponsors: string,
       minimumInvestmentAmount: number | string,
       investmentVehicleStatus?: string

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
        getPublishedInvestmentVehicleByName: builder.query({
            query: (param: { status: string }) => ({
                url: '/view-all-investment-vehicle-by-status',
                method: "GET",
                params: param,
            }),
            providesTags: ['vehicle'],
        }),
        getInvestmentVehiclesByTypeAndStatus: builder.query<
            InvestmentVehicleResponse,
            { pageSize: number; pageNumber: number; type: string; status: string }
        >({
            query: ({ pageSize, pageNumber, type, status }) => ({
                url: '/view-all-investment-vehicle-by-type-and-status',
                method: 'GET',
                params: {
                    pageSize,
                    pageNumber,
                    type,
                    status,
                },
            }),
            providesTags: ['vehicle'],
        }),
    }),
})

export const {
    useGetAllInvestmentmentVehicleQuery,
    useGetInvestmentVehicleDetailQuery,
    useCreateInvestmentVehicleMutation,
    useSearchInvestmentVehicleByNameQuery,
    useGetPublishedInvestmentVehicleByNameQuery,
    useGetInvestmentVehiclesByTypeAndStatusQuery,

} = fundApi;