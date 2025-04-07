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
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <TabSwitch tabData={fundTabData} defaultTab="/funds/details" backClickRoutePath={vehicleType === "commercial"? "/vehicle/commercial-vehicle" : "/vehicle/endownment-vehicle"} backClickName="fund" condition={true}>
                {children}
            </TabSwitch>
        </CustomAuthorization>
    );
}

export default FundTabs;