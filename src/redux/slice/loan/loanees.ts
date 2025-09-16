import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LoaneesProps {
    selectedLoaneeId: string;
    selectedLoaneeFullName: string;
    selectedLoaneeFirstName: string;
    selectedLoaneeLastName: string;
}

const initialState: LoaneesProps = {
    selectedLoaneeId: "",
    selectedLoaneeFullName: '',
    selectedLoaneeFirstName: '',
    selectedLoaneeLastName: '',
}

export const loaneesSlice = createSlice({
    name: 'loanees',
    initialState,
    reducers : {
        setSelectedLoaneeId: (state, action: PayloadAction<string>) => {
            state.selectedLoaneeId = action.payload;
        },
        setSelectedLoaneeFullName: (state, action: PayloadAction<string>) => {
            state.selectedLoaneeFullName = action.payload;
        },
        setSelectedLoaneeFirstName: (state, action: PayloadAction<string>) => {
            state.selectedLoaneeFirstName = action.payload;
        },
        setSelectedLoaneeLastName: (state, action: PayloadAction<string>) => {
            state.selectedLoaneeLastName = action.payload;
        }
    }
})

export const { setSelectedLoaneeId, setSelectedLoaneeFullName, setSelectedLoaneeFirstName, setSelectedLoaneeLastName } = loaneesSlice.actions;
export default loaneesSlice.reducer;