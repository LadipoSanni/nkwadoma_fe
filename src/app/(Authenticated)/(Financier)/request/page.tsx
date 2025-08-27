import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";
// import ViewAllFinancierRequests from '@/features/financier/financier-admins/Request';
import ViewAllRequests from '@/components/super-admin/requests/View-all-requests-staff'

function page() {
  return (
    <div>
        <CustomAuthorization authorizedRoles={['COOPERATE_FINANCIER_SUPER_ADMIN']}>
      <ViewAllRequests/>
      </CustomAuthorization>
    </div>
  )
}

export default page