import React from "react";
import CustomAuthorization from "@/features/auth/authorization";
import LoanProductDetailsLayout from "@/layout/createLoanProduct-detail-layout";

type props = {
    children: React.ReactNode;
}

const FundTabs: React.FC<props> = ({ children }) => {

    return (
        <CustomAuthorization authorizedRoles={['PORTFOLIO_MANAGER',"MEEDL_SUPER_ADMIN","PORTFOLIO_MANAGER_ASSOCIATE"]}>
            <LoanProductDetailsLayout>
                {children}
            </LoanProductDetailsLayout>
        </CustomAuthorization>
    );
}

export default FundTabs;