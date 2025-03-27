import React from 'react'
import InvestmentVehicleMultiStep from '@/features/portfolio-manager/fund/InvestmentVehicle-multistep/setup-fund'
import CustomAuthorization from '@/features/auth/authorization';

function page() {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
      <InvestmentVehicleMultiStep/>
    </CustomAuthorization>
  )
}

export default page
