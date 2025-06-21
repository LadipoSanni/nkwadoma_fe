import React, {useEffect} from "react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
// import {redirect} from "next/navigation";
// import {useToast} from "@/hooks/use-toast";
import {isTokenExpired} from "@/utils/GlobalMethods";
import {clearData, getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
// import {persistor} from "@/redux/store";
// import {useLogoutMutation} from "@/service/users/api";
// import {useEffect} from "react";
import {useRefreshTokenMutation} from "@/service/unauthorized/action";


interface Props {
    children: React.ReactNode;
}
const RefreshUserToken = ({children}: Props) => {
    const refreshToken = getUserDetailsFromStorage('refresh_token')
    const [refreshUserToken ] = useRefreshTokenMutation()
    const  storedAccessToken  = getItemSessionStorage('access_token');
    const isAccessTokenExpired = isTokenExpired(storedAccessToken || '')
    // const response2 = isTokenExpired(refreshToken || '')


    useEffect(() => {
        const tryRefreshToken = async () => {
            if (isAccessTokenExpired) {
                const data = {
                    refreshToken: refreshToken,
                };

                try {
                    const response = await refreshUserToken(data);
                    const accessToken = response?.data?.data?.access_token;
                    const refreshToken = response?.data?.data?.refresh_token;
                    setItemSessionStorage("access_token", accessToken);
                    setItemSessionStorage("refresh_token", refreshToken);
                    console.log('refresh user response:', response);
                } catch (error) {
                    console.error('Failed to refresh token', error);
                }
            }
        };

        tryRefreshToken();
    }, [isAccessTokenExpired, refreshToken, storedAccessToken]);

    return (
        <div>
            {children}
        </div>
    )

};

export default RefreshUserToken;