import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface paymentState {
    paymentTab: number
}

const initialState:paymentState = {
    paymentTab: 0
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCurrentPaymentTypeTab: (state, action: PayloadAction<number>) => {
            state.paymentTab = action.payload;
        },  
    }
})

export const {setCurrentPaymentTypeTab } = paymentSlice.actions;

export default paymentSlice.reducer;
