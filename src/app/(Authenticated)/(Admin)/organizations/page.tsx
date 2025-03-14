import React from 'react';
import Organization from "@/features/portfolio-manager/organization/view-organization";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <Organization/>
        </CustomAuthorization>
    );
};

export default Page;