'use client'
import React, {useEffect} from "react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {clearData, getItemSessionStorage,} from "@/utils/storage";
import {useRefreshTokenMutation} from "@/service/unauthorized/action";
import {jwtDecode} from "jwt-decode";
import {persistor, store} from "@/redux/store";
import { useRouter } from "next/navigation";
import {useLogoutMutation} from "@/service/users/api";
import {useToast} from "@/hooks/use-toast";
import {setError} from "@/redux/slice/auth/slice";


interface Props {
    children: React.ReactNode;
}
const RefreshUserToken = ({children}: Props) => {
    const refreshToken = getUserDetailsFromStorage('refresh_token')
    const [refreshUserToken ] = useRefreshTokenMutation()
    const [logout] = useLogoutMutation()
    const {toast} = useToast()
    const router = useRouter();

    const  storedAccessToken  = getItemSessionStorage('access_token');

    useEffect(() => {
        if (!storedAccessToken) return;

        let decoded: { exp: number };

        try {
            decoded = jwtDecode(storedAccessToken);
        } catch (err) {
            console.error("Invalid token:", err);
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            clearData();
            router.push("/auth/login");
            return;
        }

        const expirationTimeInMilliseconds = decoded.exp * 1000;
        const now = Date.now();


        if (expirationTimeInMilliseconds <= now) {
            console.warn("Token already expired");
            // await logout({});
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            clearData();
            router.push("/auth/login");
        }

        const refreshTime = Math.max(expirationTimeInMilliseconds - now - 10000, 0);


        const timeoutId = setTimeout(() => {
            (async () => {
                try {
                    const response = await refreshUserToken({ refreshToken });
                    const accessToken = response?.data?.data?.access_token;
                    const newRefreshToken = response?.data?.data?.refresh_token;
                    sessionStorage.setItem("access_token", accessToken);
                    sessionStorage.setItem("refresh_token", newRefreshToken);
                } catch (error) {
                    console.error("Token refresh failed:", error);
                    await logout({});
                    toast({
                        description: "Session expired. Please login again",
                        status: "error",
                    });
                    await persistor.purge();
                    clearData();
                    store.dispatch(setError("Token refresh failed"));
                    router.push("/auth/login");
                }
            })();
        }, refreshTime);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [storedAccessToken, refreshUserToken, refreshToken]);

    return (
        <div>
            {children}
        </div>
    )

};

export default RefreshUserToken;