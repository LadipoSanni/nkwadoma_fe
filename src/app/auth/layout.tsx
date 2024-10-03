import React from 'react';
import AuthLayout from "@/layout/authLayout/authLayout";

type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
};

export default Layout;