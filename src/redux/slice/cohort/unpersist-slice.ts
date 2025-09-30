import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {cohortBreakDown} from "@/types/Component.type";


interface cohortBreakDownState {
    cohortBreakDownContainer: cohortBreakDown[] | [];
    loaneeBasicDetails:{
        loaneeFirstName: string,
        loaneeLastName: string,
        loaneeEmail: string,
        loaneeInitialDeposit: string,
    }
}

const initialState: cohortBreakDownState = {
    cohortBreakDownContainer: [
        {
            currency: "",
            itemAmount: "",
            itemName: "",
            loanBreakdownId: '',
        }
    ],
    loaneeBasicDetails:{
        loaneeFirstName: '',
        loaneeLastName: '',
        loaneeEmail: '',
        loaneeInitialDeposit: '',
    }

};


export const cohortBreakDownSlice = createSlice({
    name: "cohortBreakDownSlice",
    initialState,
    reducers: {
        setCohortBreakDownContainer: (state, action: PayloadAction<cohortBreakDown[] | []>)=>{
            state.cohortBreakDownContainer = action.payload;
        },
        setLoaneeBasicDetails:(state, action: PayloadAction<{
            loaneeFirstName: string,
            loaneeLastName: string,
            loaneeEmail: string,
            loaneeInitialDeposit: string,
        }>)=>{
            state.loaneeBasicDetails = action.payload;
        }
    },
});


export const { setCohortBreakDownContainer, setLoaneeBasicDetails, } = cohortBreakDownSlice.actions;

export default cohortBreakDownSlice.reducer;