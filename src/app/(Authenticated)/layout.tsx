import React from 'react';
import Authentication from "@/features/auth/Authentication";

interface Props {
    children: React.ReactNode;
}

const Layout : React.FC<Props> = ({children}) => {
    return (
        <div>
            <Authentication>
            {children}
            </Authentication>
        </div>
    );
};

export default Layout ;