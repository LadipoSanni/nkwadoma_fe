import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface vehicleState {
    currentVehicleId: string;
}

const initialState : vehicleState = {
    currentVehicleId: '',
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setCurrentVehicleId: (state, action: PayloadAction<string>) => {
            state.currentVehicleId = action.payload;
        }
    }
})

export const {setCurrentVehicleId} = vehicleSlice.actions;

export default vehicleSlice.reducer;