import {getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";
import axios from 'axios';


export async  function refreshTokenAction (token?: string) {
    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;
         await axios.post(url, {refreshToken: token})
             .then((response ) => {
                 const json =  response;
                 setItemSessionStorage("access_token", json?.data?.data?.access_token);
                 setItemSessionStorage("refresh_token",json?.data?.data?.refresh_token)
             }).catch((error) => {
             console.log('error', error);
         })


}

export async function getToken () {
    const storedRefreshToken = getItemSessionStorage("refresh_token")
    const  storedAccessToken  = getItemSessionStorage('access_token');

    if (isTokenExpired(storedAccessToken)) {
         await refreshTokenAction(storedRefreshToken);
    }

    return storedAccessToken;
}
