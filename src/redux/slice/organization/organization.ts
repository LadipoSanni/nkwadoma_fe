import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface OrganizationSliceState {
    organizationStatusTab:  string ;
}

const initialState:OrganizationSliceState= {
    organizationStatusTab: "active",
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganizationTabStatus: ( state, action: PayloadAction<string >) => {
            state. organizationStatusTab = action.payload;
        },
        resetOrganization: (state) => {
            state.organizationStatusTab = "active"
        }
    }
})

export const {setOrganizationTabStatus,resetOrganization} = organizationSlice.actions;
export default organizationSlice.reducer;