import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import FinancierDetails from "@/features/financier/details/financier-details/Details";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <FinancierDetails/>
        </CustomAuthorization>

    );
};

export default Page;