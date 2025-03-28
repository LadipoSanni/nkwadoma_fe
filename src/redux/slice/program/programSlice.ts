import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgramSliceState {
    currentProgramId:  string | undefined;
    marketInvestmentVehicleId: string | undefined;
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
    marketInvestmentVehicleId: "",
}

export const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        setCurrentProgramId: ( state, action: PayloadAction<undefined | string >) => {
            state.currentProgramId = action.payload;
        },
        setMarketInvestmentVehicleId: (state, action: PayloadAction<undefined | string>) => {
            state.marketInvestmentVehicleId = action.payload;
        },
    }
})

export const {setCurrentProgramId, setMarketInvestmentVehicleId } = programSlice.actions;
export default programSlice.reducer;