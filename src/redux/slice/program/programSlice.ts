import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MarketData {
    marketInvestmentVehicleId: string;
    vehicleType: string;
}

interface ProgramSliceState {
    currentProgramId:  string | undefined;
    savedMarketplaceData: MarketData | null;
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
    savedMarketplaceData: null,
}

export const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        setCurrentProgramId: ( state, action: PayloadAction<undefined | string >) => {
            state.currentProgramId = action.payload;
        },
        setMarketInvestmentVehicleId: (state, action: PayloadAction<MarketData>) => {
            state.savedMarketplaceData  = action.payload;
        },
    }
})

export const {setCurrentProgramId, setMarketInvestmentVehicleId  } = programSlice.actions;
export default programSlice.reducer;