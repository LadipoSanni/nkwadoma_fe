import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
   setSideTab: string
}

const initialState: StaffProps = {
    setSideTab: ""
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setCurrentVehicleId: (state, action: PayloadAction<string>) => {
            state.setSideTab = action.payload;
        },
    }
})

export const {setCurrentVehicleId} = staffSlice.actions
export default staffSlice.reducer