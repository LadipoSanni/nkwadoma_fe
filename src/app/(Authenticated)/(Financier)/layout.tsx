import React from 'react';
import CustomAuthorization from '@/features/auth/authorization';



type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {


    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            {children}
        </CustomAuthorization>

    );
};


export default Layout;