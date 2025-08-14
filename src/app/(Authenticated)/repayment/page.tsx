import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import Repayment from "@/features/repayment/Repayment";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN', 'MEEDL_ASSOCIATE', 'MEEDL_ADMIN']}>
           <Repayment/>
        </CustomAuthorization>
    );
};

export default Page;