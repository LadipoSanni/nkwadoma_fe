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

  interface investmentStatus {
    state: string;
    status: string
  }


interface vehicleState {
    currentVehicleId: string;
    saveClickedDraft: Draft | null;
    vehicleType: string
    CreateInvestmentField: InvestmentVehicleField | null
    setInvestmentVehicleType: string
    setDraftId: string
    setPublicVehicleUrl: string;
    setInvestmentStatus: investmentStatus | null;
    setEditStatus: string
    statusDefaultValue: string
}

const initialState: vehicleState = {
    currentVehicleId: '',
    saveClickedDraft: null,
    vehicleType:"",
    CreateInvestmentField: null,
    setInvestmentVehicleType: "",
    setDraftId: "",
    setPublicVehicleUrl: "",
    setInvestmentStatus: null,
    setEditStatus: "",
    statusDefaultValue: 'operation',
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
        },
        setInvestmentStatus: (state, action: PayloadAction<investmentStatus> ) => {
            state.setInvestmentStatus = action.payload;
        },
        clearSaveInvestmentStatus: (state) => {
            state.setInvestmentStatus= null;
        },
        setEditStatus: (state, action: PayloadAction<string>) => {
            state.setEditStatus = action.payload;
        },
        clearEditStatus:(state) => {
            state.setEditStatus = ""
        },
        setStatusDefaultValue: (state, action: PayloadAction<string>) => {
            state.statusDefaultValue = action.payload;
          },
          resetStatusDefaultValue: (state) => {
            state.statusDefaultValue = "operation"
          },
        resetAll: (state) => {
             state.setEditStatus = ""
             state.setInvestmentStatus= null;
             state.setPublicVehicleUrl = ""
             state.setDraftId = "";
             state.statusDefaultValue = "operation"
        }
    }
})

export const {setCurrentVehicleId, 
                setSaveClickedDraft, 
                clearSaveClickedDraft,
                setVehicleType,
                setCreateInvestmentField,
                clearSaveCreateInvestmentField,
                setInvestmentVehicleType,
                setDraftId,clearDraftId,
                setPublicVehicleUrl,
                clearPublicVehicleUrl,
                setInvestmentStatus,
                clearSaveInvestmentStatus,
                setEditStatus,
                clearEditStatus,
                resetAll,
                setStatusDefaultValue,
                resetStatusDefaultValue
            } = vehicleSlice.actions;
export default vehicleSlice.reducer;