import React from 'react';
import MarketplaceInvestmentLayout from "@/layout/multistep-layout/marketplace-investment-layout";
import CustomAuthorization from "@/features/auth/authorization";


type props = {
    children: React.ReactNode;
}
const InvestLayout: React.FC<props> = ({children}) => {

    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <MarketplaceInvestmentLayout>
                {children}
            </MarketplaceInvestmentLayout>
        </CustomAuthorization>

    );
}

export default InvestLayout;