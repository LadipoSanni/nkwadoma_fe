import React from 'react';
import ViewAllLoaneeOverview from "@/features/admin-loanee-view/view-all-loanee-overview";
import CustomAuthorization from '@/features/auth/authorization';

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'MEEDL_SUPER_ADMIN']} >
            <ViewAllLoaneeOverview/>
        </CustomAuthorization>
    );
};

export default Page;