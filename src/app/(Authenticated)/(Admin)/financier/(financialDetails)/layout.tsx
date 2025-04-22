import React from "react";
import TabSwitch from "@/layout/tabLayout";
import {financialTabData} from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}

const FinancialTabs: React.FC<props> = ({ children }) => {

    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <TabSwitch tabData={financialTabData} defaultTab="/financier/details" backClickRoutePath="/financier" backClickName="financiers"  condition={true}>
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FinancialTabs;