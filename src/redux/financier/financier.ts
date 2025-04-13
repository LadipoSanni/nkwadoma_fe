import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string;
    financierType: string;
   
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: '',
    financierType: '',
   
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
        setFinancierType: (state, action: PayloadAction<string>) => {
            state.financierType = action.payload;
        },
       
    }
})

export const {setCurrentFinancierId,setFinancierMode, setFinancierType} = financierSlice.actions;
export default financierSlice.reducer;