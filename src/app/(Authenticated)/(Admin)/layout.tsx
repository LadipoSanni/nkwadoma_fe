import React from 'react';
// import MeedlLayout from "../../../layout/meedl-layout";
import CustomAuthorization from '@/features/auth/authorization';



type props = {
    children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {


    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','MEEDL_SUPER_ADMIN',
            'MEEDL_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            {/*<MeedlLayout>*/}
                {children}
            {/*</MeedlLayout>*/}
        </CustomAuthorization>

    );
};


export default Layout;