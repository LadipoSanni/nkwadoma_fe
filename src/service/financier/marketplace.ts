import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/service/customFetchBaseQuery";

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
    totalAmountInInvestmentVehicle: number;
}

interface InvestmentVehicleFundRaisingResponse {
    message: string;
    data: {
        body: InvestmentVehicle[];
        totalPages: number;
        pageNumber: number;
        pageSize: number;
        hasNextPage: boolean;
    };
    statusCode: string;
    timeStamp: string | null;
}

export const marketplaceApi = createApi({
    reducerPath: 'marketplaceApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['marketplace'],
    endpoints: (builder) => ({
        searchInvestmentVehicles: builder.query<InvestmentVehicleFundRaisingResponse, {
            searchTerm: string;
            investmentVehicleType?: string;
            investmentVehicleStatus?: string;
            pageSize?: number;
            pageNumber?: number;
        }>({
            query: ({ searchTerm, investmentVehicleType, investmentVehicleStatus = "PUBLISHED", pageSize = 10, pageNumber = 0 }) => ({
                url: `investmentvehicle/search/${searchTerm}`,
                method: 'GET',
                params: {
                    investmentVehicleType,
                    investmentVehicleStatus,
                    pageSize,
                    pageNumber,
                },
            }),
            providesTags: ['marketplace'],
        }),

        getMarketplaceInvestmentVehiclesByTypeAndStatus: builder.query<InvestmentVehicleFundRaisingResponse, { pageSize: number; pageNumber: number; investmentVehicleType?: string; investmentVehicleStatus?: string; fundRaisingStatus?: string; }>({
            query: ({pageSize, pageNumber, investmentVehicleType, investmentVehicleStatus, fundRaisingStatus}) => ({
                url: 'investment-vehicle/all/view/by',
                method: 'GET',
                params: {pageSize, pageNumber, investmentVehicleType, investmentVehicleStatus, fundRaisingStatus,},
            }),
            providesTags: ['marketplace'],
        }),

        getInvestmentVehicleDetail: builder.query({
            query:({id}) => ({
                url: `/investment-vehicle-details/${id}`,
                method: "GET",
            }),
            providesTags: ['marketplace'],
        }),

        confirmInvest: builder.mutation({
            query: (formData) => ({
                url: '/financier/vehicle/invest',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['marketplace'],

        })
    })
})
export const {useSearchInvestmentVehiclesQuery, useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery, useGetInvestmentVehicleDetailQuery, useConfirmInvestMutation } = marketplaceApi