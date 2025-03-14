import React from 'react'
import TabSwitch from "@/layout/tabLayout";
import { settingsTab } from '@/types/tabDataTypes';
import CustomAuthorization from "@/features/auth/authorization";


type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
        <TabSwitch tabData={settingsTab} defaultTab="/settings/team" disabledTabs={["/settings/profile","/settings/roles-&-permissions"]}>
            {children}
        </TabSwitch>
    </CustomAuthorization>
  )
}

export default layout