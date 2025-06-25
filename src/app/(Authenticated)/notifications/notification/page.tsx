import React from 'react'
import NotificationsEmptystate from '@/components/notification/Notifications-emptystate'
import CustomAuthorization from '@/features/auth/authorization';

function page() {
  return (
    <>
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','LOANEE','FINANCIER']}>
      <NotificationsEmptystate/>
      </CustomAuthorization>
    </>
  )
}

export default page
