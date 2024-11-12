import { createApi } from '@reduxjs/toolkit/query/react';
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const programDetailsApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
        getProgramById: builder.query({
            query: (id) => `program/${id}`,
        }),
    }),
});

export const { useGetProgramByIdQuery } = programDetailsApi;