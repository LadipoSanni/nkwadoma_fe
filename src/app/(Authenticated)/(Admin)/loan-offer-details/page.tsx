import React from 'react';
import LoanOfferDetails from "@/pages/admin/loanOfferDetails/Index";
import CustomAuthorization from "@/features/auth/authorization";
import {MEEDL_ADMINS_ROLES} from "@/types/roles";

const page = () => {
    return (
        <CustomAuthorization authorizedRoles={MEEDL_ADMINS_ROLES}>
            <LoanOfferDetails/>
        </CustomAuthorization>
    );
};

export default page;