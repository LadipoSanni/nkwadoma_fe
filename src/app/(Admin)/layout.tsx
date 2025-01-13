import React from 'react';
import AdminLayout from "@/layout/admin-layout/index";
import CustomAuthorization from "@/utils/CustomAuthorization";


type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {





    return (
        <CustomAuthorization roles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN']}
        >
            <AdminLayout>
                {children}
            </AdminLayout>
        </CustomAuthorization>
    );
};


export default Layout;