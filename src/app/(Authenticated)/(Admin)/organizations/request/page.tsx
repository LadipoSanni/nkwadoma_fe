import React from 'react'
import ViewAllRequests from '@/components/super-admin/requests/View-all-requests-staff'
import CustomAuthorization from "@/features/auth/authorization";

function page() {
  return (
    <div>
        <CustomAuthorization authorizedRoles={['ORGANIZATION_SUPER_ADMIN']}>
      <ViewAllRequests/>
      </CustomAuthorization>
    </div>
  )
}

export default page
