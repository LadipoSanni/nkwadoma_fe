import {getUserDetails} from "@/features/auth/usersAuth/login/action";
import {getItemSessionStorage, setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";


export async function refreshTokenAction (token?: string) {
    const {storedRefreshToken} = getUserDetails();
    console.log('stored refreshToken', storedRefreshToken);
    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;

    try{
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({refreshToken: token}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await response.json();
        console.log('json', json);
        setItemSessionStorage("access_token", json?.data?.access_token);
        setItemSessionStorage("refresh_token",json?.data?.refresh_token)
    }catch (error){
        console.log('error', error)
    }

}

export  function getToken () {
    console.log('trying to get token')
    const { storedAccessToken } = getUserDetails();
    const storedRefreshToken = getItemSessionStorage("refresh_token")
    console.log('refresh token', storedRefreshToken);
    if (isTokenExpired(storedAccessToken)) {
        console.log('access token expired');
         refreshTokenAction(storedRefreshToken).then(result => {
             console.log(result);
         })
             .catch(error => {
                 console.error(error);
             });
    }
    console.log('stored access token:', storedAccessToken);
    return storedAccessToken;
}
