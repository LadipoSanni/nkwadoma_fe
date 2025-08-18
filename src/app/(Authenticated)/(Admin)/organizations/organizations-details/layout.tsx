import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";
import OrganizationBackOfficeDetailLayout from '@/layout/organizationBackoffice-layout';

type props = {
    children: React.ReactNode;
}

function layout({children}:props) {
  return (
    <div>
        <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
      <OrganizationBackOfficeDetailLayout >
      {children}
      </OrganizationBackOfficeDetailLayout>
        </CustomAuthorization>
    </div>
  )
}

export default layout
