import React from 'react';
import DisbursedLoanDetails from "../../../../features/portfolio-manager/disbursed-loan-details";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_ADMIN','MEEDL_SUPER_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE']}>
            <DisbursedLoanDetails/>
        </CustomAuthorization>
    );
};

export default Page;