import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const programApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['program'],
    endpoints: (builder) => ({
        getAllPrograms: builder.query({
            query: (param: {
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/program/programs/all',
                method: "GET",
                params: param,
  
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
        createProgram: builder.mutation({
            query: (formData: {
                programName: string,
                programDescription: string,
                programDuration: string,
                deliveryType: string,
                programMode: string,
            }) => ({
                url: '/program',
                method: "POST",
                formData,
            }),
        }),
        updateProgram: builder.mutation({
            query: ({ id, data }) => ({
                url: `/program/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['program'],  
        }),
    
    }),
})


export const { useGetAllProgramsQuery, useGetProgramByIdQuery, useDeleteProgramMutation,useSearchProgramQuery, useCreateProgramMutation, useUpdateProgramMutation} = programApi;