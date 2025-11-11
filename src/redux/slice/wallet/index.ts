import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface type {
    fundWalletFrom: string,
}

const initialState:  type = {
    fundWalletFrom: '',
}
export const walletFlowSlice = createSlice({
    name: 'walletFlow',
    initialState,
    reducers: {
        setFundWalletFrom : (state, action: PayloadAction<string>) => {
            state.fundWalletFrom = action.payload;
        }
    }

})

export const {
    setFundWalletFrom,
} = walletFlowSlice.actions;
export default walletFlowSlice.reducer;