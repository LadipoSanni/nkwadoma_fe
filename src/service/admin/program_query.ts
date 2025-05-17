import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const programApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['program'],
    endpoints: (builder) => ({
        getAllPrograms: builder.query({
            query: (param: {
                organizationId?: string;
                pageSize?: number;
                pageNumber?: number;
            }) => ({
                url: '/program/programs/all',
                method: "GET",
                params: param,
  
            }),
            providesTags: ['program'],
        }),
        getProgramById: builder.query({
            query: ({id}) => ({
                url: `/program/${id}`,
                method: "GET",
              }),
              providesTags: (result, error, arg) => [{ type: 'program', id: arg.id }],
        }),
        deleteProgram:  builder.mutation({
          query: ({id}) => ({
              url: `/program/delete/${id}`,
              method: "DELETE",
            }),
            invalidatesTags:  ({ id }) => [{ type: 'program', id }],
        }),
        searchProgram: builder.query({
            query: (name) => `program/search?name=${name}`,
        }),
        createProgram: builder.mutation({
            query: (formData:
                 {
                programName: string,
                programDescription: string,
                programDuration: string,
                deliveryType: string,
                programMode: string,
            }
        ) => ({
                url: '/program',
                method: "POST",
                body:formData,
            }),
            invalidatesTags: ['program'],
        }),
        updateProgram: builder.mutation({
            query: ({ id, data }) => ({
                url: `/program/${id}`,
                method: "PATCH",
                body: data,
            }),
            //  invalidatesTags:  ({ id }) => [{ type: 'program', id }], 
            invalidatesTags: ['program'], 
        }),

        searchCohortsInAParticularProgram: builder.query({
            query: (param:{
                cohortName?: string;
                programId?: string

            }) => ({
                url: '/program/searchCohort', 
                method: 'GET',
                params: param, 
            })
        })
    
    }),
})


export const { useGetAllProgramsQuery, useGetProgramByIdQuery, useDeleteProgramMutation,useSearchProgramQuery , useCreateProgramMutation, useUpdateProgramMutation, useSearchCohortsInAParticularProgramQuery} = programApi;