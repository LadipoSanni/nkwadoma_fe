import React from 'react'
import TabSwitch from '@/layout/tabLayoutTwo';
import CustomAuthorization from "@/features/auth/authorization";
import { organizationDetailTab } from '@/types/tabDataTypes';

type props = {
    children: React.ReactNode;
}

function layout({children}:props) {
  return (
    <div>
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
      <TabSwitch tabData={organizationDetailTab} defaultTab='/organizations/organizations-details/details' >
      {children}
      </TabSwitch>
        </CustomAuthorization>
    </div>
  )
}

export default layout
