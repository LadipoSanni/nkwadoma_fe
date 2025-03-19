import React from 'react';
import Authentication from "@/features/auth/Authentication";
import MeedlLayout from '@/layout/meedl-layout';

interface Props {
    children: React.ReactNode;
}

const Layout : React.FC<Props> = ({children}) => {
    return (
        <Authentication>
            <MeedlLayout>
               {children}
            </MeedlLayout>
        </Authentication>
    );
};

export default Layout ;