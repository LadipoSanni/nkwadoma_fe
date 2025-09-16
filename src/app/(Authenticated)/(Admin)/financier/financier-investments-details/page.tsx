import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import FinancierInvestmentVehiclesDetails from "@/features/financier/details/investment-vehicle/details/Index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE','MEEDL_ADMIN']}>
            <FinancierInvestmentVehiclesDetails/>
        </CustomAuthorization>

    );
};

export default Page;