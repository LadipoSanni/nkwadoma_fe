'use client'
import React from 'react';
import {getUserDetails, getUserRoleSS} from "@/features/auth/usersAuth/login/action";
import {getItemSessionStorage} from "@/utils/storage";

interface Props {
    children: React.ReactNode;
    authorizedRoles?: string[];
}


const CustomAuthorization : React.FC<Props> = ({children, authorizedRoles}) => {


    const user_roles = getUserRoleSS()
    const {storedUserRole} = getUserDetails()
    const ll = getItemSessionStorage("userRoles");
    console.log('ll: ', ll,'authorizedRoles: ', authorizedRoles, 'user stored roles: ', user_roles, 'storedUserRole: ', storedUserRole)
    return authorizedRoles?.some((role) => user_roles?.includes(role)) ? (
        <>{children}</>
    ) : (
        // redirect('/auth/login')
        <div></div>
    );
};

export default CustomAuthorization;