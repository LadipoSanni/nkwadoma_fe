import {getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";
import axios from 'axios';


export async  function refreshTokenAction (token?: string) {
    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;
    try {
        const response = await axios.post(url, { refreshToken: token });
        const accessToken = response?.data?.data?.access_token;
        const refreshToken = response?.data?.data?.refresh_token;

        setItemSessionStorage("access_token", accessToken);
        setItemSessionStorage("refresh_token", refreshToken);
    } catch (error) {
        console.error('Error refreshing token:', error);
    }


}

export async function getToken () {
    const storedRefreshToken = getItemSessionStorage("refresh_token")
    const  storedAccessToken  = getItemSessionStorage('access_token');

    if (isTokenExpired(storedAccessToken)) {
         await refreshTokenAction(storedRefreshToken);
    }

    return storedAccessToken;
}
