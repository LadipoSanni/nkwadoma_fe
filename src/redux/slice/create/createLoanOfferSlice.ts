import {createSlice, PayloadAction} from "@reduxjs/toolkit";

 export interface loanProductObj {
    id: string
    availableAmountToBeOffered: string | number
    totalAmountAvailable: string | number
    loanProductSize: string | number
}

interface createLoanOfferSlice {
    selectedLoanRequestId: string;
    loanOfferId: string;
    amount: string;
    selectedLoanProductId: string;
    amountAvailable: number
    loanProductName: string
    loanProductType: loanProductObj
}

const initialState: createLoanOfferSlice = {
    selectedLoanRequestId: '',
    loanOfferId: '',
    amount: '',
    selectedLoanProductId: '',
    amountAvailable: 0,
    loanProductName: "",
    loanProductType: {
         id: "",
        availableAmountToBeOffered: "",
        totalAmountAvailable: "",
        loanProductSize: ""
}
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
        },
        setAmountAvailable(state, action:PayloadAction<number>){
            state.amountAvailable = action.payload;
        },
        setLoanProductName(state, action:PayloadAction<string>){
            state.loanProductName = action.payload;
        },
        setLoanProductType(state, action:PayloadAction<loanProductObj>){
            state.loanProductType = action.payload;
        },
        resetAll(state){
            state.loanProductType =  {
                availableAmountToBeOffered: "",
                totalAmountAvailable: "",
                loanProductSize: "",
                id:""
        },
        state.loanProductName = "",
        state.amountAvailable = 0,
        state.selectedLoanProductId = "",
        state.amount = "",
        state.selectedLoanProductId = "",
        state.selectedLoanRequestId = ""
        }
        
    }
})

export const {setSelectedLoanRequestId,setLoanOfferId,
       setSelectedLoanProductId, setAmount,setAmountAvailable,
       setLoanProductName, setLoanProductType, resetAll
} = createLoanOfferSlice.actions;
export default createLoanOfferSlice.reducer;