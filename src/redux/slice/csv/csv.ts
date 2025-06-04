import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface csvSliceState {
    uploadCsvTab:  string ;
}

const initialState:csvSliceState = {
   uploadCsvTab: "loaneeData"
}

export const csvSlice = createSlice({
    name: 'csv',
    initialState,
    reducers: {
        setCurrentCsvStatus: ( state, action: PayloadAction<string >) => {
            state.uploadCsvTab = action.payload;
        },
        resetCsvStatus:(state) => {
            state.uploadCsvTab =  "loaneeData"
        }
    }
})

export const { setCurrentCsvStatus, resetCsvStatus} = csvSlice.actions;
export default csvSlice.reducer;