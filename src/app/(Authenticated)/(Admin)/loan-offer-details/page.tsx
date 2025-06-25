import React from 'react';
import LoanOfferDetails from "@/pages/admin/loanOfferDetails/Index";
import CustomAuthorization from "@/features/auth/authorization";

const page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <LoanOfferDetails/>
        </CustomAuthorization>
    );
};

export default page;