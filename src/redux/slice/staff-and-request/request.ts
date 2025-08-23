import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
    requestStatusTab: string
    requestOrganizationStatusTab:string
    isRequestedStaffOpen: boolean,
    isRequestedOrganizationOpen: boolean,
    requestedStaffId:string,
    requestedOrganizationId: string,
    isStaffModalOpen: boolean,
}

const initialState: StaffProps = {
    requestStatusTab: "pending",
    requestOrganizationStatusTab: "pending",
    isRequestedStaffOpen: false,
    isRequestedOrganizationOpen: false,
    requestedStaffId:"",
    requestedOrganizationId:"",
    isStaffModalOpen: false
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
        },
        setIsRequestedStaffOpen:(state, action: PayloadAction<boolean>) => {
          state.isRequestedStaffOpen = action.payload
        },
        setIsRequestedOrganizationOpen:(state, action: PayloadAction<boolean>) => {
            state.isRequestedOrganizationOpen = action.payload
          },
          setRequestedOrganizationId: (state, action: PayloadAction<string>) => {
            state.requestedOrganizationId = action.payload;
        },
        setRequestedStaffId: (state, action: PayloadAction<string>) => {
            state.requestedStaffId = action.payload;
        },
        resetRequestedStaffId: (state) => {
            state.requestedStaffId =""
        },
        resetRequestedOrganizationId: (state) => {
            state.requestedOrganizationId =""
        },
        setIsStaffOpen:(state, action: PayloadAction<boolean>) => {
            state.isStaffModalOpen = action.payload
          },
    }
})

export const {setRequestStatusTab,setrequestOrganizationStatusTab,setIsRequestedStaffOpen,setIsRequestedOrganizationOpen,setRequestedOrganizationId,setRequestedStaffId,resetRequestedStaffId,resetRequestedOrganizationId,setIsStaffOpen} =requestSlice.actions
export default requestSlice.reducer
