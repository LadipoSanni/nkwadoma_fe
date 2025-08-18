
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CohortState {
  selectedProgram: string | null;
  imageUrl: string | null;
  cohortStatusTab:  string ;
   setCohortId: string,
  selectedCohortInOrganization: {name: string, id: string} | undefined ;
  notificationCohortId: string
   backOfficeAdmin: string
}

const initialState: CohortState = {
  selectedProgram: null,
  imageUrl: null,
  cohortStatusTab: "incoming",
  setCohortId: "",
  selectedCohortInOrganization:undefined,
  notificationCohortId: "",
  backOfficeAdmin: ""
};

const cohortSlice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    setSelectedProgram(state, action: PayloadAction<string | null>) {
      state.selectedProgram = action.payload;
    },
    setUploadedUrl(state, action: PayloadAction<string | null>) {
      state.imageUrl = action.payload;
    },
    setcohortStatusTab: ( state, action: PayloadAction<string >) => {
      state.cohortStatusTab = action.payload;
  },
  resetcohortId: (state) => {
      state.setCohortId= ""
      state.cohortStatusTab = "incoming"
  },
  setcohortId: ( state, action: PayloadAction<string >) => {
      state.setCohortId = action.payload;
  },
    setSelectedCohortInOrganization: (state, action: PayloadAction<{ name: string, id: string }>) => {
      state.selectedCohortInOrganization = action.payload;
    },
    setNotificationCohortId: ( state, action: PayloadAction<string >) => {
      state.notificationCohortId = action.payload
    },
    resetNotificationCohortId:(state) => {
      state.notificationCohortId = ""
    },
    resetSelectedCohortInOrganization: (state) => {
      state.selectedCohortInOrganization = undefined
    },
    setBackOfficeAdmin: ( state, action: PayloadAction<string >) => {
      state.backOfficeAdmin= action.payload;
  },
  
  },
});

export const {resetSelectedCohortInOrganization, resetNotificationCohortId,setNotificationCohortId, setSelectedProgram, setSelectedCohortInOrganization, setUploadedUrl,setcohortStatusTab,resetcohortId,setcohortId,setBackOfficeAdmin} = cohortSlice.actions;
export default cohortSlice.reducer;
