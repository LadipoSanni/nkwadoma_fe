import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface LoanOfferInitialState {
    loanOfferId: string,
    selectedLoanRequestId: string,
    loanRequestDetailsCurrentTabIndex: number,
    loaneeName: string,
    loaneeAmountRequested: number

}

const initialState: LoanOfferInitialState  = {
    loanOfferId: "" ,
    selectedLoanRequestId: "",
    loanRequestDetailsCurrentTabIndex: 0,
    loaneeName: "",
    loaneeAmountRequested: 0
};

export const loanOfferSlice = createSlice({
    name: "loanOffer",
    initialState,
    reducers:{
        setLoanOfferId: (state, action: PayloadAction<string>) => {
            state.loanOfferId = action.payload;
        },
        setSelectedLoanRequestId: (state, action: PayloadAction<string>) => {
            state.selectedLoanRequestId = action.payload;
        },
        setLoanRequestDetailsCurrentTabIndex : (state, action: PayloadAction<number>) => {
            state.loanRequestDetailsCurrentTabIndex = action.payload;
        },
        setLoaneeName : (state, action: PayloadAction<string>) => {
            state.loaneeName = action.payload;
        },
        setLoaneeAmountRequested: (state, action: PayloadAction<number>) => {
            state.loaneeAmountRequested = action.payload;
        }
    }
})

export const {setLoanOfferId, setSelectedLoanRequestId,setLoanRequestDetailsCurrentTabIndex, setLoaneeName,setLoaneeAmountRequested} = loanOfferSlice.actions

export default loanOfferSlice.reducer;