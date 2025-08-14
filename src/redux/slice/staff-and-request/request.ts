import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
    requestStatusTab: string
    requestOrganizationStatusTab:string
}

const initialState: StaffProps = {
    requestStatusTab: "pending",
    requestOrganizationStatusTab: "pending"
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequestStatusTab: (state, action: PayloadAction<string>) => {
            state.requestStatusTab = action.payload;
        },
        setrequestOrganizationStatusTab: (state, action: PayloadAction<string>) => {
            state.requestOrganizationStatusTab = action.payload;
        }
    }
})

export const {setRequestStatusTab,setrequestOrganizationStatusTab} =requestSlice.actions
export default requestSlice.reducer

// financierStatusTab: "active",