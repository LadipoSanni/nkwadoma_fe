'use client'
import React from 'react';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import { redirect } from 'next/navigation';
// import {getUserDetailsFromStorage} from "@/components/topBar/action";
// import {redirect} from "next/navigation";
// import {useToast} from "@/hooks/use-toast";
// import {isTokenExpired} from "@/utils/GlobalMethods";
// import {clearData} from "@/utils/storage";
// import {persistor} from "@/redux/store";
// import {useLogoutMutation} from "@/service/users/api";

interface AuthProps {
children: React.ReactNode;
}
const Index : React.FC<AuthProps> = ({children}) => {
    // const user_role = getUserDetailsFromStorage('user_role')
    const token = getUserDetailsFromStorage('access_token' )
    // const refreshToken = getUserDetailsFromStorage('refresh_token' )
    // const [logout] = useLogoutMutation()

    // console.log('token',token)
    // console.log('refresh_token',refreshToken)
    // const {toast} = useToast()
    // const response = isTokenExpired(token ? token : '')
    // const response2 = isTokenExpired(refreshToken ? refreshToken : '')
    // console.log('response',response)
    // console.log('response2',response2)
    // useEffect(() => {
    //     checkUserToken(response)
    // }, [response, response2,token,refreshToken]);

    // const checkUserToken = (isTokenExpired: boolean) => {
    //     if (isTokenExpired ) {
    //         logout({})
    //         toast({
    //             description: "Session expired. Please login again",
    //             status: "error",
    //         });
    //         clearData()
    //         persistor.purge();
    //         redirect("/auth/login")
    //     }
    // }



    return token ? (
        <div>
            {children}
        </div>
    ):
        (
            redirect('/auth/login')
        );
};

export default Index;