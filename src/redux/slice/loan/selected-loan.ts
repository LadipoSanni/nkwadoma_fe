import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLoanState {
    currentTab: string;
    clickedDisbursedLoanIdNumber: string | object | React.ReactNode;
    clickedOrganization: {
        id: string | number;
        name: string;
        logoImage: string;
    } | null;
    currentTabId: string;
}

const initialState: SelectedLoanState = {
    currentTab: 'Loan requests',
    clickedOrganization: null,
    clickedDisbursedLoanIdNumber: "",
    currentTabId: ''
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
        setCurrentTabId : (state, action: PayloadAction<string>) => {
            state.currentTabId = action.payload;
        }
    },
});

export const { setCurrentTab,setCurrentTabId, setClickedOrganization, setClickedDisbursedLoanIdNumber } = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;
