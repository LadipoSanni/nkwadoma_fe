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
        {role: ['PORTFOLIO_MANAGER', 'PORTFOLIO_MANAGER_ASSOCIATE', 'MEEDL_ADMIN','MEEDL_SUPER_ADMIN'], value: <PortfolioManager/>},
        {role: ['ORGANIZATION_ADMIN'], value: <OrgAdmin/>},
        {role: ['LOANEE'], value: <Loanee/>},
        {role: ['FINANCIER'], value: <Financier/>},
        {role: ['MEEDL_SUPER_ADMIN'], value: <MeedlSuperAdmin/>},
    ]


    const renderOverview = (userrole?: string) => {
        if (!userrole) return <></>;

        return overviews
            ?.filter(overview => overview?.role?.includes(userrole))
            .map((overview, index) => (
                <div key={index}>{overview?.value}</div>
            )) ?? <></>;
    };


    return (
        <div >
            {renderOverview(userRole)}
        </div>
    );
};

export default Index;