import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CurrentMyInvestmentVehicleDetails} from "@/types/Component.type";


interface vehicleState {
    currentFinancierId: string;
    financierMode: string;
    financierType:  'INDIVIDUAL' | 'COOPERATE' | null;
    currentMyInvestmentVehicleDetails: CurrentMyInvestmentVehicleDetails | null;
    activeAndInvitedFinancierId: string;
    financierInvestmentVehicleId: string;
    financierStatusTab: string;
}

const initialState: vehicleState = {
    currentFinancierId: '',
    financierMode: '',
    financierType: null,
    currentMyInvestmentVehicleDetails: null,
    activeAndInvitedFinancierId: ``,
    financierInvestmentVehicleId: ``,
    financierStatusTab: "active",
   
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
        setActiveAndInvitedFinancierId: (state, action: PayloadAction<string>) => {
            state.activeAndInvitedFinancierId = action.payload;
        },
       setFinancierInvestmentVehicleId: (state, action: PayloadAction<string>) => {
            state.financierInvestmentVehicleId = action.payload;
       },
       setFinancierStatusTab: (state, action: PayloadAction<string>) => {
        state.financierStatusTab =  action.payload
       },
       reset: (state) => {
        state.financierStatusTab = ""
       },
    }
})

export const {setCurrentFinancierId, setCurrentMyInvestmentVehicleDetails ,setFinancierMode, setFinancierType, setActiveAndInvitedFinancierId, setFinancierInvestmentVehicleId,setFinancierStatusTab,reset} = financierSlice.actions;
export default financierSlice.reducer;