import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoanOfferInitialState {
    loanOfferId: string
}

const initialState: LoanOfferInitialState  = {
    loanOfferId: "" 
};

export const loanOfferSlice = createSlice({
    name: "loanOffer",
    initialState,
    reducers:{
        setLoanOfferId: (state, action: PayloadAction<string>) => {
            state.loanOfferId = action.payload;
        },
    }
})

export const {setLoanOfferId} = loanOfferSlice.actions

export default loanOfferSlice.reducer;