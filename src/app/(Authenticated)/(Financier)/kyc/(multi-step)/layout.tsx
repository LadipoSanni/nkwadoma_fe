import React from 'react'
import KycStepLayout from '@/layout/kycStepLayout/Index'
import CustomAuthorization from '@/features/auth/authorization';


type props = {
    children: React.ReactNode;
}

const MultistepInvestmentVehicleLayout: React.FC<props> =({children}) => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <KycStepLayout>
                {children}
            </KycStepLayout>
        </CustomAuthorization>
    )
}

export default MultistepInvestmentVehicleLayout
