import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import InvestmentVehicle from "@/features/financier/details/investment-vehicle/InvestmentVehicle";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','PORTFOLIO_MANAGER_ASSOCIATE','MEEDL_ADMIN','MEEDL_SUPER_ADMIN']}>
            <InvestmentVehicle/>
        </CustomAuthorization>

    );
};

export default Page;