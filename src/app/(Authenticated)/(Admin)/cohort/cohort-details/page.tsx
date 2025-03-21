import React from 'react';
import CohortDetails from "@/features/cohort/cohort-details/details/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN']}>
            <CohortDetails/>
        </CustomAuthorization>
    );
};

export default Page;