import React from 'react';
import FinancierDetails from "@/pages/admin/financier-details";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <FinancierDetails/>
        </CustomAuthorization>

    );
};

export default Page;