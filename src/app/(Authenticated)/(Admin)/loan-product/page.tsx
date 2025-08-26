import LoanProductPage from '@/features/portfolio-manager/loan-product/loan-product-view'
import React from 'react'
import CustomAuthorization from "@/features/auth/authorization";

function page() {
    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER', 'MEEDL_ADMIN', 'MEEDL_SUPER_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE']}>
            <LoanProductPage/>
        </CustomAuthorization>
    )
}

export default page

