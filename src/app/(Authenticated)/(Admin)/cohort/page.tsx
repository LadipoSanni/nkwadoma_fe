import React from 'react'
import CohortView from '@/features/cohort/cohort-view'
import CustomAuthorization from "@/features/auth/authorization";

const page = () => {
  return (
    <CustomAuthorization authorizedRoles={['ORGANIZATION_ADMIN','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
          <CohortView/>
    </CustomAuthorization>
  )
}

export default page;