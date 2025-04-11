import React from 'react';
import CustomAuthorization from "@/features/auth/authorization/index";

const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['FINANCIER']}>
            <div>

            </div>
        </CustomAuthorization>
    );
};

export default Page;