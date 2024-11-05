

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// import { getUserToken } from '@/services/storage';
// import fetch from 'node-fetch'; // Import node-fetch for SSR

const baseUrl = `https://api-systest.learnspace.africa/api/v1/auth/login`;

console.log("base: ", baseUrl)

export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    // fetchFn: typeof window === 'undefined'
    //     ? (fetch as unknown as typeof globalThis.fetch) // Use node-fetch for SSR but cast to global fetch type
    //     : undefined, // Use browser's fetch in client-side environments
    prepareHeaders: (headers) => {
        // const token = getUserToken();
        console.log("base: ", baseUrl)

        // if (token) {
        //     headers.set('authorization', Bearer ${token});
        //     headers.set('Content-type', 'application/json');
        // }

        return headers;
    },
});
