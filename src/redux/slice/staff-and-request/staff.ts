import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
   sideTab: string
}

const initialState: StaffProps = {
    sideTab: ""
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setSideTab: (state, action: PayloadAction<string>) => {
            state.sideTab = action.payload;
        },
    }
})

export const {setSideTab} = staffSlice.actions
export default staffSlice.reducer