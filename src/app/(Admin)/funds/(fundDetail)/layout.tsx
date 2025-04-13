import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { fundTabData } from "@/types/tabDataTypes";

type props = {
    children: React.ReactNode;
}

const FundTabs: React.FC<props> = ({ children }) => {
   
    return (
        <div>
            <TabSwitch tabData={fundTabData} defaultTab="/funds/details" backClickRoutePath="/funds" backClickName="fund" condition={true}>
                {children}
            </TabSwitch>
        </div>
    );
}

export default FundTabs;