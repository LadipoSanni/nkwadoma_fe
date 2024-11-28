import React from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";
import AdditionalInformation from "@/features/onboarding/stepContent/additionalInformation/Index";
import ConfirmLoanReferralAcceptance from "@/features/onboarding/stepContent/confirmLoanReferralAcceptance/Index";

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
            return <ConfirmLoanReferralAcceptance />;
        default:
            return null;
    }
};

export default StepContent;