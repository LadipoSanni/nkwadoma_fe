import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface paymentState {
    paymentTab: number,
    walletTab: number,
    repaymentAmount: string
}

const initialState:paymentState = {
    paymentTab: 0,
    walletTab: 0,
    repaymentAmount: ""
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCurrentPaymentTypeTab: (state, action: PayloadAction<number>) => {
            state.paymentTab = action.payload;
        },  
        setWalletTab: (state, action: PayloadAction<number>) => {
            state.walletTab = action.payload;
        },  
        setRepaymentAmount: (state, action: PayloadAction<string>) => {
            state.repaymentAmount = action.payload;
        },  
    }
})

export const {setCurrentPaymentTypeTab,setWalletTab,setRepaymentAmount} = paymentSlice.actions;

export default paymentSlice.reducer;
