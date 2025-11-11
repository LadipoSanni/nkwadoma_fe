import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface type {
    fundWalletFrom: string,
    makePaymentFrom: string,
}

const initialState:  type = {
    fundWalletFrom: '',
    makePaymentFrom: '',
}
export const walletFlowSlice = createSlice({
    name: 'walletFlow',
    initialState,
    reducers: {
        setFundWalletFrom : (state, action: PayloadAction<string>) => {
            state.fundWalletFrom = action.payload;
        },
        setMakePaymentFrom : (state, action: PayloadAction<string>) => {
            state.makePaymentFrom = action.payload;
        }
    }

})

export const {
    setFundWalletFrom,setMakePaymentFrom,
} = walletFlowSlice.actions;
export default walletFlowSlice.reducer;