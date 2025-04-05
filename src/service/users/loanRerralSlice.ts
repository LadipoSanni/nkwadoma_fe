import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoanReferralState {
    loanReferralStatus: string;
    currentStep: number;
    isLoaneeIdentityVerified: boolean;
}

const initialState: LoanReferralState = {
    loanReferralStatus: '',
    currentStep: 0,
    isLoaneeIdentityVerified: false,
};

const loanReferralSlice = createSlice({
    name: 'loanReferral',
    initialState,
    reducers: {
        setLoanReferralStatus(state, action: PayloadAction<string>) {
            state.loanReferralStatus = action.payload;
        },
        setCurrentStep(state, action: PayloadAction<number>) {
            state.currentStep = action.payload;
        },
        setLoaneeIdentityVerifiedStatus(state, action: PayloadAction<boolean>) {
            state.isLoaneeIdentityVerified = action.payload;
        },
    },
});

export const { setLoanReferralStatus, setCurrentStep, setLoaneeIdentityVerifiedStatus } = loanReferralSlice.actions;
export default loanReferralSlice.reducer;