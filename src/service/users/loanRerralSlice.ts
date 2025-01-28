import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoanReferralState {
    loanReferralStatus: string;
    currentStep: number;
}

const initialState: LoanReferralState = {
    loanReferralStatus: '',
    currentStep: 0,
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
    },
});

export const { setLoanReferralStatus, setCurrentStep } = loanReferralSlice.actions;
export default loanReferralSlice.reducer;