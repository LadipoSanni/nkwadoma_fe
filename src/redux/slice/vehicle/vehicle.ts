import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Draft {
    id: string;
    name: string;
    investmentVehicleType: string | undefined,
    mandate: string;
    sponsors: string;
    tenure: number | string,
    size: number | string,
    rate: number | string;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    status: string;
    startDate: string;
    minimumInvestmentAmount: number | string;
}

interface vehicleState {
    currentVehicleId: string;
    saveClickedDraft: Draft | null;
    vehicleType: string
}

const initialState: vehicleState = {
    currentVehicleId: '',
    saveClickedDraft: null,
    vehicleType:""
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
        setVehicleType: (state, action: PayloadAction<string>) => {
            state.vehicleType = action.payload
    },
       
    }
})

export const {setCurrentVehicleId, setSaveClickedDraft, clearSaveClickedDraft,setVehicleType} = vehicleSlice.actions;
export default vehicleSlice.reducer;