

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getUserDetails } from '@/features/auth/usersAuth/login/action';

// import {getItemSessionStorage} from "@/utils/storage";
// import fetch from 'node-fetch'; // Import node-fetch for SSR

const baseUrl = process.env.APP_DEV_AUTH_URL;


export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    fetchFn: typeof window === 'undefined'
        ? (fetch as unknown as typeof globalThis.fetch) // Use node-fetch for SSR but cast to global fetch type
        : undefined, 
    prepareHeaders: (headers) => {
        const { storedAccessToken } = getUserDetails();
        console.log("confirmed: ",baseUrl)
        if (storedAccessToken) {
            headers.set('authorization', `Bearer ${storedAccessToken}`);
            headers.set('Content-type', 'application/json');
        }

        return headers;
    },
});
