import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
    requestStatusTab: string
}

const initialState: StaffProps = {
    requestStatusTab: "pending"
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequestStatusTab: (state, action: PayloadAction<string>) => {
            state.requestStatusTab = action.payload;
        },
    }
})

export const {setRequestStatusTab} =requestSlice.actions
export default requestSlice.reducer

// financierStatusTab: "active",