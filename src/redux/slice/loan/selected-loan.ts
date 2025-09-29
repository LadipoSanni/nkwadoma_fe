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
    currentTabRoute: string;
    cohortLoaneeId: string;
    companySelectedTab: number;
    selectedGeneralTab: number;
    searchLoan: string;
    programId: string;
    programName: string
}

const initialState: SelectedLoanState = {
    currentTab: 'Loan referrals',
    clickedOrganization: null,
    clickedDisbursedLoanIdNumber: "",
    disbursedLoanAccountId:"",
    clickedLoanProductId:"",
    fundProductAvailableAmount: 0,
    currentTabStatus: "LOAN_REFERRAL",
    loanReferralId: "",
    clickedLoanId: "",
    currentTabRoute: "loan-referral",
    cohortLoaneeId: '',
    companySelectedTab: 0,
    selectedGeneralTab: 0,
    searchLoan: "",
    programId:"",
    programName: ""
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
        setProgramId: (state, action: PayloadAction<string>) => {
            state.programId = action.payload;
          },
          resetProgramId: (state) => {
            state.programId = ""
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
        },
        setcurrentTabRoute : (state, action: PayloadAction<string>) => {
            state.currentTabRoute = action.payload;
        },
        setCohortLoaneeId: (state, action: PayloadAction<string>) => {
            state.cohortLoaneeId = action.payload;
        },
        setSelectedCompanyTab: (state , action: PayloadAction<number>) => {
            state.companySelectedTab = action.payload;
        },
        setSelectedGeneralTab: (state, action: PayloadAction<number>) => {
            state.selectedGeneralTab = action.payload;
        },
        resetFundProductAvailableAmount: (state) => {
            state.fundProductAvailableAmount = 0
        },
        setSearchLoan: (state, action: PayloadAction<string>) => {
            state.searchLoan = action.payload;
        },
        setProgramName: (state, action: PayloadAction<string>) => {
            state.programName = action.payload;
          },
        resetProgramName: (state) => {
            state.programName = ""
          },
    },
});

export const { setCurrentTab,setCohortLoaneeId , setClickedLoanId, setClickedOrganization,
    setLoanReferralId, setClickedDisbursedLoanIdNumber, setDisbursedLoanIdNumber, setClickedLoanProductId,
    setFundProductAvailableAmount,setCurrentTabStatus,resetTab,setcurrentTabRoute,
    setSelectedCompanyTab,setSelectedGeneralTab,resetFundProductAvailableAmount,setSearchLoan,
    resetProgramId,setProgramId,setProgramName,resetProgramName
} = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;
