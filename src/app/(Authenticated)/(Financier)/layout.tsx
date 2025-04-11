import React from 'react';
import CustomAuthorization from '@/features/auth/authorization';



type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {


    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            {children}
        </CustomAuthorization>

    );
};


export default Layout;