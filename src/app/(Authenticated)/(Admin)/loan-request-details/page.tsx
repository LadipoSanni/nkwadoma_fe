import React from 'react';
import LoanDetails from "../../../../pages/admin/loan-request-details";
import CustomAuthorization from "@/features/auth/authorization";
import {MEEDL_ADMINS_ROLES} from "@/types/roles";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={MEEDL_ADMINS_ROLES}>
            <LoanDetails/>
        </CustomAuthorization>
    );
};

export default Page;