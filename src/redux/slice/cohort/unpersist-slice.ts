import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {cohortBreakDown} from "@/types/Component.type";


interface cohortBreakDownState {
    cohortBreakDownContainer: cohortBreakDown[];
}

const initialState: cohortBreakDownState = {
    cohortBreakDownContainer: [
        {
            currency: "",
            itemAmount: "",
            itemName: "",
            loanBreakdownId: '',
        }
    ]
};


export const cohortBreakDownSlice = createSlice({
    name: "cohortBreakDownSlice",
    initialState,
    reducers: {
        setCohortBreakDownContainer: (state, action: PayloadAction<cohortBreakDown[]>)=>{
            state.cohortBreakDownContainer = action.payload;
        }
    },
});


export const { setCohortBreakDownContainer } = cohortBreakDownSlice.actions;

export default cohortBreakDownSlice.reducer;