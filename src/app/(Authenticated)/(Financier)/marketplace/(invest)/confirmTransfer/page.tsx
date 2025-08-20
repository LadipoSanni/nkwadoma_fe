import React from 'react';
import ConfirmTransfer from "@/features/market-place/Invest/confirm-transfer/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <ConfirmTransfer/>
        </CustomAuthorization>
    );
}

export default Page;