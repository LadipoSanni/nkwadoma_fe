import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface OrganizationSliceState {
    organizationStatusTab:  string ;
    setOrganizationId: string,
    organizationDetailTab: string;
    loaneeId: string;
}

const initialState:OrganizationSliceState= {
    organizationStatusTab: "active",
    setOrganizationId: "",
    organizationDetailTab: "details",
    loaneeId: "",
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganizationTabStatus: ( state, action: PayloadAction<string >) => {
            state. organizationStatusTab = action.payload;
        },
        resetOrganizationId: (state) => {
            state.setOrganizationId= ""
        },
        setOrganizationId: ( state, action: PayloadAction<string >) => {
            state.setOrganizationId = action.payload;
        },
        setOrganizationDetail: ( state, action: PayloadAction<string >) => {
            state.organizationDetailTab = action.payload;
        },
        resetOrganizationDetailsStatus: (state) => {
            state.organizationDetailTab= "details"
        },
        setLoaneeId: ( state, action: PayloadAction<string >) => {
            state.loaneeId = action.payload;
        }
    }
})

export const {setOrganizationTabStatus,setLoaneeId,resetOrganizationId,setOrganizationId,setOrganizationDetail,resetOrganizationDetailsStatus} = organizationSlice.actions;
export default organizationSlice.reducer;