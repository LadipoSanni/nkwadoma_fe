import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoanProduct {
    loanProductId: string,
    loanProductName: string
}

const initialState: LoanProduct = {
    loanProductId: "",
    loanProductName: ""
}

export const LoanProductSlice = createSlice({
    name: "loanProduct",
    initialState,
    reducers: {
        setLoanProductId: (state, action: PayloadAction<string>) => {
            state.loanProductId = action.payload;
        },
        setLoanProductName: (state, action: PayloadAction<string>) => {
            state.loanProductName = action.payload;
        },
    }})

    export const {setLoanProductId,setLoanProductName} = LoanProductSlice.actions;

    export default LoanProductSlice.reducer;