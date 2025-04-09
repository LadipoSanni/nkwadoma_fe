import React from 'react';
import Financier from "@/features/Overview/financier";

const Index = () => {

    const overviews = [
        {role: 'PORTFOLIO_MANAGER', value: <Financier/>},
        {role: 'ORGANIZATION_ADMIN', value: <Financier/>},
        {role: 'LOANEE', value: <Financier/>},
        {role: 'FINANCIER', value: <Financier/>},
    ]

    const renderOverview = (userRole: string) => {

    }

    return (
        <div>
            
        </div>
    );
};

export default Index;