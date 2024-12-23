

import { fetchBaseQuery,FetchArgs, FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query';
import { getUserDetails } from '@/features/auth/usersAuth/login/action';

// import {getItemSessionStorage} from "@/utils/storage";
// import fetch from 'node-fetch'; // Import node-fetch for SSR

const baseUrl = process.env.APP_DEV_AUTH_URL;


const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    fetchFn: typeof window === 'undefined'
        ? (fetch as unknown as typeof globalThis.fetch) // Use node-fetch for SSR but cast to global fetch type
        : undefined, 
    prepareHeaders: (headers) => {
        const { storedAccessToken } = getUserDetails();
        if (storedAccessToken) {
            headers.set('authorization', `Bearer ${storedAccessToken}`);
            headers.set('Content-type', 'application/json');
        }

        return headers;
    },
});

const handleRedirection: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => { let result = await customFetchBaseQuery(args, api, extraOptions); if (result.error && result.error.status === 302) { const location = result.meta?.response?.headers?.get('Location'); if (location) { console.log('Redirecting to:', location); result = await customFetchBaseQuery({ url: location }, api, extraOptions); console.log('Redirected data:', result.data); } } return result; };
export { handleRedirection as customFetchBaseQuery };