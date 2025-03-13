'use client'
import React, {useEffect} from 'react';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {redirect} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {isTokenExpired} from "@/utils/GlobalMethods";
import {clearData} from "@/utils/storage";

interface AuthProps {
children: React.ReactNode;
}
const Index : React.FC<AuthProps> = ({children}) => {
    // const user_role = getUserDetailsFromStorage('user_role')
    const token = getUserDetailsFromStorage('access_token' )
    const refreshToken = getUserDetailsFromStorage('refresh_token' )

    const {toast} = useToast()
    const response = isTokenExpired(token ? token : '')
    const response2 = isTokenExpired(refreshToken ? refreshToken : '')
    useEffect(() => {
        checkUserToken(response, response2)
    }, [response, response2]);

    const checkUserToken = (isTokenExpired: boolean, isRefreshTokenExpired: boolean) => {
        if (isTokenExpired && isRefreshTokenExpired) {
            clearData()
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            redirect("/auth/login")
        }
    }



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