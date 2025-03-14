import React from 'react'
import InvestmentVehicle from '@/features/portfolio-manager/fund'
import CustomAuthorization from "@/features/auth/authorization";


function page() {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
   <InvestmentVehicle />  
    </CustomAuthorization>
  )
}

export default page