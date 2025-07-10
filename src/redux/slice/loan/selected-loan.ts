import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLoanState {
    currentTab: string;
    currentTabStatus: string
    clickedDisbursedLoanIdNumber: string | object | React.ReactNode;
    clickedOrganization: {
        id: string | number;
        name: string;
        logoImage: string;
    } | null;
    disbursedLoanAccountId: string;
    clickedLoanProductId: string;
    fundProductAvailableAmount: number;
    loanReferralId: string;
    clickedLoanId: string;
}

const initialState: SelectedLoanState = {
    currentTab: 'Loan requests',
    clickedOrganization: null,
    clickedDisbursedLoanIdNumber: "",
    disbursedLoanAccountId:"",
    clickedLoanProductId:"",
    fundProductAvailableAmount: 0,
    currentTabStatus: "LOAN_REQUEST",
    loanReferralId: "",
    clickedLoanId: ""
};

export const selectedLoanSlice = createSlice({
    name: "SelectedLoan",
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        },
        setLoanReferralId: (state, action: PayloadAction<string>) => {
          state.loanReferralId = action.payload;
        },
        setClickedOrganization: (state, action: PayloadAction<{ id: string | number; name: string; logoImage: string }>) => {
            state.clickedOrganization = action.payload;
        },
        setClickedDisbursedLoanIdNumber: (state, action: PayloadAction<string | object | React.ReactNode>) => {
            state.clickedDisbursedLoanIdNumber = action.payload;
        },
        setDisbursedLoanIdNumber: (state, action: PayloadAction<string | object | React.ReactNode>) => {
            state.clickedDisbursedLoanIdNumber = action.payload;
        },
        setClickedLoanProductId: (state, action: PayloadAction<string>) => {
            state.clickedLoanProductId = action.payload;
        },
        setFundProductAvailableAmount: (state, action: PayloadAction<number>) => {
            state.fundProductAvailableAmount = action.payload;
        },
        setCurrentTabStatus: (state, action: PayloadAction<string>) => {
            state.currentTabStatus = action.payload;
        },
        resetTab: (state) => {
            state.currentTab = "Loan requests"
            state.currentTabStatus = "LOAN_REQUEST"
            state.clickedOrganization = null
        },
        setClickedLoanId : (state, action: PayloadAction<string>) => {
            state.clickedLoanId = action.payload;
        }
       
    },
});

export const { setCurrentTab,setClickedLoanId, setClickedOrganization,setLoanReferralId, setClickedDisbursedLoanIdNumber, setDisbursedLoanIdNumber, setClickedLoanProductId, setFundProductAvailableAmount,setCurrentTabStatus,resetTab } = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;
