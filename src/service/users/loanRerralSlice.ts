import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LoaneeCurentInformation} from "@/types/loanee";

interface LoanReferralState {
    loanReferralStatus: string;
    currentStep: number;
    isLoaneeIdentityVerified: boolean;
    loaneeCurrentInfo : LoaneeCurentInformation ;
}

const initialState: LoanReferralState = {
    loanReferralStatus: '',
    currentStep: 0,
    isLoaneeIdentityVerified: false,
    loaneeCurrentInfo : {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        nextOfKinRelationship: "",
        contactAddress: "",
        alternateEmail: "",
        alternatePhoneNumber: "",
        alternateContactAddress: "",
    },
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
        setLoaneeCurrentInfo(state, action: PayloadAction<LoaneeCurentInformation >) {
            state.loaneeCurrentInfo = action.payload;
        }
    },
});

export const { setLoanReferralStatus, setCurrentStep,setLoaneeCurrentInfo, setLoaneeIdentityVerifiedStatus } = loanReferralSlice.actions;
export default loanReferralSlice.reducer;