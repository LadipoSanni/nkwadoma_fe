import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AcctObj } from "@/components/loanee/payment-type/Linked-account";

 
    interface InitialLinkedAcctFormValue {
         repaymentAmount :  string
         account :  AcctObj[]
     }


interface paymentState {
    paymentTab: number,
    walletTab: number,
    repaymentAmount: string,
    linkedAccountTab: number,
    payStackAmount: string,
    initialLinkedAcctFormValue: InitialLinkedAcctFormValue | null

}

const initialState:paymentState = {
    paymentTab: 0,
    walletTab: 0,
    repaymentAmount: "",
    linkedAccountTab: 0,
    initialLinkedAcctFormValue: null,
    payStackAmount: ""

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
        setLinkedAccountTab: (state, action: PayloadAction<number>) => {
            state.linkedAccountTab = action.payload;
        },  
        setInitialLinkedAccountValue: (state, action: PayloadAction<InitialLinkedAcctFormValue>) => {
            state.initialLinkedAcctFormValue = action.payload;
        }, 
        resetInitialLinkedAccountValue: (state) => {
            state.initialLinkedAcctFormValue = null
        }, 
        setPaystackAmount: (state, action: PayloadAction<string>) => {
            state.payStackAmount = action.payload;
        }, 
    }
})

export const {setCurrentPaymentTypeTab,setWalletTab,setRepaymentAmount,setLinkedAccountTab,setInitialLinkedAccountValue,resetInitialLinkedAccountValue,setPaystackAmount} = paymentSlice.actions;


export default paymentSlice.reducer;
