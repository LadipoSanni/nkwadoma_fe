import React from 'react';
import Details from "@/features/portfolio-manager/loan-product/details/detail/Index";
import CustomAuthorization from '@/features/auth/authorization';

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER',"MEEDL_SUPER_ADMIN","PORTFOLIO_MANAGER_ASSOCIATE"]}>
            <Details/>
        </CustomAuthorization>
    );
};

export default Page;