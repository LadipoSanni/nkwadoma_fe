import React from 'react';
import MarketPlaceDetails from "@/features/market-place/details/Index";
import CustomAuthorization from '@/features/auth/authorization';

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            <MarketPlaceDetails/>
        </CustomAuthorization>
    );
}

export default Page;