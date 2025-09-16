import React from 'react';
import Organization from "@/features/portfolio-manager/organization/view-organization";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','MEEDL_SUPER_ADMIN',
        'MEEDL_ADMIN', 'PORTFOLIO_MANAGER_ASSOCIATE']}>
            <Organization/>
        </CustomAuthorization>
    );
};

export default Page;