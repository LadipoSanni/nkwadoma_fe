import React from 'react';
import MyInvestmentDetails from "@/pages/admin/my-investment-details";
import CustomAuthorization from "@/features/auth/authorization/index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>

            <MyInvestmentDetails/>
        </CustomAuthorization>
    );
};

export default Page;