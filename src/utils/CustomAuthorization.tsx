import React from 'react';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
interface IProps {
    roles: string[] ;
    children?: React.ReactNode;
}
const CustomAuthorization = ({roles,children}: IProps) => {
    const user_roles = getUserDetailsFromStorage('user_roles')
    console.log('roles got here: ', user_roles)
    return roles?.some((role) => user_roles?.includes(role)) ? (
        <>{children}</>
    ) : (
        // redirect('/auth/login')
        <div></div>
    );

};

export default CustomAuthorization;