import React from 'react';
import LoaneeOnboarding from "@/features/onboarding/loanee";
import CustomAuthorization from "@/features/auth/authorization";


const Page = () => {
    return (
        <CustomAuthorization authorizedRoles={['LOANEE']}>
            <LoaneeOnboarding/>
        </CustomAuthorization>
    );
};

export default Page;