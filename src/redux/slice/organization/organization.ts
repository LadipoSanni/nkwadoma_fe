import { createSlice, PayloadAction } from "@reduxjs/toolkit";
          
interface initialFormValue{
    name: string,
    email: string,
    websiteAddress: string,
    industry: string,
    serviceOffering: string,
    rcNumber: string,
    tin: string,
    adminFirstName: string,
    adminLastName: string,
    adminEmail: string,
    logoImage: string,
    coverImage: string,
    phoneNumber: string,
    countryCode: string

}

interface OrganizationSliceState {
    organizationStatusTab:  string ;
    setOrganizationId: string,
    organizationDetailTab: string;
    loaneeId: string;
    organizationStatus: string;
    organizationInitialState: initialFormValue
}

const initialState:OrganizationSliceState= {
    organizationStatusTab: "active",
    setOrganizationId: "",
    organizationDetailTab: "details",
    loaneeId: "",
    organizationStatus: "",
    organizationInitialState: {
        name:  "",
        email:  "",
        websiteAddress: "",
        industry:  "",
        serviceOffering:  "",
        rcNumber:  "",
        tin:   "",
        adminFirstName:  "",
        adminLastName: "",
        adminEmail: "",
        logoImage:"",
        coverImage: "",
        phoneNumber: "",
        countryCode: "NG"
    }
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
        },
        setOrganizationStatus:(state, action: PayloadAction<string >) => {
            state.organizationStatus = action.payload;
        },
        resetOrganizationStatus: (state) => {
            state.organizationStatus = ""
        },
        setOrganizationInitialState: (state, action: PayloadAction<initialFormValue>) => {
           state.organizationInitialState = action.payload
        },
        resetOrganizationInitialState:(state) => {
            state.organizationInitialState =  {
                name:  "",
                email:  "",
                websiteAddress: "",
                industry:  "",
                serviceOffering:  "",
                rcNumber:  "",
                tin:   "",
                adminFirstName:  "",
                adminLastName: "",
                adminEmail: "",
                logoImage:"",
                coverImage: "",
                phoneNumber: "",
                countryCode: "NG"
            }
        }

    }
})

export const {setOrganizationTabStatus,
             setLoaneeId,resetOrganizationId,
             setOrganizationId,setOrganizationDetail,
             resetOrganizationDetailsStatus,
             setOrganizationStatus,
             resetOrganizationStatus,
             setOrganizationInitialState,
             resetOrganizationInitialState
            } = organizationSlice.actions;
export default organizationSlice.reducer;