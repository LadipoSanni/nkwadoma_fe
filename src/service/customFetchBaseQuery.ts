
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getUserDetails } from '@/features/auth/usersAuth/login/action';
import {isTokenExpired} from "@/utils/GlobalMethods";



const baseUrl = process.env.APP_DEV_AUTH_URL;


export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    fetchFn: typeof window === 'undefined'
        ? (fetch as unknown as typeof globalThis.fetch) 
        : undefined, 
    prepareHeaders: (headers,{ endpoint }) => {
        const { storedAccessToken } = getUserDetails();
        const {storedRefreshToken} = getUserDetails();
        const token = isTokenExpired(storedAccessToken) ? storedRefreshToken : storedAccessToken
        if (storedAccessToken || storedRefreshToken) {
            headers.set('authorization', `Bearer ${token}`);
            if (endpoint !== 'uploadLoaneeFile'  && endpoint !== 'uploadRepaymentFile') {
                headers.set('Content-Type', 'application/json');
              }
        }

        return headers;
    },
});