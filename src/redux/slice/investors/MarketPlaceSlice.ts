import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MarketData {
    marketInvestmentVehicleId: string;
    vehicleType: string;
}

interface ProgramSliceState {
    savedMarketplaceData: MarketData | null;
}

const initialState: ProgramSliceState = {
    savedMarketplaceData: null,
}

export const MarketPlaceSlice = createSlice({
    name: 'marketPlace',
    initialState,
    reducers: {
        setMarketInvestmentVehicleId: (state, action: PayloadAction<MarketData>) => {
            state.savedMarketplaceData = action.payload;
        },
    }
})
export const {setMarketInvestmentVehicleId} = MarketPlaceSlice.actions;
export default MarketPlaceSlice.reducer;