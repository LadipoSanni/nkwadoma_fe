import React from 'react'
import CohortView from '@/features/cohort/cohort-view'
import CustomAuthorization from "@/features/auth/authorization";

const page = () => {
  return (
    <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN']}>
          <CohortView/>
    </CustomAuthorization>
  )
}

export default page;