"use client"
import React from 'react';
import Transfer from "@/features/market-place/Invest/transfer/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <Transfer/>
        </CustomAuthorization>
    );
}

export default Page;