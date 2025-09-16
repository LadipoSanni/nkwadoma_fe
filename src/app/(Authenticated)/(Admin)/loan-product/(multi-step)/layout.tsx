import React from 'react'
import CustomAuthorization from '@/features/auth/authorization';
import CreateLoanProductStep from '@/layout/multistep-layout/Create-loanProduct_step';


type props = {
    children: React.ReactNode;
}

const MultistepInvestmentVehicleLayout: React.FC<props> =({children}) => {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','PORTFOLIO_MANAGER_ASSOCIATE','MEEDL_SUPER_ADMIN']}>
      <CreateLoanProductStep>
        {children}
      </CreateLoanProductStep>
    </CustomAuthorization>
  )
}

export default MultistepInvestmentVehicleLayout