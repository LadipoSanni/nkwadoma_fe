import { createSlice, PayloadAction } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { AcctObj } from "@/components/loanee/payment-type/Linked-account";

 
    interface InitialLinkedAcctFormValue {
         repaymentAmount :  string
         account :  AcctObj[]
     }
=======
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa

interface paymentState {
    paymentTab: number,
    walletTab: number,
<<<<<<< HEAD
    repaymentAmount: string,
    linkedAccountTab: number,
    payStackAmount: string,
    initialLinkedAcctFormValue: InitialLinkedAcctFormValue | null

=======
    repaymentAmount: string
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
}

const initialState:paymentState = {
    paymentTab: 0,
    walletTab: 0,
<<<<<<< HEAD
    repaymentAmount: "",
    linkedAccountTab: 0,
    initialLinkedAcctFormValue: null,
    payStackAmount: ""
=======
    repaymentAmount: ""
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
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
<<<<<<< HEAD
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
=======
        },  
    }
})

export const {setCurrentPaymentTypeTab,setWalletTab,setRepaymentAmount} = paymentSlice.actions;
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa

export default paymentSlice.reducer;
