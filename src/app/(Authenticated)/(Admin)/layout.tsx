import React from 'react';
import AdminLayout from "@/layout/admin-layout";
import CustomAuthorization from '@/features/auth/authorization';



type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {


    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN']}>
            <AdminLayout>
                {children}
            </AdminLayout>
        </CustomAuthorization>

    );
};


export default Layout;