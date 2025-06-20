import {getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";
import axios from 'axios';


export async  function refreshTokenAction (token?: string) {
    // const {storedRefreshToken} = getUserDetails();
    // console.log('stored refreshToken', storedRefreshToken);
    // I think you can use the base url here;
    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;
    // method: "POST",
    //     body: JSON.stringify({refreshToken: token}),
    //     headers: {
    //     "Content-Type": "application/json",
    // },
    // try{
         await axios.post(url, {refreshToken: token})
             .then((response ) => {
                 const json =  response;
                 // console.log('json', json);
                 setItemSessionStorage("access_token", json?.data?.access_token);
                 setItemSessionStorage("refresh_token",json?.data?.refresh_token)
             }).catch((error) => {
             console.log('error', error);
         })

    // }catch (error){
    //     console.log('error', error)
    // }
}

export async function getToken () {
    // const { storedAccessToken } = getUserDetails();
    const storedRefreshToken = getItemSessionStorage("refresh_token")
    const  storedAccessToken  = getItemSessionStorage('access_token');

    if (isTokenExpired(storedAccessToken)) {
         await refreshTokenAction(storedRefreshToken);
    }

    return storedAccessToken;
}
