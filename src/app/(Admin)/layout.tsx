import React from 'react';
import AdminLayout from "@/layout/AdminLayout/AdminLayout";


type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>

    );
};


export default Layout;