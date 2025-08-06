import React from 'react'
import TabSwitch from "@/layout/tabLayout";
import { staffTabData } from "@/types/tabDataTypes";
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
    return (
      <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
        <TabSwitch tabData={staffTabData} defaultTab='/staff/all'>
        {children}
        </TabSwitch>
      </CustomAuthorization>
    )
}


export default layout