import React from 'react'
import TabSwitch from '@/layout/tabLayoutTwo'
import CustomAuthorization from "@/features/auth/authorization";
import { requestTab } from '@/types/tabDataTypes';

interface props {
    children: React.ReactNode;
}

function RequestLayout({children}:props) {
  return (
    <div>
      <CustomAuthorization authorizedRoles={['MEEDL_SUPER_ADMIN','MEEDL_ADMIN','ORGANIZATION_SUPER_ADMIN','COOPERATE_FINANCIER_SUPER_ADMIN']}>
        <TabSwitch tabData={requestTab} defaultTab='/requests/staff'>
        {children}
        </TabSwitch>
      </CustomAuthorization>
    </div>
  )
}

export default RequestLayout
