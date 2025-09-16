import React from 'react';
import ProgramDetails from "../../../../../../features/program/details/program-details/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <ProgramDetails/>
        </CustomAuthorization>
    );
};

export default Page;