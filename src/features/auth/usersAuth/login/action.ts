// "use server"
import {setItemSessionStorage,getItemSessionStorage} from "@/utils/localStorage";







export  function storeUserDetails (access_token: string, user_email: string, user_role: string) {
    setItemSessionStorage("access_token", access_token)
    setItemSessionStorage("user_email", user_email)
    setItemSessionStorage("user_role", user_role)
}


export function getUserDetails () {
         const storedAccessToken = getItemSessionStorage("access_token")
         const storedUserEmail = getItemSessionStorage("user_email")
         const storedUserRole = getItemSessionStorage("user_role")

    return {
        storedAccessToken,
        storedUserEmail,
        storedUserRole ,
    };
}