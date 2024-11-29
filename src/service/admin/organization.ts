import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";

export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['organization'],
    endpoints: (builder) => ({
        viewAllOrganizations: builder.query({
            query: (data) => ({
                url: `/organization/all?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
                method: 'GET'
            })
        })
    })
})

export const { useViewAllOrganizationsQuery} = organizationApi
