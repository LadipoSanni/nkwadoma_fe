import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import Index from "@/features/Overview";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN', 'LOANEE', 'FINANCIER', 'MEEDL_SUPER_ADMIN']} >
            <Index/>
        </CustomAuthorization>

    );
};

export default Page;