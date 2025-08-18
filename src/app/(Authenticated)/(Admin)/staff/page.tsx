import React from 'react'
import All from '@/features/super-admin-and-admin/staff/View-all-staff'
import CustomAuthorization from "@/features/auth/authorization";

function page() {
  return (
    <div>
         <CustomAuthorization authorizedRoles={['MEEDL_SUPER_ADMIN','MEEDL_ADMIN']}>
      <All/>
      </CustomAuthorization>
    </div>
  )
}

export default page