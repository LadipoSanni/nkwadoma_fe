import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CurrentMyInvestmentVehicleDetails} from "@/types/Component.type";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string;
    financierType: string;
    currentMyInvestmentVehicleDetails: CurrentMyInvestmentVehicleDetails | null;
    activeAndInvitedFinancierId: string;
    financierInvestmentVehicleId: string
   
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: '',
    financierType: '',
    currentMyInvestmentVehicleDetails: null,
    activeAndInvitedFinancierId: ``,
    financierInvestmentVehicleId: ``,

   
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
        setActiveAndInvitedFinancierId: (state, action: PayloadAction<string>) => {
            state.activeAndInvitedFinancierId = action.payload;
        },
       setFinancierInvestmentVehicleId: (state, action: PayloadAction<string>) => {
            state.financierInvestmentVehicleId = action.payload;
       }
    }
})

export const {setCurrentFinancierId, setCurrentMyInvestmentVehicleDetails ,setFinancierMode, setFinancierType, setActiveAndInvitedFinancierId, setFinancierInvestmentVehicleId} = financierSlice.actions;
export default financierSlice.reducer;