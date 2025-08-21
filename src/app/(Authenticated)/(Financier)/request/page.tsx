import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";
import ViewAllFinancierRequests from '@/features/financier/financier-admins/Request';

function page() {
  return (
    <div>
        <CustomAuthorization authorizedRoles={['COOPERATE_FINANCIER_SUPER_ADMIN']}>
      <ViewAllFinancierRequests/>
      </CustomAuthorization>
    </div>
  )
}

export default page