import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { loanProductTab } from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}

// const disableTab= ["/loan-product/loan-product-loanees"];

const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            {/*<TabSwitch tabData={loanProductTab} defaultTab="/loan-product/loan-product-details" backClickRoutePath="/loan-product" backClickName="loan product" condition={true} disabledTabs={disableTab}>*/}
            <TabSwitch tabData={loanProductTab} defaultTab="/loan-product/loan-product-details" backClickRoutePath="/loan-product" backClickName="loan product" >
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FundTabs;