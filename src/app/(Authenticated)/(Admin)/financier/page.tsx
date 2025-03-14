import React from 'react';
import ViewFinanciers from "@/features/financier/viewFinanciers/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <ViewFinanciers/>
        </CustomAuthorization>

    );
};

export default Page;