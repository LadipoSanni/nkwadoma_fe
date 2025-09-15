import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";
import BackToInvestmentVehicleDetail from '@/components/portfolio-manager/fund/investmentVehicle-multistep/Back-to-investmentVehicleDetail';

type props = {
    children: React.ReactNode;
}


const layout: React.FC<props> = ({ children }) => {

   
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN']}>
         <BackToInvestmentVehicleDetail/>
      { children }
    </CustomAuthorization>
  )
}

export default layout
