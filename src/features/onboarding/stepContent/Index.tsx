import React, {useEffect} from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";
import AdditionalInformation from "@/features/onboarding/stepContent/additionalInformation/Index";
import ConfirmLoanReferralAcceptance from "@/features/onboarding/stepContent/confirmLoanReferralAcceptance/Index";

interface StepContentProps {
    step: number;
    setCurrentStep: (step: number) => void;
    loaneeLoanDetail: LoaneeLoanDetail;
}
export interface LoaneeLoanDetail {
    tuitionAmount: string;
    amountRequested: string;
    initialDeposit: string
}

const StepContent: React.FC<StepContentProps> = ({ step, setCurrentStep, loaneeLoanDetail }) => {

    switch (step) {
        case 0:
            return <LoanApplicationDetails initialDeposit={loaneeLoanDetail.initialDeposit} amountRequested={loaneeLoanDetail.amountRequested} tuitionAmount={loaneeLoanDetail.tuitionAmount}/>;
        case 1:
            return <IdentityVerification/>;
        case 2:
            return <AdditionalInformation setCurrentStep={setCurrentStep}/>;
        case 3:
            return <ConfirmLoanReferralAcceptance />;
        default:
            return null;
    }
};

export default StepContent;