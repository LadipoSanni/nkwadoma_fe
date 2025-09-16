'use client'
import React from 'react';
import Financier from "@/features/Overview/financier";
import OrgAdmin from "@/features/Overview/org-admin";
import Loanee from "@/features/Overview/loanee";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import Overview from './backOfficeAdmins/index'

const Index = () => {

    const userRole = getUserDetailsFromStorage('user_role') ? getUserDetailsFromStorage('user_role')  : "user role";

    const overviews = [
        {role: ['PORTFOLIO_MANAGER', 'PORTFOLIO_MANAGER_ASSOCIATE', 'MEEDL_ADMIN','MEEDL_SUPER_ADMIN'], value: <Overview/>},
        {role: ['ORGANIZATION_ADMIN'], value: <OrgAdmin/>},
        {role: ['LOANEE'], value: <Loanee/>},
        {role: ['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN'], value: <Financier/>},
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