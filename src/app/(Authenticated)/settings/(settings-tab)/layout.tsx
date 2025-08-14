'use client'
import React from 'react'
import TabSwitch from "@/layout/tabLayout";
import styles from '@/components/loanee-my-profile/index.module.css'
import {getUserSettingTabContent} from "@/utils/sideBarItems";
import {getItemSessionStorage} from "@/utils/storage";

type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
    const userRole = getItemSessionStorage('user_role');
    const display = getUserSettingTabContent(userRole ? userRole : '')
  return (

           <TabSwitch triggerStyle={styles.switchTabStyle} tabData={display} defaultTab="/settings/general" disabledTabs={["/settings/profile","/settings/roles-&-permissions"]}>
               {children}
           </TabSwitch>

  )
}

export default layout