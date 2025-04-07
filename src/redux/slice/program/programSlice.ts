import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProgramSliceState {
    currentProgramId:  string | undefined;
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
}

export const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        setCurrentProgramId: ( state, action: PayloadAction<undefined | string >) => {
            state.currentProgramId = action.payload;
        },
    }
})

export const {setCurrentProgramId } = programSlice.actions;
export default programSlice.reducer;