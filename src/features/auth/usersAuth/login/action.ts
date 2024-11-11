"use server"
import {setItemSessionStorage} from "../../../../utils/storage";







export async function storeUserDetails (access_token: string, user_email: string, user_role: string) {
    // const response = await Login({email, password})
    // if (response?.error){
    //     const error : "error"| "success" | undefined ="error"
    //     const responses = {
    //         status :  error,
    //         message: response?.error?.data?.message,
    //     }
    //     return responses;
    // }
    // const access_token = response?.data?.data?.access_token
    // const decode_access_token = jwtDecode(access_token)
    // const user_email = decode_access_token?.email
    // const user_role = decode_access_token?.realm_access?.roles[0]
    setItemSessionStorage("access_token", access_token)
    setItemSessionStorage("user_email", user_email)
    setItemSessionStorage("user_role", user_role)
    // const success : "error"| "success" | undefined ="success"

    // const responses = {
    //     status: success,
    //     message: "logged in  successfully"
    // }
    //
    // return responses;


}