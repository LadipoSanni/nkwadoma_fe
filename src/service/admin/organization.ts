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
    tagTypes: ['organization', "invite","deactivate","reactivate","admin"],
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
        inviteAdmin: builder.mutation({
            query: (data: {
                email: string;
                firstName: string;
                lastName: string;
                role: string;
            }) => ({
                url: `auth/colleague/invite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
        viewAllAdminsInOrganization: builder.query({
            query: (data) => ({
                url: `/organization/employees/${data.organizationId}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
                method: 'GET'
            }),
            providesTags: ['invite', "organization"]
        }),

        getOrganizationDetails: builder.query({
            query:({id}) => ({
                url: `/organization/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: 'organization', id: arg.id }],
        }),
        getDetailsOfOrganization: builder.query({
            query:() => ({
                url: "/organization/details",
                method: "GET",
            }),
             providesTags: [ "organization"]
        }),
        searchOrganisationAdminByName: builder.query({
            query: (name) => ({
                url: '/organization/search/admin',
                method: 'GET',
                params: {name},
            }),
        }),
        deactivateOrganization: builder.mutation({
            query: (data: {
                     id: string,
                     reason: string,
                     
            }) => ({
                url : `/organization/deactivate`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['organization', "deactivate","invite"]
        }),
        activateOrganization: builder.mutation({
            query: (data: {
                     id: string,
                     reason: string,
                     
            }) => ({
                url : `/organization/reactivate`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['organization', "reactivate","invite"]
        }),
        viewOrganizationAdmin: builder.query({
            query: (param: {
                     pageSize: number,
                     pageNumber: number,
                     
            }) => ({
                url : `/organization/view-all/admin`,
                method: 'GET',
                params: param
            }),
            providesTags: ['admin']
        }),
        viewOrganizations : builder.query({
           query: ()=> ({
               url: `/organizations`,
               method: 'GET'
           })
        }),
        searchOrganizationAsPortfolioManager : builder.query({
            query: (param:{
                organizationId: string,
                name: string,
                pageSize: number,
                pageNumber: number

            })=> ({
                 url: `/organization/search-admin`,
               method: 'GET',
               params: param
            })
        })
    })
})

export const { useViewOrganizationsQuery, useViewAllOrganizationsQuery,useInviteOrganizationMutation, useSearchOrganisationByNameQuery, useInviteAdminMutation, useViewAllAdminsInOrganizationQuery,useGetOrganizationDetailsQuery, useGetDetailsOfOrganizationQuery,useSearchOrganisationAdminByNameQuery,useDeactivateOrganizationMutation,useActivateOrganizationMutation,useViewOrganizationAdminQuery,useSearchOrganizationAsPortfolioManagerQuery} = organizationApi
