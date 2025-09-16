import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface createLoanOfferSlice {
    selectedLoanRequestId: string;
    loanOfferId: string;
}

const initialState: createLoanOfferSlice = {
    selectedLoanRequestId: '',
    loanOfferId: '',
}

const createLoanOfferSlice = createSlice({
    name: 'createLoanOffer',
    initialState,
    reducers: {
        setSelectedLoanRequestId(state, action:PayloadAction<string>){
            state.selectedLoanRequestId = action.payload;
        },
        setLoanOfferId(state, action:PayloadAction<string>){
            state.loanOfferId = action.payload;
        }
    }
})

export const {setSelectedLoanRequestId,setLoanOfferId} = createLoanOfferSlice.actions;
export default createLoanOfferSlice.reducer;