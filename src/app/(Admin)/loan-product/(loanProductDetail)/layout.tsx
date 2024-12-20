import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { loanProductTab } from "@/types/tabDataTypes";

type props = {
    children: React.ReactNode;
}

const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <div>
            <TabSwitch tabData={loanProductTab} defaultTab="/loan-product/loan-product-details" backClickRoutePath="/loan-product" backClickName="loan product" condition={true}>
                {children}
            </TabSwitch>
        </div>
    );
}

export default FundTabs;