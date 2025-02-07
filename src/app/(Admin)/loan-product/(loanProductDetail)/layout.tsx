import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { loanProductTab } from "@/types/tabDataTypes";

type props = {
    children: React.ReactNode;
}

const disableTab= ["/loan-product/loan-product-loanees"];

const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <div>
            <TabSwitch tabData={loanProductTab} defaultTab="/loan-product/loan-product-details" backClickRoutePath="/loan-product" backClickName="loan product" condition={true} disabledTabs={disableTab}>
                {children}
            </TabSwitch>
        </div>
    );
}

export default FundTabs;