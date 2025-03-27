import React from 'react'
import MultistepLayout from '@/components/portfolio-manager/fund/investmentVehicle-multistep/Multistep-layout'
import CustomAuthorization from '@/features/auth/authorization';


type props = {
    children: React.ReactNode;
}

const MultistepInvestmentVehicleLayout: React.FC<props> =({children}) => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <MultistepLayout>
                {children}
            </MultistepLayout>
        </CustomAuthorization>
    )
}

export default MultistepInvestmentVehicleLayout
