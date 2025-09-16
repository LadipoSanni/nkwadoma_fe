import React from 'react';
import MarketPlaceDetails from "@/features/market-place/details/Index";
import CustomAuthorization from '@/features/auth/authorization';

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <MarketPlaceDetails/>
        </CustomAuthorization>
    );
}

export default Page;