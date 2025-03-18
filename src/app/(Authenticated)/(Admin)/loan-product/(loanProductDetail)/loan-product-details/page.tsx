import React from 'react';
import Details from "@/features/portfolio-manager/loan-product/details/detail/Index";
import CustomAuthorization from '@/features/auth/authorization';

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <Details/>
        </CustomAuthorization>
    );
};

export default Page;