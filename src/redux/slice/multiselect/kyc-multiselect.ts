import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    completedSteps: [] as string[],
};

const vehicleSlice = createSlice({
    name: 'kycMultistep',
    initialState,
    reducers: {
        markStepCompleted: (state, action) => {
            if (!state.completedSteps.includes(action.payload)) {
                state.completedSteps.push(action.payload);
            }
        },
        resetKycState: (state) => {
            state.completedSteps = [];
        },
    },
});

export const { markStepCompleted, resetKycState } = vehicleSlice.actions;
export default vehicleSlice.reducer;