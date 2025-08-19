import React from 'react'
import Details from '@/features/portfolio-manager/organization/meedleBackoffice-org-details/Details'
import CustomAuthorization from "@/features/auth/authorization";

function page() {
  return (
    <div>
      <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN','MEEDL_ADMIN']}>
      <Details/>
      </CustomAuthorization>
    </div>
  )
}

export default page
