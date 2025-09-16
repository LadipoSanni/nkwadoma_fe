import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import {ROLES} from "@/types/roles";


type Props = {
    children: React.ReactNode;
}
const Layout = ({children}:Props) => {
    return (
        <CustomAuthorization authorizedRoles={ROLES}>
            {children}
        </CustomAuthorization>
    );
};

export default Layout;