import React from 'react';
import SelectedLoan from "@/components/selected-loan/SelectedLoan";
import CustomAuthorization from "@/features/auth/authorization";



export default function Layout  ({children}: Readonly<{
    children: React.ReactNode;
}>)  {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'MEEDL_ASSOCIATE', 'MEEDL_SUPER_ADMIN',
        'MEEDL_ADMIN']}>
            <SelectedLoan>
                {children}
           </SelectedLoan>
        </CustomAuthorization>
    );
};

