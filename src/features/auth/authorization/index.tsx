'use client'
import React from 'react';
import { getUserRoleSS} from "@/features/auth/usersAuth/login/action";

interface Props {
    children: React.ReactNode;
    authorizedRoles?: string[];
}


const CustomAuthorization : React.FC<Props> = ({children, authorizedRoles}) => {


    const user_roles = getUserRoleSS()
    return authorizedRoles?.some((role) => user_roles?.includes(role)) ? (
        <>{children}</>
    ) : (
        // redirect('/auth/login')
        <div></div>
    );
};

export default CustomAuthorization;