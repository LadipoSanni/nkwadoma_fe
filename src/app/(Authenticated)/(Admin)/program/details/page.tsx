import React from 'react';
import ProgramDetails from "@/features/program/program-details/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN']}>
            <ProgramDetails/>
        </CustomAuthorization>
    );
};

export default Page;