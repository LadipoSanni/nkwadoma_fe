import React from 'react';
import MarketplaceInvestmentLayout from "@/layout/multistep-layout/marketplace-investment-layout";
import CustomAuthorization from "@/features/auth/authorization";


type props = {
    children: React.ReactNode;
}
const InvestLayout: React.FC<props> = ({children}) => {

    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            <MarketplaceInvestmentLayout>
                {children}
            </MarketplaceInvestmentLayout>
        </CustomAuthorization>

    );
}

export default InvestLayout;