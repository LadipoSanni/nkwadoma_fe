import React from 'react'
import TabSwitch from "@/layout/tabLayout";
import { settingsTab } from '@/types/tabDataTypes';
import CustomAuthorization from "@/features/auth/authorization";
import styles from '@/components/loanee-my-profile/index.module.css'

type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
       {/*<div className={` ${styles.tab} `}>*/}
           <TabSwitch triggerStyle={styles.switchTabStyle} tabData={settingsTab} defaultTab="/settings/general" disabledTabs={["/settings/profile","/settings/roles-&-permissions"]}>
               {children}
           </TabSwitch>
       {/*</div>*/}
    </CustomAuthorization>
  )
}

export default layout