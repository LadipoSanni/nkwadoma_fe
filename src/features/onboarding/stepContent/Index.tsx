import React from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";
import AdditionalInformation from "@/features/onboarding/stepContent/additionalInformation/Index";

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
            return <AdditionalInformation/>;
        case 3:
            return <div>Content for Confirm loan application (4)</div>;
        default:
            return null;
    }
};

export default StepContent;