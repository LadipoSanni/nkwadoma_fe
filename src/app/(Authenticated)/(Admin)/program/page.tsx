import React from 'react';
import ProgramView from '@/features/program/program-view'
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <ProgramView />
        </CustomAuthorization>
    );
};

export default Page;