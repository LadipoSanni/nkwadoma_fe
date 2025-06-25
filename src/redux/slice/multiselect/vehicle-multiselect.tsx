import { createSlice,PayloadAction  } from '@reduxjs/toolkit';

const initialState = {
  completedSteps: [] as string[],
  isDraft: false,
  status: "",
  visibilityType: "",
};

const vehicleSlice = createSlice({
  name: 'vehicleMultistep',
  initialState,
  reducers: {
    markStepCompleted: (state, action) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    resetVehicleState: (state) => {
      state.completedSteps = [];
    },
    setIsDraft: (state, action: PayloadAction<boolean>) => {
      state.isDraft = action.payload;
    },
    resetDraft: (state) => {
      state.isDraft = false
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    clearStatus: (state) => {
      state.status = ""
    },
    setVisibilityType: (state, action: PayloadAction<string>) => {
      state.visibilityType = action.payload;
    },
   clearVisibilityType: (state) => {
    state.visibilityType = ""
  },
   clearAll: (state) => {
    state.visibilityType = ""
    state.isDraft = false
    state.completedSteps = [];
  },
  },
});

export const { markStepCompleted, resetVehicleState, setIsDraft, resetDraft, setStatus, clearStatus,setVisibilityType,clearVisibilityType,clearAll} = vehicleSlice.actions;
export default vehicleSlice.reducer;