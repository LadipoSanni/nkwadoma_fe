// "use server"
import {
    setItemSessionStorage,
    getItemSessionStorage,
    setItemToLocalStorage,
    getItemFromLocalStorage
} from "@/utils/storage";


export  function storeUserDetails (access_token: string, user_email: string, user_role: string,  user_name: string, refresh_token: string ) {
    setItemSessionStorage("access_token", access_token)
    setItemSessionStorage("user_email", user_email)
    setItemSessionStorage("user_role", user_role)
    setItemSessionStorage("user_name",user_name )
    setItemSessionStorage("refresh_token",refresh_token)
}

export function setUserRoles (userRoles: string[]) {
    setItemToLocalStorage("userRoles", JSON.stringify(userRoles))
}
export function getUserRoleSS () {
    return getItemFromLocalStorage("userRoles")
}

export function getUserDetails () {
         const storedAccessToken = getItemSessionStorage("access_token")
         const storedUserEmail = getItemSessionStorage("user_email")
         const storedUserRole = getItemSessionStorage("user_role")
         const storedRefreshToken = getItemFromLocalStorage("refresh_token")

    return {
        storedRefreshToken,
        storedAccessToken,
        storedUserEmail,
        storedUserRole ,
    };
}