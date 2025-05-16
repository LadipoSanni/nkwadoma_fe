
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CohortState {
  selectedProgram: string | null;
  imageUrl: string | null;
  cohortStatusTab:  string ;
   setCohortId: string,
  
}

const initialState: CohortState = {
  selectedProgram: null,
  imageUrl: null,
  cohortStatusTab: "incoming",
  setCohortId: "",
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
    
  },
});

export const { setSelectedProgram, setUploadedUrl,setcohortStatusTab,resetcohortId,setcohortId} = cohortSlice.actions;
export default cohortSlice.reducer;
