"use client"
import React from "react";
import TabSwitch from "@/layout/tabLayout";
import { fundTabData } from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";
import {useAppSelector} from "@/redux/store";

type props = {
    children: React.ReactNode;
}

const FundTabs: React.FC<props> = ({ children }) => {
   const vehicleType = useAppSelector(state => (state?.vehicle.vehicleType))

    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','PORTFOLIO_MANAGER_ASSOCIATE','MEEDL_SUPER_ADMIN']}>
            <TabSwitch tabData={fundTabData} defaultTab="/funds/details" backClickRoutePath={vehicleType === "commercial"? "/vehicle/commercial-vehicle" : "/vehicle/endowment-vehicle"} backClickName="investment vehicles" condition={true} style="lg:px-8">
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FundTabs;