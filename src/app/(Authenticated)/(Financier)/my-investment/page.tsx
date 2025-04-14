import React from 'react';
import MyInvestmentContent from "@/pages/financier/my-investment";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {

    return (
    <CustomAuthorization authorizedRoles={['FINANCIER']}>
        <MyInvestmentContent/>
    </CustomAuthorization>
    );
};

export default Page;