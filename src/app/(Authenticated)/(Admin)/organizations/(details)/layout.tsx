import React from 'react'
import OrganizationDetailLayout from '@/layout/organization-detail-layout'

type props = {
    children: React.ReactNode;
}

const organizationDetailTab: React.FC<props> = ({ children }) => {
  return (
    <div>
    <OrganizationDetailLayout>
   {children}
    </OrganizationDetailLayout>
  </div>
  )
}

export default organizationDetailTab
