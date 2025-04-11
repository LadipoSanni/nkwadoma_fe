import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { clear } from "@testing-library/user-event/dist/cjs/utility/clear.js";

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
  interface InvestmentVehicleField {
    id: string;
    name: string;
    investmentVehicleType: string ,
    mandate: string;
    tenure: string,
    size: string,
    rate:  string;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    startDate: string;
    minimumInvestmentAmount: string;

  }


interface vehicleState {
    currentVehicleId: string;
    saveClickedDraft: Draft | null;
    vehicleType: string
    CreateInvestmentField: InvestmentVehicleField | null
    setInvestmentVehicleType: string
    setDraftId: string
    setPublicVehicleUrl: string
}

const initialState: vehicleState = {
    currentVehicleId: '',
    saveClickedDraft: null,
    vehicleType:"",
    CreateInvestmentField: null,
    setInvestmentVehicleType: "",
    setDraftId: "",
    setPublicVehicleUrl: ""
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
        setCreateInvestmentField: (state, action: PayloadAction<InvestmentVehicleField>) => {
            state.CreateInvestmentField = action.payload;
        },
        clearSaveCreateInvestmentField: (state) => {
            state.CreateInvestmentField= null;
        },
        setInvestmentVehicleType: (state, action: PayloadAction<string>) => {
            state.setInvestmentVehicleType = action.payload;
        },
        setDraftId: (state, action: PayloadAction<string>) => {
            state.setDraftId = action.payload;
        },
        clearDraftId: (state) => {
            state.setDraftId = "";
        },
        setPublicVehicleUrl: (state, action: PayloadAction<string>) => {
            state.setPublicVehicleUrl = action.payload;
        },
        clearPublicVehicleUrl:(state) => {
            state.setPublicVehicleUrl = ""
        }
    }
})

export const {setCurrentVehicleId, setSaveClickedDraft, clearSaveClickedDraft,setVehicleType,setCreateInvestmentField,clearSaveCreateInvestmentField,setInvestmentVehicleType,setDraftId,clearDraftId,setPublicVehicleUrl,clearPublicVehicleUrl} = vehicleSlice.actions;
export default vehicleSlice.reducer;