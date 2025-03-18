import React from 'react';
import LoaneeOverview from "@/pages/loanee/overview/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['LOANEE']}>
            <LoaneeOverview />
        </CustomAuthorization>
    );
};

export default Page;