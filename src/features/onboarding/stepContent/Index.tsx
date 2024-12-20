import React from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";
import CurrentInformation from "@/features/onboarding/stepContent/currentInformation/Index";
import ConfirmLoanReferralAcceptance from "@/features/onboarding/stepContent/confirmLoanReferralAcceptance/Index";

interface StepContentProps {
    step: number;
    setCurrentStep: (step: number) => void;
    loaneeLoanDetail: LoaneeLoanDetail;
}
export interface LoaneeLoanDetail {
    tuitionAmount: string;
    amountRequested: string;
    initialDeposit: string;
    cohortStartDate: string;
    referredBy: string
}

const StepContent: React.FC<StepContentProps> = ({ step, setCurrentStep, loaneeLoanDetail }) => {

    switch (step) {
        case 0:
            return <LoanApplicationDetails loaneeLoanDetail={loaneeLoanDetail}/>;
        case 1:
            return <IdentityVerification/>;
        case 2:
            return <CurrentInformation setCurrentStep={setCurrentStep}/>;
        case 3:
            return <ConfirmLoanReferralAcceptance />;
        default:
            return null;
    }
};

export default StepContent;