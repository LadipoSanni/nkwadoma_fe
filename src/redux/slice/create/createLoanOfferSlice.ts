import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface createLoanOfferSlice {
    selectedLoanRequestId: string;
}

const initialState: createLoanOfferSlice = {
    selectedLoanRequestId: '',
}

const createLoanOfferSlice = createSlice({
    name: 'createLoanOffer',
    initialState,
    reducers: {
        setSelectedLoanRequestId(state, action:PayloadAction<string>){
            state.selectedLoanRequestId = action.payload;
        }
    }
})

export const {setSelectedLoanRequestId} = createLoanOfferSlice.actions;
export default createLoanOfferSlice.reducer;