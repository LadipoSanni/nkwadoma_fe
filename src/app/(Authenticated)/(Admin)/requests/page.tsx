import React from 'react'
import ViewAllRequests from '@/components/super-admin/requests/View-all-requests'
import CustomAuthorization from "@/features/auth/authorization";

function page() {
  return (
    <div>
                <CustomAuthorization authorizedRoles={['MEEDL_SUPER_ADMIN']}>
      <ViewAllRequests/>
      </CustomAuthorization>
    </div>
  )
}

export default page