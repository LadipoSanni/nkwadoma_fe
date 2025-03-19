import React from 'react';
// import MeedlLayout from "../../../layout/meedl-layout";
import CustomAuthorization from '@/features/auth/authorization';



type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {


    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN']}>
            {/*<MeedlLayout>*/}
                {children}
            {/*</MeedlLayout>*/}
        </CustomAuthorization>

    );
};


export default Layout;