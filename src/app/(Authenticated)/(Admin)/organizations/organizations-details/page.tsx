import React from 'react'
import ViewOrganizationDetail from '@/features/portfolio-manager/organization/view-organization-detail.tsx'
import CustomAuthorization from "@/features/auth/authorization";

const page = () => {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN']}>
        <ViewOrganizationDetail />
    </CustomAuthorization>
  )
}

export default page