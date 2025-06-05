import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface csvSliceState {
    uploadCsvTab:  string ;
    userdataFile: File  | null;
    repaymentFile: File  | null;
}

const initialState:csvSliceState = {
   uploadCsvTab: "loaneeData",
   userdataFile: null,
   repaymentFile: null
}

export const csvSlice = createSlice({
    name: 'csv',
    initialState,
    reducers: {
        setCurrentCsvStatus: ( state, action: PayloadAction<string >) => {
            state.uploadCsvTab = action.payload;
        },
        setUserdataFile: (state, action: PayloadAction<File | null>) => {
            state.userdataFile = action.payload;
        },
        setRepaymentFile: (state, action: PayloadAction<File | null>) => {
            state.repaymentFile = action.payload;
        },
        resetCsvStatus:(state) => {
            state.uploadCsvTab =  "loaneeData";
            state.userdataFile = null
            state.repaymentFile = null
        }
    }
})

export const { setCurrentCsvStatus, resetCsvStatus,setRepaymentFile, setUserdataFile} = csvSlice.actions;
export default csvSlice.reducer;