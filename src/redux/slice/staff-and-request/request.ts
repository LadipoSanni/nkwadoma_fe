import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StaffProps {
    requestStatusTab: string
    requestOrganizationStatusTab:string,
    requestedFinancierStatusTab: string,
    isRequestedStaffOpen: boolean,
    isRequestedOrganizationOpen: boolean,
    isRequestedFinancierOpen: boolean,
    requestedStaffId:string,
    requestedOrganizationId: string,
    requestedFinancierId: string,
    isStaffModalOpen: boolean,
    modalType: string
}

const initialState: StaffProps = {
    requestStatusTab: "pending",
    requestOrganizationStatusTab: "pending",
    requestedFinancierStatusTab: "pending",
    isRequestedFinancierOpen: false,
    isRequestedStaffOpen: false,
    isRequestedOrganizationOpen: false,
    requestedStaffId:"",
    requestedOrganizationId:"",
    requestedFinancierId: "",
    isStaffModalOpen: false,
    modalType:"invite"
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
        setRequestFinancierStatusTab: (state, action: PayloadAction<string>) => {
            state.requestedFinancierStatusTab = action.payload;
        },
        setIsRequestedStaffOpen:(state, action: PayloadAction<boolean>) => {
          state.isRequestedStaffOpen = action.payload
        },
        setIsRequestedOrganizationOpen:(state, action: PayloadAction<boolean>) => {
            state.isRequestedOrganizationOpen = action.payload
          },
        setIsRequestedFinancierOpen:(state, action: PayloadAction<boolean>) => {
            state.isRequestedFinancierOpen = action.payload
          },
          setRequestedOrganizationId: (state, action: PayloadAction<string>) => {
            state.requestedOrganizationId = action.payload;
        },
        setRequestedStaffId: (state, action: PayloadAction<string>) => {
            state.requestedStaffId = action.payload;
        },
        setRequestedFinancierId: (state, action: PayloadAction<string>) => {
            state.requestedFinancierId = action.payload;
        },
        resetRequestedStaffId: (state) => {
            state.requestedStaffId =""
        },
        resetRequestedOrganizationId: (state) => {
            state.requestedOrganizationId =""
        },
        resetRequestedFinancierId: (state) => {
            state.requestedFinancierId =""
        },
        setIsStaffOpen:(state, action: PayloadAction<boolean>) => {
            state.isStaffModalOpen = action.payload
          },
        setModalType: (state, action: PayloadAction<string>) => {
            state.modalType = action.payload;
        },
    }
})

export const {setRequestStatusTab,
    setrequestOrganizationStatusTab,
    setIsRequestedStaffOpen,
    setIsRequestedOrganizationOpen,
    setRequestedOrganizationId,
    setRequestedStaffId,resetRequestedStaffId,
    resetRequestedOrganizationId,
    setIsStaffOpen,setModalType,
    setRequestFinancierStatusTab,
    setIsRequestedFinancierOpen,
    setRequestedFinancierId,
    resetRequestedFinancierId} =requestSlice.actions
export default requestSlice.reducer
