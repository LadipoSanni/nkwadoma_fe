import React from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";

interface StepContentProps {
    step: number;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
    switch (step) {
        case 0:
            return <LoanApplicationDetails/>;
        case 1:
            return <IdentityVerification/>;
        case 2:
            return <div>Content for Additional information (3)</div>;
        case 3:
            return <div>Content for Confirm loan application (4)</div>;
        default:
            return null;
    }
};

export default StepContent;