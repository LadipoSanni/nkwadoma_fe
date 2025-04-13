import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string
   
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: ''
   
}

export const financierSlice = createSlice({
    name: 'financier',
    initialState,
    reducers: {
        setCurrentFinancierId: (state, action: PayloadAction<string>) => {
            state.currentFinancierId = action.payload;
        },
        setFinancierMode: (state, action: PayloadAction<string>) => {
            state.financierMode = action.payload;
        },
       
    }
})

export const {setCurrentFinancierId,setFinancierMode} = financierSlice.actions;
export default financierSlice.reducer;