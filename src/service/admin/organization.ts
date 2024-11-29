import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";

export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['organization', "invite"],
    endpoints: (builder) => ({
        viewAllOrganizations: builder.query({
            query: (data) => ({
                url: `/organization/all?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
                method: 'GET'
            }),
            providesTags: ['invite', "organization"]
        }),
        inviteOrganization: builder.mutation({
            query: (data) => ({
                url : `/organization/invite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invite', "organization"]
        })
    })
})

export const { useViewAllOrganizationsQuery, useInviteOrganizationMutation} = organizationApi
