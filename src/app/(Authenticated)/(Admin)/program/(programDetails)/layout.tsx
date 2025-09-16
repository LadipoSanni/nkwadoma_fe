import React from "react";
import TabSwitch from "@/layout/tabLayout";
import {programDetailTab} from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}


const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <TabSwitch tabData={programDetailTab} defaultTab="/program/program-details" backClickRoutePath="/program" backClickName="programs" condition={true}>
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FundTabs;