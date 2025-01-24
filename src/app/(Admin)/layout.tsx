import React from 'react';
import AdminLayout from "@/layout/admin-layout/index";


type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {





    return (
        // <CustomAuthorization roles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN']}
        // >
            <AdminLayout>
                {children}
            </AdminLayout>
        // </CustomAuthorization>
    );
};


export default Layout;