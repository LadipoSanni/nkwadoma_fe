import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { fundTabData } from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}

const FundTabs: React.FC<props> = ({ children }) => {
   
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <TabSwitch tabData={fundTabData} defaultTab="/funds/details" backClickRoutePath="/vehicle" backClickName="fund" condition={true}>
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FundTabs;