
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getUserDetails } from '@/features/auth/usersAuth/login/action';
import {isTokenValid} from "@/utils/GlobalMethods";



const baseUrl = process.env.APP_DEV_AUTH_URL;


export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    fetchFn: typeof window === 'undefined'
        ? (fetch as unknown as typeof globalThis.fetch) // Use node-fetch for SSR but cast to global fetch type
        : undefined, 
    prepareHeaders: (headers) => {
        const { storedAccessToken } = getUserDetails();
        const {storedRefreshToken} = getUserDetails();
        const token = isTokenValid(storedAccessToken ? storedAccessToken : '') ? storedAccessToken : storedRefreshToken
        console.log('token: ', token, 'storedAccessToken: ', storedAccessToken, 'storedRefreshToken: ', storedRefreshToken);
        if (storedAccessToken) {
            headers.set('authorization', `Bearer ${token}`);
            headers.set('Content-type', 'application/json');
        }

        return headers;
    },
});