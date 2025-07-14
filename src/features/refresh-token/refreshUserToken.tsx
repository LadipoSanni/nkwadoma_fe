import React, {useEffect} from "react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {clearData, getItemSessionStorage,} from "@/utils/storage";
import {useRefreshTokenMutation} from "@/service/unauthorized/action";
import {jwtDecode} from "jwt-decode";
import {persistor, store} from "@/redux/store";
import {redirect} from "next/navigation";
import {useLogoutMutation} from "@/service/users/api";
import {useToast} from "@/hooks/use-toast";
import {setError} from "@/redux/slice/auth/slice";

// interface ApiError {
//     status: number;
//     data: {
//         message: string;
//     };
// }

interface Props {
    children: React.ReactNode;
}
const RefreshUserToken = ({children}: Props) => {
    const refreshToken = getUserDetailsFromStorage('refresh_token')
    const [refreshUserToken ] = useRefreshTokenMutation()
    const [logout] = useLogoutMutation()
    const {toast} = useToast()
    const  storedAccessToken  = getItemSessionStorage('access_token');
    // useEffect(() => {
    //     if (!storedAccessToken) return;
    //     const decoded: { exp: number } = jwtDecode(storedAccessToken);
    //     const expirationTimeInMilliseconds = decoded?.exp * 1000;
    //     const now = Date.now();
    //     const refreshTime = Math.max(expirationTimeInMilliseconds - now - 10000, 0);
    //     const timeoutId = setTimeout(function() {
    //         (async () => {
    //             try {
    //                 const response = await refreshUserToken({ refreshToken });
    //                 const accessToken = response?.data?.data?.access_token;
    //                 const newRefreshToken = response?.data?.data?.refresh_token;
    //                 if (accessToken && newRefreshToken) {
    //                     sessionStorage.setItem('access_token', accessToken);
    //                     sessionStorage.setItem('refresh_token', newRefreshToken);
    //                 }
    //             } catch (error) {
    //                 const err = error as ApiError;
    //                 logout({})
    //                 toast({
    //                     description: "Session expired. Please login again",
    //                     status: "error",
    //                 });
    //                 await persistor.purge();
    //                 clearData()
    //                 store.dispatch(setError(String(err?.data?.message)))
    //                 redirect("/auth/login")
    //             }
    //         })();
    //     }, refreshTime);
    //     return () => clearTimeout(timeoutId);
    //
    // }, [storedAccessToken, refreshUserToken, refreshToken]);

    useEffect(() => {
        let isMounted = true;
        if (!storedAccessToken) return;

        let decoded: { exp: number };
        try {
            decoded = jwtDecode(storedAccessToken);
        } catch (err) {
            console.error("Invalid token:", err);
            return;
        }

        const expirationTimeInMilliseconds = decoded.exp * 1000;
        const now = Date.now();

        // Immediate logout if already expired
        if (expirationTimeInMilliseconds <= now) {
            console.warn("Token already expired");
            logout({});
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            persistor.purge().then(() => {
                clearData();
                store.dispatch(setError("Token expired"));
                redirect("/auth/login");
            });
            return;
        }

        const refreshTime = Math.max(expirationTimeInMilliseconds - now - 10000, 0);

        const timeoutId = setTimeout(() => {
            (async () => {
                if (!isMounted) return;
                try {
                    const response = await refreshUserToken({ refreshToken });
                    const accessToken = response?.data?.data?.access_token;
                    const newRefreshToken = response?.data?.data?.refresh_token;
                    if (accessToken && newRefreshToken) {
                        sessionStorage.setItem("access_token", accessToken);
                        sessionStorage.setItem("refresh_token", newRefreshToken);
                    } else {
                        throw new Error("Missing new tokens");
                    }
                } catch (error) {
                    if (!isMounted) return;
                    console.error("Token refresh failed:", error);
                    logout({});
                    toast({
                        description: "Session expired. Please login again",
                        status: "error",
                    });
                    await persistor.purge();
                    clearData();
                    store.dispatch(setError("Token refresh failed"));
                    redirect("/auth/login");
                }
            })();
        }, refreshTime);

        return () => {
            isMounted = false;
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