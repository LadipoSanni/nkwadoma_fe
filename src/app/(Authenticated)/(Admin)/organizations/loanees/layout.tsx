import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";
import OrganizationLoaneeLayout from '@/layout/organization-loanee-layout';


type props = {
    children: React.ReactNode;
}

const layout: React.FC<props> = ({ children }) => {
  return (
    <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN',"MEEDL_ADMIN"]} >
      <OrganizationLoaneeLayout tab="loanBook">
        {children}
      </OrganizationLoaneeLayout>
    </CustomAuthorization>
  )
}

export default layout