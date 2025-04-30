import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";


export const financierApi = createApi({
    reducerPath: 'financierApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['financier'],
    endpoints: (builder) => ({
        inviteFinancier: builder.mutation({
            query: (data:{
                financierRequests: {
                    userIdentity: {
                      firstName: string;
                      lastName: string;
                      email: string;
                    };
                    investmentVehicleDesignation: string[];
                    organizationEmail: string;
                    organizationName: string;
                    financierType: string;
                  }[];
                  investmentVehicleId?: string;
            })=> ({
                url: '/financier/invite',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['financier']
        }),
        viewFinanciersByInvestmentmentVehicle: builder.query({
            query: (param:{
                pageNumber: number,
                pageSize: number,
                investmentVehicleId: string
            })=> ({
                url: "/financier/investment-vehicle/all/view",
                method: 'GET',
                params: param
            }),
            providesTags: ['financier']
        }),
        searchFinancier: builder.query({
            query: (param: { 
               name: string; 
               pageNumber: number; 
                pageSize: number; 
                activationStatus?: string;
                investmentVehicleId?: string

            })=> ({
                url: "/financier/search",
                method: 'GET',
                params: param
            })
        }),
        viewAllFinanciers: builder.query({
            query: (param: { 
                 pageSize: number; 
                 pageNumber: number; 
                 financierType?: string
             }) => ({
                url: "/financier/all/view",
                method: 'GET',
                params: param
            }),
            providesTags: ['financier']
        }),
        viewFinancierDetail: builder.query({
            query: (param:{financierId: string}) => ({
                url: `/financier/view`,
                method: 'GET', 
                params: param
            }),
            providesTags: ['financier']
        }),
        getAllActiveAndInvitedFinanciers: builder.query({
            query: (param: {pageNumber: number, pageSize: number, financierType?: string, activationStatus?: string}) => ({
                url: "/financier/all/view",
                method: 'GET',
                params: param
            }),
            providesTags: ['financier']
        }),
        viewFinancierVehicles: builder.query({
            query: (param:{
                financierId: string,
                pageNumber: number,
                pageSize: number,
            })=> ({
                url: "/financier/all-investment?",
                method: 'GET',
                params: param
            }),
            providesTags: ['financier']
        }),
        searchFinancierVehicle: builder.query({
            query: (param: {
                investmentVehicleName: string;
                financierId?: string
                pageSize: number;
                pageNumber: number;

            })=> ({
                url: "/financier/search-all-investment?",
                method: 'GET',
                params: param
            })
        }),
    })
})

export const {useInviteFinancierMutation,useViewFinanciersByInvestmentmentVehicleQuery,
    useSearchFinancierQuery,useViewAllFinanciersQuery, useViewFinancierVehiclesQuery,
    useViewFinancierDetailQuery, useGetAllActiveAndInvitedFinanciersQuery, useSearchFinancierVehicleQuery} = financierApi