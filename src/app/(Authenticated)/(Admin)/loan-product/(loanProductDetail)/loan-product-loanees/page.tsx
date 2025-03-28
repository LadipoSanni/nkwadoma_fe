import React from 'react'
import CustomAuthorization from '@/features/auth/authorization';
import {Loanees} from "@/features/portfolio-manager/loan-product/details/loanee/Index";

function page() {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER']}>
            <Loanees/>
        </CustomAuthorization>
    )
}

export default page

