import React from 'react';
import MarketplaceInvestmentLayout from "@/layout/multistep-layout/marketplace-investment-layout";


type props = {
    children: React.ReactNode;
}
const InvestLayout: React.FC<props> = ({children}) => {

    return (
        <MarketplaceInvestmentLayout>
            {children}
        </MarketplaceInvestmentLayout>
    );
}

export default InvestLayout;