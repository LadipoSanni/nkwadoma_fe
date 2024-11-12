import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.APP_DEV_AUTH_URL;

export const programDetailsApi = createApi({
    reducerPath: 'programApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProgramById: builder.query({
            query: (id) => `program/${id}`,
        }),
    }),
});

export const { useGetProgramByIdQuery } = programDetailsApi;