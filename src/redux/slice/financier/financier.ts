import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CurrentMyInvestmentVehicleDetails} from "@/types/Component.type";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string;
    financierType: string;
    currentMyInvestmentVehicleDetails: CurrentMyInvestmentVehicleDetails | null;
   
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: '',
    financierType: '',
    currentMyInvestmentVehicleDetails: null,

   
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
        setCurrentMyInvestmentVehicleDetails : (state, action: PayloadAction<CurrentMyInvestmentVehicleDetails>) => {
            state.currentMyInvestmentVehicleDetails = action.payload;
        },
       
    }
})

export const {setCurrentFinancierId, setCurrentMyInvestmentVehicleDetails ,setFinancierMode, setFinancierType} = financierSlice.actions;
export default financierSlice.reducer;