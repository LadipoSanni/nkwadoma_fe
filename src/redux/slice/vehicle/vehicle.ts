import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Draft {
    id: string;
    name: string;
    investmentVehicleType: string;
    mandate: string;
    sponsors: string;
    tenure: number;
    size: number;
    rate: number;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    minimumInvestmentAmount: number;
    status: string;
    startDate: string;
    totalAmountInInvestmentVehicle: number;
}

interface vehicleState {
    currentVehicleId: string;
    saveClickedDraft: Draft | null;
}

const initialState : vehicleState = {
    currentVehicleId: '',
    saveClickedDraft: null,
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setCurrentVehicleId: (state, action: PayloadAction<string>) => {
            state.currentVehicleId = action.payload;
        },
        setSaveClickedDraft: (state, action: PayloadAction<Draft>) => {
            state.saveClickedDraft = action.payload;
        },
        clearSaveClickedDraft: (state) => {
            state.saveClickedDraft = null;
        },
    }
})

export const { setCurrentVehicleId, setSaveClickedDraft, clearSaveClickedDraft } = vehicleSlice.actions;
export default vehicleSlice.reducer;