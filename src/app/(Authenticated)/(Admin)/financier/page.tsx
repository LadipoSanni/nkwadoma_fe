import React from 'react';
import ViewFinanciers from "@/features/financier/viewFinanciers/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','PORTFOLIO_MANAGER_ASSOCIATE', 'MEEDL_ADMIN', 'MEEDL_SUPER_ADMIN']}>
            <ViewFinanciers/>
        </CustomAuthorization>

    );
};

export default Page;