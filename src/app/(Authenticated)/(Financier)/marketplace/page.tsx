import React from 'react';
import MarketPlaceView from "@/features/market-place/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            <MarketPlaceView/>
        </CustomAuthorization>
    );
}

export default Page;