import React from "react";
import TabSwitch from "@/layout/tabLayout";
import {programDetailTab} from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";
import ProgramLayout from "@/layout/program-details-layout";

type props = {
    children: React.ReactNode;
}


const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <ProgramLayout >
                {children}
            </ProgramLayout>
        </CustomAuthorization>
    );
}

export default FundTabs;