'use client'
import React from 'react';
import Financier from "@/features/Overview/financier";
import OrgAdmin from "@/features/Overview/org-admin";
import Loanee from "@/features/Overview/loanee";
import PortfolioManager from "@/features/Overview/PortfolioMnanager/portfolio-manager";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import MeedlSuperAdmin from './MeedlSuperAdmin'


const Index = () => {

    const userRole = getUserDetailsFromStorage('user_role') ? getUserDetailsFromStorage('user_role')  : "user role";

    const overviews = [
        {role: 'PORTFOLIO_MANAGER', value: <PortfolioManager/>},
        {role: 'ORGANIZATION_ADMIN', value: <OrgAdmin/>},
        {role: 'LOANEE', value: <Loanee/>},
        {role: 'FINANCIER', value: <Financier/>},
        {role: 'MEEDL_SUPER_ADMIN', value: <MeedlSuperAdmin/>},
    ]



    const renderOverview = (userrole?: string) => {
        for (let i = 0; i < overviews.length; i++) {
            if (overviews.at(i)?.role === userrole) {
                if (overviews.at(i)?.value) {
                    return overviews.at(i)?.value
                }
            }
        }
    }


    return (
        <div >
            {renderOverview(userRole)}
        </div>
    );
};

export default Index;