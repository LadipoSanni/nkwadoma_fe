import React from 'react';
import LoanDetails from "../../../../pages/admin/loan-request-details";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <LoanDetails/>
        </CustomAuthorization>
    );
};

export default Page;