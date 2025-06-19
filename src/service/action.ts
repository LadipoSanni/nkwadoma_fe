import {getUserDetails} from "@/features/auth/usersAuth/login/action";
import {getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";
import axios from 'axios';


export  function refreshTokenAction (token?: string) {
    const {storedRefreshToken} = getUserDetails();
    console.log('stored refreshToken', storedRefreshToken);
    // I think you can use the base url here;
    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;
    // method: "POST",
    //     body: JSON.stringify({refreshToken: token}),
    //     headers: {
    //     "Content-Type": "application/json",
    // },
    // try{
         axios.post(url, {refreshToken: token})
             .then((response ) => {
                 const json =  response
                 console.log('json', json);
                 setItemSessionStorage("access_token", json?.data?.data?.access_token);
                 setItemSessionStorage("refresh_token",json?.data?.data?.refresh_token)
             }).catch((error) => {
             console.log('error: ', error)
         })

    // }catch (error){
    //     console.log('error', error)
    // }
}

export  function getToken () {
    console.log('trying to get token')
    // const { storedAccessToken } = getUserDetails();
    const storedRefreshToken = getItemSessionStorage("refresh_token")
    const  storedAccessToken  = getItemSessionStorage('access_token');

    console.log('refresh token', storedRefreshToken);
    if (isTokenExpired(storedAccessToken)) {
        console.log('access token expired');
          refreshTokenAction(storedRefreshToken);
    }
    console.log('returning access token')
    console.log('stored access token:', storedAccessToken);
    return storedAccessToken ? storedAccessToken : '';
}
