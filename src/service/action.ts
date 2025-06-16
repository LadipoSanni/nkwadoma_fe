import {getUserDetails} from "@/features/auth/usersAuth/login/action";
import {setItemSessionStorage} from "@/utils/storage";
import {isTokenExpired} from "@/utils/GlobalMethods";

const {storedRefreshToken} = getUserDetails();
const { storedAccessToken } = getUserDetails();

export async function refreshTokenAction () {

    const url = `https://api-systest.meedl.africa/api/v1/auth/refresh-token`;

    try{
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({refreshToken: storedRefreshToken}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await response.json();
        setItemSessionStorage("access_token", json?.data?.access_token);
        setItemSessionStorage("refresh_token",json?.data?.refresh_token)
    }catch (error){
        console.log('error', error)
    }

}

export  function getToken () {
    if (isTokenExpired(storedAccessToken)) {
         refreshTokenAction()
    }
    return storedAccessToken;
}
