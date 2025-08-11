import React from 'react'
import TabSwitch from '@/layout/tabLayoutTwo'
import { organizationDetailTabData } from '@/types/tabDataTypes'

type props = {
    children: React.ReactNode;
}

const organizationDetailTab: React.FC<props> = ({ children }) => {
  return (
    <div>
    <TabSwitch tabData={organizationDetailTabData} defaultTab='/organizations/detail'>
   {children}
    </TabSwitch>
  </div>
  )
}

export default organizationDetailTab
