import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Draft {
    // draftId: string;
    name: string;
    investmentVehicleType: string | undefined,
    mandate: string;
    sponsors: string;
    tenure: string | number,
    size: string | number,
    rate: number | string;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    status: string;
    startDate: string;
    minimumInvestmentAmount: number | string;
    // lastUpdatedDate: string;
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