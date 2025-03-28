import React from 'react'
import KycStepLayout from '@/layout/kycStepLayout/Index'
import CustomAuthorization from '@/features/auth/authorization';


type props = {
    children: React.ReactNode;
}

const MultistepInvestmentVehicleLayout: React.FC<props> =({children}) => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <KycStepLayout>
                {children}
            </KycStepLayout>
        </CustomAuthorization>
    )
}

export default MultistepInvestmentVehicleLayout
