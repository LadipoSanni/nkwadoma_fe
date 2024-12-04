import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface loaneeSlice {
    laonReferralId : string
}

const initialState : loaneeSlice = {
    laonReferralId: ''
}

export const loaneeSlice = createSlice({
    name: 'loanee',
    initialState,
    reducers: {
        setLoanReferralId: (state, action: PayloadAction<string>) =>{
            state.laonReferralId = action.payload
        }
    }
})

export const  {setLoanReferralId} = loaneeSlice.actions;
export default loaneeSlice.reducer;