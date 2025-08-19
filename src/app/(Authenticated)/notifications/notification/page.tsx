import React from 'react'
import NotificationsEmptystate from '@/components/notification/Notifications-emptystate'
import CustomAuthorization from '@/features/auth/authorization';

function page() {
  return (
    <>
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'ORGANIZATION_ADMIN','LOANEE','FINANCIER','MEEDL_SUPER_ADMIN','ORGANIZATION_SUPER_ADMIN','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
      <NotificationsEmptystate/>
      </CustomAuthorization>
    </>
  )
}

export default page
