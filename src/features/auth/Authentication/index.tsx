import React from 'react';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {redirect} from "next/navigation";

interface AuthProps {
children: React.ReactNode;
}
const Index : React.FC<AuthProps> = ({children}) => {
    // const user_role = getUserDetailsFromStorage('user_role')
    const token = getUserDetailsFromStorage('access_token' )



    // useEffect(() => {
    //     if (!user_role) {
    //         redirect("/auth/login")
    //     }
    //     // else {
    //     //     setRole(user_role)
    //     // }
    // }, [user_role]);

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