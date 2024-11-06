import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SelectedLoanState {
  currentTab: string;
}

const initialState: SelectedLoanState = {
    currentTab: 'loan referrals',
};


export const selectedLoanSlice = createSlice({
    name: "SelectedLoan",
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<string>)=>{
            state.currentTab = action.payload;
        }
    },
});


export const { setCurrentTab } = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;