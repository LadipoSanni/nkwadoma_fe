import React from 'react'
import OrganizationDetailLayout from '@/layout/organization-detail-layout'
import CustomAuthorization from "@/features/auth/authorization";

type props = {
    children: React.ReactNode;
}

const organizationDetailTab: React.FC<props> = ({ children }) => {
  return (
    <div>
      <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN','MEEDL_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE']}>
      <OrganizationDetailLayout>
   {children}
    </OrganizationDetailLayout>
      </CustomAuthorization>
  </div>
  )
}

export default organizationDetailTab
