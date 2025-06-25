
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// import {getToken} from "./action";
import {getItemSessionStorage} from "@/utils/storage";



const baseUrl = process.env.APP_DEV_AUTH_URL;


export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    // mode: 'no-cors',
    fetchFn: typeof window === 'undefined'
        ? (fetch as unknown as typeof globalThis.fetch)
        : undefined,
    prepareHeaders:  (headers,{ endpoint }) => {
        // try {
            const token = getItemSessionStorage("access_token")

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                if (
                    endpoint !== 'uploadLoaneeFile' &&
                    endpoint !== 'uploadRepaymentFile'
                ) {
                    headers.set('Content-Type', 'application/json');
                }
            }
        // } catch (error) {
        //     console.error('Error fetching token:', error);
        // }

        return headers;
    },
});