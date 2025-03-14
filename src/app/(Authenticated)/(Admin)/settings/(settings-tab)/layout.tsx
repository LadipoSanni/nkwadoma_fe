import React from 'react'
import TabSwitch from "@/layout/tabLayout";
import { settingsTab } from '@/types/tabDataTypes';


type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
  return (
    <div>
        <TabSwitch tabData={settingsTab} defaultTab="/settings/team" disabledTabs={["/settings/profile","/settings/roles-&-permissions"]}>
            {children}
        </TabSwitch>
    </div>
  )
}

export default layout