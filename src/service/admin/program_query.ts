import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const programApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['program'],
    endpoints: (builder) => ({
        getAllPrograms: builder.query({
            query: (body: {
                organizationId: string;
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/program/all',
                method: "GET",
                body,
            }),
        }),
        getProgramById: builder.query({
            query: ({id}) => ({
                url: `/program/${id}`,
                method: "GET",
              }),
        }),
        deleteProgram:  builder.mutation({
          query: ({id}) => ({
              url: `/program/delete/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ['program'],
        }),
        searchProgram: builder.query({
            query: (name) => ({
        url: '/program/search', 
        method: 'GET',
        params: { name }, 
      }),
    //    transformResponse: (response) => response.data, 
    }),
    }),
})


export const { useGetAllProgramsQuery, useGetProgramByIdQuery, useDeleteProgramMutation,useSearchProgramQuery } = programApi;