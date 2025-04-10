import React from 'react';
import Financier from "@/features/Overview/financier";
import OrgAdmin from "@/features/Overview/org-admin";
import Loanee from "@/features/Overview/loanee";
import PortfolioManager from "@/features/Overview/portfolio-manager";
import {getUserDetailsFromStorage} from "@/components/topBar/action";

const Index = () => {

    const userRole = getUserDetailsFromStorage('user_role') ? getUserDetailsFromStorage('user_role')  : "user role";

    const overviews = [
        {role: 'PORTFOLIO_MANAGER', value: <PortfolioManager/>},
        {role: 'ORGANIZATION_ADMIN', value: <OrgAdmin/>},
        {role: 'LOANEE', value: <Loanee/>},
        {role: 'FINANCIER', value: <Financier/>},
    ]



    const renderOverview = (userRole?: string) => {
        // const  userOverview  = overviews.forEach((overview) => {overview.role = userRole
        // return overview;})
        console.log('Overview render overview: ', userRole);
    }

    // overviews.forEach(myFunction);

    // function myFunction(item) {
    //     sum += item;
    // }

    console.log('renderOverview: ',renderOverview(userRole))

    return (
        <div >
            <Financier/>
        </div>
    );
};

export default Index;