import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";

interface  serviceOfferings{
    industry: string;
    name: string;
    transactionLowerBound: string,
    transactionUpperBound: string
}



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
            query: (data: {
                     name: string,
                     email: string,
                     websiteAddress: string,
                     rcNumber: string,
                     tin: string,
                     phoneNumber: string,
                     adminFirstName: string,
                     adminLastName:string
                     adminEmail: string,
                     adminRole: string,
                     serviceOfferings:serviceOfferings[]
            }) => ({
                url : `/organization/invite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invite', "organization"]
        }),

        searchOrganisationByName: builder.query({
            query: (name) => ({
                url: '/organization/search',
                method: 'GET',
                params: {name},
            }),

        }),

    })
})

export const { useViewAllOrganizationsQuery, useInviteOrganizationMutation, useSearchOrganisationByNameQuery} = organizationApi
