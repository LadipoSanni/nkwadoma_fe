

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getUserDetails } from '@/features/auth/usersAuth/login/action';


const baseUrl = process.env.APP_DEV_AUTH_URL;


export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const { storedAccessToken } = getUserDetails();
        if (storedAccessToken) {
            headers.set('authorization', `Bearer ${storedAccessToken}`);
            headers.set('Content-type', 'application/json');
        }

        return headers;
    },
});
