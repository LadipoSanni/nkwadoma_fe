import React, {useEffect, useRef} from "react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import { getItemSessionStorage, } from "@/utils/storage";
import {useRefreshTokenMutation} from "@/service/unauthorized/action";
import {jwtDecode} from "jwt-decode";


interface Props {
    children: React.ReactNode;
}
const RefreshUserToken = ({children}: Props) => {
    const refreshToken = getUserDetailsFromStorage('refresh_token')
    const [refreshUserToken ] = useRefreshTokenMutation()
    const  storedAccessToken  = getItemSessionStorage('access_token');
    // const isAccessTokenExpired = isTokenExpired(storedAccessToken || '')
    // const response2 = isTokenExpired(refreshToken || '')
    const refreshTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!storedAccessToken) return;
        const decoded: { exp: number } = jwtDecode(storedAccessToken);
        const expiryTimeMs = decoded?.exp * 1000;
        const now = Date.now();

        // Calculate when to refresh: 10 seconds before expiry
        const refreshTime = expiryTimeMs - now - 10000;

        // Clear previous timer
        if (refreshTimeout.current) {
            clearTimeout(refreshTimeout.current);
        }

        if (refreshTime > 0) {
            refreshTimeout.current = setTimeout(async () => {
                try {

                    const response = await refreshUserToken({ refreshToken });
                    const accessToken = response?.data?.data?.access_token;
                    const newRefreshToken = response?.data?.data?.refresh_token;

                    if (accessToken && newRefreshToken) {
                        sessionStorage.setItem('access_token', accessToken);
                        sessionStorage.setItem('refresh_token', newRefreshToken);
                        // console.log('Token refreshed:', response);

                        // Optionally, update your app state here or trigger re-render
                    }
                } catch (error) {
                    console.error('Failed to refresh token', error);
                    // Optionally logout user here if refresh fails
                }
            }, refreshTime);
        } else {
            // Token expired or about to expire; refresh immediately
            (async () => {
                try {
                    // const refreshToken = sessionStorage.getItem('refresh_token');
                    if (!refreshToken) return;

                    const response = await refreshUserToken({ refreshToken });
                    const accessToken = response?.data?.data?.access_token;
                    const newRefreshToken = response?.data?.data?.refresh_token;

                    if (accessToken && newRefreshToken) {
                        sessionStorage.setItem('access_token', accessToken);
                        sessionStorage.setItem('refresh_token', newRefreshToken);
                        // console.log('Token refreshed immediately:', response);
                    }
                } catch (error) {
                    console.error('Failed to refresh token immediately', error);
                }
            })();
        }

        return () => {
            if (refreshTimeout.current) {
                clearTimeout(refreshTimeout.current);
            }
        };
    }, [storedAccessToken, refreshUserToken, refreshToken]);

    // useEffect(() => {
    //     const tryRefreshToken = async () => {
    //         if (isAccessTokenExpired) {
    //             const data = {
    //                 refreshToken: refreshToken,
    //             };
    //
    //             try {
    //                 const response = await refreshUserToken(data);
    //                 const accessToken = response?.data?.data?.access_token;
    //                 const refreshToken = response?.data?.data?.refresh_token;
    //                 setItemSessionStorage("access_token", accessToken);
    //                 setItemSessionStorage("refresh_token", refreshToken);
    //                 console.log('refresh user response:', response);
    //             } catch (error) {
    //                 console.error('Failed to refresh token', error);
    //             }
    //         }
    //     };
    //
    //     tryRefreshToken();
    // }, [isAccessTokenExpired, refreshToken, storedAccessToken]);

    return (
        <div>
            {children}
        </div>
    )

};

export default RefreshUserToken;