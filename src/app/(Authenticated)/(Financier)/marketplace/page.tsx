import React from 'react';
import MarketPlaceView from "@/features/market-place/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <MarketPlaceView/>
        </CustomAuthorization>
    );
}

export default Page;