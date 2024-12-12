import React from 'react';
import AdminLayout from "@/layout/admin-layout/index";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {isTokenValid, isUserAdmin} from "@/utils/GlobalMethods";
import {redirect} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {clearData} from "@/utils/storage";


type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {

    const cookie = getUserDetailsFromStorage('access_token')
    const role = getUserDetailsFromStorage('user_role')
    const {toast} = useToast()
    if(cookie){
       const response =  isTokenValid(cookie)
        if (!response){
            clearData()
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            redirect("/auth/login")
        }
    }
    if (role){
        if(!isUserAdmin(role)){
            toast({
                description: "You don't have the permission to perform this action," +
                    "please login",
                status: "error",
            });
            redirect("/auth/login")
        }

    }



    return (
        <AdminLayout>
            {children}
        </AdminLayout>

    );
};


export default Layout;