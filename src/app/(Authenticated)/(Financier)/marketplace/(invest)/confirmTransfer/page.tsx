import React from 'react';
import ConfirmTransfer from "@/features/market-place/Invest/confirm-transfer/Index";
import CustomAuthorization from "@/features/auth/authorization";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            <ConfirmTransfer/>
        </CustomAuthorization>
    );
}

export default Page;