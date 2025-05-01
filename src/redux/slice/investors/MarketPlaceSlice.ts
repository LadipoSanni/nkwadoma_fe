import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MarketData {
    marketInvestmentVehicleId?: string;
    vehicleType?: string;
    minimumInvestmentAmount?: number | string ;
    // status: string;
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
        clearAll: (state) => {
            state.savedMarketplaceData = null
        }
    }
})
export const {setMarketInvestmentVehicleId,clearAll} = MarketPlaceSlice.actions;
export default MarketPlaceSlice.reducer;