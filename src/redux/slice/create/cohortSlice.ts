
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoanBreakDowns } from '@/components/cohort/CreateCohort';

interface CreateCohortField{
  id: string,
  name: string,
  programId: string,
  startDate: string,
  cohortDescription: string,
  tuitionAmount : string,
  programName : string,
  loanBreakDowns: LoanBreakDowns[]
}

interface CohortState {
  selectedProgram: string | null;
  imageUrl: string | null;
  cohortStatusTab:  string ;
   setCohortId: string,
  selectedCohortInOrganization: {name: string, id: string} | undefined ;
  notificationCohortId: string
   backOfficeAdmin: string
  selectedCohortInOrganizationType: string;
  createCohortField: CreateCohortField | null;
  numberOfLoanees: number;
  programName: string
}

const initialState: CohortState = {
  selectedProgram: null,
  imageUrl: null,
  cohortStatusTab: "incoming",
  setCohortId: "",
  selectedCohortInOrganization:undefined,
  notificationCohortId: "",
  backOfficeAdmin: "",
  selectedCohortInOrganizationType: '',
  createCohortField: null,
  numberOfLoanees: 0,
  programName: ""
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
    setSelectedCohortInOrganizationType: (state, action: PayloadAction<string>) => {
      state.selectedCohortInOrganizationType = action.payload;
    },
    setCreateCohortField: (state, action: PayloadAction<CreateCohortField>) => {
      state.createCohortField = action.payload;
    },
    resetCreateCohortField: (state) => {
      state.createCohortField = null
      state.numberOfLoanees = 0
      state.programName = ""
    },
    setTotalNumberOfLoanee: (state, action: PayloadAction<number>) => {
      state.numberOfLoanees = action.payload;
    },
    setSelectedProgramName(state, action: PayloadAction<string >) {
      state.programName = action.payload;
    },
  },

});

export const {resetSelectedCohortInOrganization, 
  resetNotificationCohortId,setNotificationCohortId,
  setSelectedCohortInOrganizationType, 
  setSelectedProgram, setSelectedCohortInOrganization, 
  setUploadedUrl,setcohortStatusTab,
  resetcohortId,setcohortId,setBackOfficeAdmin, 
  setCreateCohortField,resetCreateCohortField,setTotalNumberOfLoanee,
  setSelectedProgramName
} = cohortSlice.actions;
export default cohortSlice.reducer;
