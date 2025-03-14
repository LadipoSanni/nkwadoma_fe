import React from 'react';
import OrganizationDetails from "@/features/portfolio-manager/organization/organizationDetails/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <OrganizationDetails/>
        </CustomAuthorization>
    );
};

export default Page;