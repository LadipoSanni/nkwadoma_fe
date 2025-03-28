import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedSteps: [] as string[],
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
  },
});

export const { markStepCompleted, resetVehicleState } = vehicleSlice.actions;
export default vehicleSlice.reducer;