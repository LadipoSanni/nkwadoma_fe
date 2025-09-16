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
            query: (param: {
                 name: string,
                 status?: string,
                pageSize: number,
                pageNumber: number,
                
       }) => ({
                url: '/organization/search',
                method: 'GET',
                params: param,
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
            query:(param: {organizationId?: string}) => ({
                url: `/organization/details`,
                method: "GET",
                params:param
            }),
            providesTags: [ 'organization'],
        }),
        getDetailsOfOrganization: builder.query({
            query:() => ({
                url: "/organization/details",
                method: "GET",
            }),
             providesTags: [ "organization"]
        }),
        searchOrganisationAdminByName: builder.query({
            query: (param:{name: string,pageNumber: number,pageSize:number}) => ({
                url: '/organization/search/admin',
                method: 'GET',
                params: param,
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
                name?: string,
                activationStatuses: string[],
                identityRoles: string[],
                     pageSize: number,
                     pageNumber?: number,
                     
            }) => ({
                url : `/organization/view-all/admin`,
                method: 'GET',
                params: param
            }),
            providesTags: ['admin']
        }),
        viewOrganizations : builder.query({
           query: (param: {
           loanType: string,
            pageSize: number,
            pageNumber: number,
           })=> ({
               url: `/organizations`,
               method: 'GET',
               params: param
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
        }),
        viewAllOrganizationByStatus: builder.query({
            query: (param:{
                pageNumber: number,
                pageSize: number,
                status: string
            }) => ({
                url: "/organization/all/status",
                method: 'GET',
                params: param
            })
        }),
        inviteColleague: builder.mutation({
            query: (data: {
                email: string;
                firstName: string;
                lastName: string;
                role: string;
            }) => ({
                url: `/organization/colleague/invite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
        approveOrDeclineOrganization: builder.mutation({
            query: (data: {
                organizationId: string;
                activationStatus: string;
            }) => ({
                url: `/organization/approve/invite`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
        deactivateUser: builder.mutation({
            query:(data:{
                id: string,
                reason: string
            }) => ({
                url: `/auth/user/deactivate`,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
       reactivateUser: builder.mutation({
            query:(data:{
                id: string,
                reason: string
            }) => ({
                url: `/auth/user/reactivate`,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
        approveOrDeclineAdmin: builder.mutation({
            query: (param:{
                organizationEmployeeId: string;
                decision: string
            }) => ({
                url: `/organization/respond/invite/colleague`,
                method: 'POST',
                params: param
            }),
            invalidatesTags: ['invite', "organization","admin"]
        }),
        viewStaffDetails: builder.query({
            query: (param:{
                employeeId: string;
            }) => ({
                url: `organization/view/employee/details`,
                method: 'GET',
                params: param
            }),
        }),
         
    })
})

export const { useViewOrganizationsQuery, useViewAllOrganizationsQuery,
    useInviteOrganizationMutation, useSearchOrganisationByNameQuery,
     useInviteAdminMutation, useViewAllAdminsInOrganizationQuery,
     useGetOrganizationDetailsQuery, useGetDetailsOfOrganizationQuery,
     useSearchOrganisationAdminByNameQuery,useDeactivateOrganizationMutation,
     useActivateOrganizationMutation,useViewOrganizationAdminQuery,
     useSearchOrganizationAsPortfolioManagerQuery,useViewAllOrganizationByStatusQuery,
     useInviteColleagueMutation,useApproveOrDeclineOrganizationMutation,useDeactivateUserMutation,
    useReactivateUserMutation, useApproveOrDeclineAdminMutation,useViewStaffDetailsQuery} = organizationApi
