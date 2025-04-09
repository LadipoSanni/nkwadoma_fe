import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLoanState {
    currentTab: string;
    clickedDisbursedLoanIdNumber: string | object | React.ReactNode;
    clickedOrganization: {
        id: string | number;
        name: string;
        logoImage: string;
    } | null;
    disbursedLoanAccountId: string;
    clickedLoanProductId: string;
}

const initialState: SelectedLoanState = {
    currentTab: 'Loan requests',
    clickedOrganization: null,
    clickedDisbursedLoanIdNumber: "",
    disbursedLoanAccountId:"",
    clickedLoanProductId:"",
};

export const selectedLoanSlice = createSlice({
    name: "SelectedLoan",
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
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
        }
    },
});

export const { setCurrentTab, setClickedOrganization, setClickedDisbursedLoanIdNumber, setDisbursedLoanIdNumber, setClickedLoanProductId } = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;
