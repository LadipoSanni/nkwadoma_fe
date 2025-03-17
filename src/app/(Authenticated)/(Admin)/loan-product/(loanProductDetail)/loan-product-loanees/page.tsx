import React from 'react'
import Loanees from "@/features/portfolio-manager/loan-product/details/loanee/Index";
import CustomAuthorization from '@/features/auth/authorization';

function page() {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <Loanees/>
        </CustomAuthorization>
    )
}

export default page

