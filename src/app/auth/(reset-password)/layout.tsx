import React from 'react';
import Index from "@/layout/authLayout";

type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
    return (
        <Index>
            {children}
        </Index>
    )
};

export default Layout;