import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import ProgramCohortDetails from "@/features/program/details/cohort/Index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN']}>
            <ProgramCohortDetails/>
        </CustomAuthorization>
    );
};

export default Page;