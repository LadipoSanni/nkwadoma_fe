import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
           <div>Repayment</div>
        </CustomAuthorization>
    );
};

export default Page;