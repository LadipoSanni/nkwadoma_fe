import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CurrentMyInvestmentVehicleDetails} from "@/types/Component.type";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string;
    financierType:  'INDIVIDUAL' | 'COOPERATE' | null;
    currentMyInvestmentVehicleDetails: CurrentMyInvestmentVehicleDetails | null;
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: '',
    financierType: null,
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
        setFinancierType: (state, action: PayloadAction<'INDIVIDUAL' | 'COOPERATE'>) => {
            state.financierType = action.payload;
        },
        setCurrentMyInvestmentVehicleDetails : (state, action: PayloadAction<CurrentMyInvestmentVehicleDetails>) => {
            state.currentMyInvestmentVehicleDetails = action.payload;
        },
       
    }
})

export const {setCurrentFinancierId, setCurrentMyInvestmentVehicleDetails ,setFinancierMode, setFinancierType} = financierSlice.actions;
export default financierSlice.reducer;