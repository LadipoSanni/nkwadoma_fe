import React from 'react';
import CustomAuthorization from "@/features/auth/authorization/index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER','COOPERATE_FINANCIER_SUPER_ADMIN','COOPERATE_FINANCIER_ADMIN']}>
            <div>

            </div>
        </CustomAuthorization>
    );
};

export default Page;