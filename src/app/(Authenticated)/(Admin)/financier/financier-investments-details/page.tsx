import React from 'react';
import CustomAuthorization from "@/features/auth/authorization";
import FinancierInvestmentVehiclesDetails from "@/features/financier/details/investment-vehicle/details/Index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER','ORGANIZATION_SUPER_ADMIN','ORGANIZATION_ASSOCIATE']}>
            <FinancierInvestmentVehiclesDetails/>
        </CustomAuthorization>

    );
};

export default Page;