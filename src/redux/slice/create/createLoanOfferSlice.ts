import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface createLoanOfferSlice {
    selectedLoanRequestId: string;
    loanOfferId: string;
    amount: string;
    selectedLoanProductId: string;
}

const initialState: createLoanOfferSlice = {
    selectedLoanRequestId: '',
    loanOfferId: '',
    amount: '',
    selectedLoanProductId: '',
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
        },
        setAmount(state, action:PayloadAction<string>){
            state.amount = action.payload;
        },
        setSelectedLoanProductId(state, action:PayloadAction<string>){
            state.selectedLoanProductId = action.payload;
        }
    }
})

export const {setSelectedLoanRequestId,setLoanOfferId,
       setSelectedLoanProductId, setAmount,
} = createLoanOfferSlice.actions;
export default createLoanOfferSlice.reducer;