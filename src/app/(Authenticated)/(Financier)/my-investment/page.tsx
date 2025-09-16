import React from 'react';
import MyInvestmentContent from "@/pages/financier/my-investment";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {

    return (
    <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
        <MyInvestmentContent/>
    </CustomAuthorization>
    );
};

export default Page;