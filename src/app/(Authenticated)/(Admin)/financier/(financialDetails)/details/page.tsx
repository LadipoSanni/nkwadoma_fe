import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import FinancierDetails from "@/features/financier/details/financier-details/Details";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','PORTFOLIO_MANAGER_ASSOCIATE','MEEDL_ADMIN','MEEDL_SUPER_ADMIN']}>
            <FinancierDetails/>
        </CustomAuthorization>

    );
};

export default Page;