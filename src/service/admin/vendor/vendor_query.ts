import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ['vendor'],
  endpoints: (builder) => ({
    viewAllPartnerProviders: builder.query({
      query: (param: {
        name?:string;
        pageSize: number;
        pageNumber: number;
    }) => {    
        return {
          url: `/vendor/all`,
          method: "GET",
          params: param
        };
      },
    //   invalidatesTags: ['vendor'],
    }),
    viewAllProviderServices: builder.query({
      query: (param: {
        name?:string;
        pageSize: number;
        pageNumber: number;
    }) => {    
        return {
          url: `/vendor/provider-service/all`,
          method: "GET",
          params: param
        };
      },
       //   invalidatesTags: ['vendor'],
    }),
  }),
});

export const { useViewAllPartnerProvidersQuery,useViewAllProviderServicesQuery} = vendorApi;