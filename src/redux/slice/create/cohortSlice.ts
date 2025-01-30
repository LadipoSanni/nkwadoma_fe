
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CohortState {
  selectedProgram: string | null;
  imageUrl: string | null;
  
}

const initialState: CohortState = {
  selectedProgram: null,
  imageUrl: null,
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
    
  },
});

export const { setSelectedProgram, setUploadedUrl } = cohortSlice.actions;
export default cohortSlice.reducer;
